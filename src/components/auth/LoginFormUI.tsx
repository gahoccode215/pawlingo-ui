"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";

import { GoogleMark } from "@/components/auth/GoogleMark";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type LoginFormUIState = "idle" | "error" | "loading" | "disabled";

type LoginFormUIProps = {
  state?: LoginFormUIState;
};

export function LoginFormUI({ state = "idle" }: LoginFormUIProps) {
  const [rememberMe, setRememberMe] = useState(false);
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
          Welcome back
        </h1>
        <p className="mt-3 max-w-[38ch] text-[15px] leading-6 text-muted-foreground">
          Sign in to continue your English practice.
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

        <div className="grid gap-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isDisabled}
            required
            aria-invalid={hasError}
            aria-describedby={hasError ? "login-email-error" : undefined}
            className="h-[52px]"
          />
          {hasError && (
            <p
              id="login-email-error"
              role="alert"
              className="text-sm leading-5 text-destructive"
            >
              Enter a valid email address.
            </p>
          )}
        </div>

        <div className="mt-5">
          <PasswordField
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={isDisabled}
            errorMessage={hasError ? "Enter your password." : undefined}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <Label className="flex cursor-pointer items-center gap-2.5 font-normal text-muted-foreground">
            <input
              type="checkbox"
              name="remember-me"
              checked={rememberMe}
              disabled={isDisabled}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="size-[18px] rounded border-border accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            Remember me
          </Label>
          <button
            type="button"
            disabled={isDisabled}
            className="rounded-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"
          >
            Forgot password?
          </button>
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
              Signing in...
            </span>
          ) : (
            "Sign in"
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
        New to PawLingo?{" "}
        <Link
          href="/register"
          className="rounded-sm font-semibold text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
