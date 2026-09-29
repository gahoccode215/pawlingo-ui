import type { ComponentProps } from "react";

export function Input({ className = "", type, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={`h-12 w-full min-w-0 rounded-[12px] border border-border bg-card px-4 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/75 focus:border-primary focus:ring-[3px] focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/15 ${className}`}
      {...props}
    />
  );
}
