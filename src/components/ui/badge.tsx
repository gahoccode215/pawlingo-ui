import * as React from "react"
import { Slot } from "radix-ui"

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "highlight"
  | "muted"

const BADGE_BASE_CLASSES =
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3"

const BADGE_VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground [a&]:hover:bg-primary/90",
  secondary: "bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground [a&]:hover:bg-secondary/90",
  destructive:
    "bg-destructive px-2 py-0.5 text-xs font-medium text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
  outline:
    "border-border px-2 py-0.5 text-xs font-medium text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
  ghost: "px-2 py-0.5 text-xs font-medium [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
  link: "px-2 py-0.5 text-xs font-medium text-primary underline-offset-4 [a&]:hover:underline",
  highlight: "bg-honey-300 px-2 py-1 text-[10px] font-bold text-charcoal",
  muted: "bg-sand-100 px-1.5 py-0.5 text-[9px] font-bold text-ink/40",
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: BadgeVariant
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={`${BADGE_BASE_CLASSES} ${BADGE_VARIANT_CLASSES[variant]} ${className ?? ""}`}
      {...props}
    />
  )
}

export { Badge }
