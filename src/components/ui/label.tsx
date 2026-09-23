import type { ComponentProps } from "react";

export function Label({ className = "", ...props }: ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={`text-[14px] font-medium leading-none ${className}`}
      {...props}
    />
  );
}
