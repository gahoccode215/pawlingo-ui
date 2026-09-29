"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import GoogleSignInButton, {
  googleSignInAvailable,
} from "@/components/auth/GoogleSignInButton";

import {
  loginSchema,
  type LoginFormValues,
} from "@/schemas/auth.schema";

const fieldClassName =
  "h-[52px] rounded-[12px] bg-canvas px-4 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] placeholder:text-muted/80 focus:border-cobalt focus:ring-4 focus:ring-cobalt/15";


export default function LoginForm() {
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (formData: LoginFormValues) => {
    setFormError("");

    try {
      const data = await login(formData);

      if (data.success) {
        setSuccess(data.success);
        router.push("/setup");
      } else if (data.error) {
        setError(data.error);
      }
    } catch {
      setError("Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <Link
        href="/"
        className="inline-flex rounded-md text-[22px] font-semibold tracking-[-0.045em] text-ink transition-colors hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
      >
        PawLingo
      </Link>

      <header className="mt-10 sm:mt-12">
        <h1
          id="login-heading"
          className="text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-ink"
        >
          Chào mừng bạn trở lại
        </h1>
        <p className="mt-3 max-w-[38ch] text-[15px] leading-6 text-muted">
          Tiếp tục lộ trình học của bạn trên PawLingo.
        </p>
      </header>

      <div className="mt-9">
        {(formError || showSessionExpired) && (
          <div
            role="alert"
            className="mb-6 rounded-[12px] border border-red-300 bg-red-50 px-4 py-3.5 text-[13px] leading-5 text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200"
          >
            {formError ??
              "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."}
          </div>
        )}

        {googleSignInAvailable && (
          <>
            <GoogleSignInButton callbackUrl={callbackUrl} />
            <div className="my-7 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-line" />
              <span className="text-[12px] font-medium text-muted">
                hoặc đăng nhập bằng email
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
          </>
        )}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
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
                className="text-[13px] leading-5 text-red-700 dark:text-red-300"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-5 grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`${fieldClassName} pr-20`}
                {...register("password")}
              />
              <button
                type="button"
                aria-controls="password"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-1.5 right-1.5 rounded-[9px] px-3 text-[13px] font-medium text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cobalt"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-[13px] leading-5 text-red-700 dark:text-red-300"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="mt-7 h-[52px] w-full rounded-[12px] bg-cobalt text-[15px] font-semibold text-on-cobalt shadow-[0_12px_30px_-18px_rgba(36,87,214,0.9)] transition-[background-color,box-shadow,transform] hover:bg-cobalt-strong hover:shadow-[0_14px_34px_-18px_rgba(36,87,214,0.95)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current motion-reduce:animate-none"
                />
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        <p className="mt-8 border-t border-line pt-6 text-center text-[14px] leading-6 text-muted">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="rounded-sm font-semibold text-cobalt underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
