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
import { registerSchema } from "@/lib/validation/auth";
import GoogleSignInButton from "./GoogleSignInButton";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  // UI-only, per explicit product decision — the backend's register endpoint
  // only accepts { email, password }, so these are never sent anywhere.
  // Kept purely to match the reference design's field layout.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const parsed = registerSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors({ email: errors.email?.[0], password: errors.password?.[0] });
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await register(parsed.data.email, parsed.data.password);
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
            Tạo tài khoản
          </p>
          <h1 className="font-display font-extrabold text-3xl mt-2">Đăng ký PawLingo</h1>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName" className="text-sm font-semibold text-ink/70 mb-1">
                  Tên
                </Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded-xl focus-visible:ring-coral-300"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-semibold text-ink/70 mb-1">
                  Họ
                </Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded-xl focus-visible:ring-coral-300"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
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

            {/* No Terms & Conditions page exists yet — interactive but
                intentionally non-blocking, per explicit product decision. */}
            <label className="flex items-start gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 rounded border-ink/20 accent-ink"
              />
              <span>
                Tôi đồng ý với <span className="font-semibold">Điều khoản dịch vụ</span>{" "}
                <span className="text-ink/40 text-xs">(sắp ra mắt)</span>
              </span>
            </label>

            <Button
              type="submit"
              variant="pop"
              disabled={isSubmitting}
              className="h-auto mt-2 text-sm px-5 py-2.5 disabled:opacity-60"
            >
              {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
            </Button>
          </form>
        </Card>

        <Button
          asChild
          variant="outline"
          className="w-full mt-4 rounded-full h-auto text-sm px-5 py-2.5 border-ink/15"
        >
          <Link href="/login">Đã có tài khoản? Đăng nhập</Link>
        </Button>
      </div>
    </div>
  );
}
