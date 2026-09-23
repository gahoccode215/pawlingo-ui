"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormValues,
} from "@/schemas/auth.schema";

const fieldClassName =
  "h-12 w-full rounded-[10px] border border-line bg-canvas px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-cobalt focus:ring-2 focus:ring-cobalt/20";

const secondaryButtonClassName =
  "flex h-12 w-full items-center justify-center rounded-[10px] border border-line bg-canvas px-4 text-[15px] font-medium text-ink transition-[border-color,background-color,transform] hover:border-ink hover:bg-surface active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setFormError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result || result.error) {
        setFormError("Email hoặc mật khẩu không chính xác.");
        return;
      }

      router.push(callbackUrl);
    } catch {
      setFormError("Không thể đăng nhập lúc này. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full max-w-[420px]">
      <div>
        <h1 className="text-[38px] font-semibold leading-tight tracking-[-0.045em]">
          Đăng nhập
        </h1>

        <p className="mt-2 text-[15px] leading-6 text-muted">
          Tiếp tục lộ trình học của bạn trên PawLingo.
        </p>
      </div>

      <form
        className="mt-8"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {(formError || sessionExpired) && (
          <p
            role="alert"
            className="mb-5 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
          >
            {formError ?? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."}
          </p>
        )}

        <button
          type="button"
          className={secondaryButtonClassName}
        >
          Tiếp tục với Google
        </button>

        <div
          className="my-7 flex items-center gap-4"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-line" />
          <span className="text-[13px] text-muted">
            hoặc dùng email
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-[14px] font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ban@example.com"
              className={fieldClassName}
              {...register("email")}
            />

            {errors.email && (
              <p className="text-[13px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-[14px] font-medium"
            >
              Mật khẩu
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              className={fieldClassName}
              {...register("password")}
            />

            {errors.password && (
              <p className="text-[13px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[14px] text-muted">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded-[4px] border-line accent-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
            />
            Ghi nhớ đăng nhập
          </label>

          <button
            type="button"
            className="min-h-11 whitespace-nowrap text-[14px] font-medium text-cobalt hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-[10px] bg-cobalt px-4 text-[15px] font-medium text-[#f9fbff] transition-[background-color,transform] hover:bg-[#064fca] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

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
