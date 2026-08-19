"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { loginSchema } from "@/lib/validation/auth";
import GoogleSignInButton from "./GoogleSignInButton";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors({ email: errors.email?.[0], password: errors.password?.[0] });
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await login(parsed.data.email, parsed.data.password);
      router.push("/learn");
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? getAuthErrorMessage(error.code)
          : getAuthErrorMessage("INTERNAL_ERROR"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Chào mừng trở lại
          </p>
          <h1 className="font-display font-extrabold text-3xl mt-2">Đăng nhập</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-ink/5 p-6">
          {formError && (
            <p className="mb-4 text-sm font-semibold text-red-600 bg-red-50 rounded-xl px-3 py-2">
              {formError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink/70 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ink/10 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral-300"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink/70 mb-1">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-ink/10 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral-300"
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="text-xs text-ink/40">hoặc</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <GoogleSignInButton />
        </div>

        <p className="text-center text-sm text-ink/60 mt-5">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-semibold text-coral-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
