"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordFieldProps = {
  id: string;
  autoComplete: "current-password" | "new-password";
  placeholder: string;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
};

export function PasswordField({
  id,
  autoComplete,
  placeholder,
  disabled = false,
  errorMessage,
  helperText,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const descriptionId = errorMessage
    ? `${id}-error`
    : helperText
      ? `${id}-help`
      : undefined;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Password</Label>
      <div className="relative">
        <Input
          id={id}
          name="password"
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          required
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={descriptionId}
          className="h-[52px] pr-[5.25rem]"
        />
        <button
          type="button"
          aria-controls={id}
          aria-label={`${isVisible ? "Hide" : "Show"} password`}
          aria-pressed={isVisible}
          disabled={disabled}
          onClick={() => setIsVisible((current) => !current)}
          className="absolute inset-y-1.5 right-1.5 min-w-16 rounded-[10px] px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      {errorMessage ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm leading-5 text-destructive"
        >
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${id}-help`} className="text-sm leading-5 text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
