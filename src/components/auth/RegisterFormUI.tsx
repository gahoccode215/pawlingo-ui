"use client";

import Link from "next/link";

import type {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
} from "react-hook-form";

import type {
  RegisterFormValues,
} from "@/schemas/auth.schema";

import { GoogleMark } from "@/components/auth/GoogleMark";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterFormUIProps = {
  register: UseFormRegister<RegisterFormValues>;
  handleSubmit: UseFormHandleSubmit<RegisterFormValues>;
  onSubmit: SubmitHandler<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  isSubmitting: boolean;
  serverError: string;
};

export function RegisterFormUI({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  serverError,
}: RegisterFormUIProps) {
  return (
    <div>
      <header>
        <h1 className="text-[clamp(2.25rem,8vw,3rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-foreground">
          Create your account
        </h1>

        <p className="mt-3 max-w-[38ch] text-[15px] leading-6 text-muted-foreground">
          Start a simple routine built around practical English.
        </p>
      </header>

      <form
        className="mt-9"
        noValidate
        aria-busy={isSubmitting}
        data-state={isSubmitting ? "loading" : "idle"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && (
          <div
            role="alert"
            className="mb-6 rounded-[16px] border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-5 text-destructive"
          >
            {serverError}
          </div>
        )}

        <div className="grid gap-5">
          {/* Full name */}
          <div className="grid gap-2">
            <Label htmlFor="register-name">
              Full name
            </Label>

            <Input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              disabled={isSubmitting}
              required
              aria-invalid={!!errors.fullName}
              aria-describedby={
                errors.fullName
                  ? "register-name-error"
                  : undefined
              }
              className="h-[52px]"
              {...register("fullName")}
            />

            {errors.fullName && (
              <p
                id="register-name-error"
                role="alert"
                className="text-sm leading-5 text-destructive"
              >
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="register-email">
              Email
            </Label>

            <Input
              id="register-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isSubmitting}
              required
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email
                  ? "register-email-error"
                  : undefined
              }
              className="h-[52px]"
              {...register("email")}
            />

            {errors.email && (
              <p
                id="register-email-error"
                role="alert"
                className="text-sm leading-5 text-destructive"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <PasswordField
            id="register-password"
            autoComplete="new-password"
            placeholder="Create a password"
            disabled={isSubmitting}
            helperText="Use at least 8 characters."
            errorMessage={errors.password?.message}
            {...register("password")}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-7 h-[52px] w-full"
        >
          {isSubmitting ? (
            <span
              className="flex items-center gap-2"
              role="status"
            >
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current motion-reduce:animate-none"
              />

              Creating account...
            </span>
          ) : (
            "Sign up"
          )}
        </Button>

        {/* Divider */}
        <div
          className="my-7 flex items-center gap-4"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          disabled
          className="h-[52px] w-full"
        >
          <GoogleMark className="mr-2.5 size-5" />
          Continue with Google
        </Button>
      </form>

      {/* Login link */}
      <p className="mt-8 text-center text-sm leading-6 text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="rounded-sm font-semibold text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}