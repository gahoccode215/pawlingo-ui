
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  loginSchema,
  type LoginFormValues,
} from "@/schemas/auth.schema";

const fieldClassName =
  "h-12 w-full rounded-[10px] border border-line bg-canvas px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-cobalt focus:ring-2 focus:ring-cobalt/20";

type LoginFormProps = {
  callbackUrl?: string;
  sessionExpired?: boolean;
};

export default function LoginForm({
  callbackUrl = "/my-profile",
  sessionExpired = false,
}: LoginFormProps) {
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [showSessionExpired, setShowSessionExpired] =
    useState(sessionExpired);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setFormError(null);
    setShowSessionExpired(false);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        redirectTo: callbackUrl,
      });

      // NextAuth không xác thực thành công.
      if (!result || result.error || !result.ok) {
        setFormError(
          result?.error === "CredentialsSignin"
            ? "Email hoặc mật khẩu không chính xác."
            : "Đăng nhập thất bại. Vui lòng thử lại."
        );

        return;
      }

      // Session đã được NextAuth tạo.
      // Chuyển người dùng về trang họ muốn truy cập.
      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("[LOGIN] Sign in failed:", error);

      setFormError(
        "Không thể kết nối đến hệ thống. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <div className="w-full max-w-[420px]">
      {/* Header */}
      <div>
        <h1 className="text-[38px] font-semibold leading-tight tracking-[-0.045em]">
          Đăng nhập
        </h1>

        <p className="mt-2 text-[15px] leading-6 text-muted">
          Tiếp tục lộ trình học của bạn trên PawLingo.
        </p>
      </div>

      {/* Login Form */}
      <form
        className="mt-8"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Authentication errors */}
        {(formError || showSessionExpired) && (
          <div
            role="alert"
            className="mb-5 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-5 text-red-700"
          >
            {formError ??
              "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."}
          </div>
        )}

        {/* Email */}
        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="text-[14px] font-medium"
          >
            Email
          </label>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="ban@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
            className={fieldClassName}
            {...register("email")}
          />

          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-[13px] text-red-500"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-5 grid gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[14px] font-medium"
            >
              Mật khẩu
            </label>
          </div>

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Nhập mật khẩu"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "password-error" : undefined
            }
            className={fieldClassName}
            {...register("password")}
          />

          {errors.password && (
            <p
              id="password-error"
              role="alert"
              className="text-[13px] text-red-500"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-7 flex h-12 w-full items-center justify-center rounded-[10px] bg-cobalt px-4 text-[15px] font-medium text-[#f9fbff] transition-[background-color,transform] hover:bg-[#064fca] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              Đang đăng nhập...
            </span>
          ) : (
            "Đăng nhập"
          )}
        </Button>

        {/* Register */}
        <p className="mt-7 text-center text-[14px] text-muted">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-medium text-cobalt hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}
