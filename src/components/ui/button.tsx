import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "outline";
};

const variants = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:border-primary",
  outline:
    "border-border bg-card text-foreground hover:border-primary/35 hover:bg-muted focus-visible:border-primary",
};

export function Button({ className = "", type = "button", variant = "default", ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={`inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[12px] border px-4 text-[15px] font-semibold transition-[background-color,border-color,box-shadow,transform] hover:shadow-[0_10px_24px_-18px_rgba(38,53,44,0.55)] active:translate-y-px focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
