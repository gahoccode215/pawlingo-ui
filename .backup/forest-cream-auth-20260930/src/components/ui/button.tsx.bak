import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "outline";
};

const variants = {
  default:
    "border-transparent bg-cobalt text-[#f9fbff] hover:bg-[#064fca] focus-visible:outline-cobalt",
  outline:
    "border-line bg-canvas text-ink hover:border-ink hover:bg-surface focus-visible:outline-cobalt",
};

export function Button({ className = "", type = "button", variant = "default", ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={`inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[10px] border px-4 text-[15px] font-medium transition-[background-color,border-color,transform] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
