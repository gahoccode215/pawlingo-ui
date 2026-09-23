import type { ComponentProps } from "react";

export function Input({ className = "", type, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={`h-12 w-full min-w-0 rounded-[10px] border border-line bg-canvas px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-cobalt focus:ring-2 focus:ring-cobalt/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
