import * as React from "react"
import { Slot } from "radix-ui"

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "outline-pill"
  | "secondary"
  | "ghost"
  | "link"
  | "pop"

type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"
  | "custom"

const BUTTON_BASE_CLASSES =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-[color,background-color,box-shadow,transform] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: "rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90",
  destructive:
    "rounded-md bg-destructive text-white font-medium hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
  outline:
    "rounded-md border bg-background font-medium shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
  "outline-pill":
    "rounded-full border bg-background font-medium shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
  secondary:
    "rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80",
  ghost:
    "rounded-md font-medium hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  link: "rounded-md text-primary font-medium underline-offset-4 hover:underline",
  pop: "rounded-full bg-ink text-cream font-display font-semibold hover:bg-ink/90 hover:shadow-pop hover:-translate-y-0.5 active:translate-y-0 active:shadow-none",
}

const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "h-9 gap-2 px-4 py-2 text-sm has-[>svg]:px-3",
  xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: "h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
  lg: "h-10 gap-2 px-6 text-sm has-[>svg]:px-4",
  icon: "size-9 gap-2 text-sm",
  "icon-xs": "size-6 gap-2 text-sm [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-8 gap-2 text-sm",
  "icon-lg": "size-10 gap-2 text-sm",
  custom: "gap-2 text-sm",
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${BUTTON_SIZE_CLASSES[size]} ${className ?? ""}`}
      {...props}
    />
  )
}

export { Button }
