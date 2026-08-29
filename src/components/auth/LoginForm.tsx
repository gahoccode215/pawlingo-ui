"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      router.push("/home");
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

        <Card className="rounded-3xl shadow-card border-ink/10 p-6 gap-0">
          {formError && (
            <p className="mb-4 text-sm font-semibold text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              {formError}
            </p>
          )}

          <GoogleSignInButton />

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="text-xs text-ink/40">hoặc</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-ink/70 mb-1">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl focus-visible:ring-coral-300"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-ink/70 mb-1">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl pr-10 focus-visible:ring-coral-300"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                  aria-label={isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
                >
                  {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-destructive">{fieldErrors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="pop"
              disabled={isSubmitting}
              className="h-auto mt-2 text-sm px-5 py-2.5 disabled:opacity-60"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          {/* No password-reset endpoint exists yet — kept as a visible,
              clearly non-interactive note rather than a dead link. */}
          <p className="mt-4 text-center text-xs text-ink/40">
            Quên mật khẩu? <span className="italic">Tính năng sắp ra mắt</span>
          </p>
        </Card>

        <Button
          asChild
          variant="outline"
          className="w-full mt-4 rounded-full h-auto text-sm px-5 py-2.5 border-ink/15"
        >
          <Link href="/register">Chưa có tài khoản? Đăng ký ngay</Link>
        </Button>
      </div>
    </div>
  );
}
