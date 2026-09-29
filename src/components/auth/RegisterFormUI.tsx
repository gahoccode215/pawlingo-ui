"use client";

import type { FormEvent } from "react";
import Link from "next/link";

import { GoogleMark } from "@/components/auth/GoogleMark";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type RegisterFormUIState = "idle" | "error" | "loading" | "disabled";

type RegisterFormUIProps = {
  state?: RegisterFormUIState;
};

export function RegisterFormUI({ state = "idle" }: RegisterFormUIProps) {
  const isLoading = state === "loading";
  const isDisabled = state === "disabled" || isLoading;
  const hasError = state === "error";

  const preventSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
        aria-busy={isLoading}
        data-state={state}
        onSubmit={preventSubmission}
      >
        {hasError && (
          <div
            role="alert"
            className="mb-6 rounded-[16px] border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-5 text-destructive"
          >
            Check the highlighted fields and try again.
          </div>
        )}

        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="register-name">Full name</Label>
            <Input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              disabled={isDisabled}
              required
              aria-invalid={hasError}
              aria-describedby={hasError ? "register-name-error" : undefined}
              className="h-[52px]"
            />
            {hasError && (
              <p
                id="register-name-error"
                role="alert"
                className="text-sm leading-5 text-destructive"
              >
                Enter your full name.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isDisabled}
              required
              aria-invalid={hasError}
              aria-describedby={hasError ? "register-email-error" : undefined}
              className="h-[52px]"
            />
            {hasError && (
              <p
                id="register-email-error"
                role="alert"
                className="text-sm leading-5 text-destructive"
              >
                Enter a valid email address.
              </p>
            )}
          </div>

          <PasswordField
            id="register-password"
            autoComplete="new-password"
            placeholder="Create a password"
            disabled={isDisabled}
            helperText="Use at least 8 characters."
            errorMessage={hasError ? "Use at least 8 characters." : undefined}
          />
        </div>

        <Button
          type="submit"
          disabled={isDisabled}
          aria-busy={isLoading}
          className="mt-7 h-[52px] w-full"
        >
          {isLoading ? (
            <span className="flex items-center gap-2" role="status">
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

        <div className="my-7 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isDisabled}
          className="h-[52px] w-full"
        >
          <GoogleMark className="mr-2.5 size-5" />
          Continue with Google
        </Button>
      </form>

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
