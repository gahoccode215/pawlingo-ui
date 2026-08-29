import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// NOTE: radius is intentionally declared per-`variant` below, never in this
// base string or in `size`. Previously `rounded-md` lived here (and was
// repeated in the xs/sm/lg size classes), which meant combining `pop`
// (rounded-full) with a non-default size re-introduced `rounded-md` after
// it in the cva-concatenated class string — tailwind-merge keeps whichever
// conflicting radius utility appears *last*, so that combination silently
// lost its pill shape. Keeping every variant's radius self-contained means
// no variant/size combination can ever reintroduce a conflicting radius.
//
// The base transition is deliberately scoped to color/shadow/transform, NOT
// `transition-all`. Header.tsx swaps a Link's className between a plain-text
// style and `pop` (e.g. active/inactive auth links) on the same persistent
// DOM node — with `transition-all`, the browser animates that swap's
// border-radius (and padding) from square to pill over ~150ms, which reads
// as a "square corners, then rounds out" flash. Scoping the transition list
// excludes radius/padding/font from ever animating, while hover feedback
// (color, shadow, lift) still transitions smoothly.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow,transform] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "rounded-md bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "rounded-md text-primary underline-offset-4 hover:underline",
        // PawLingo's signature CTA look — solid ink pill with a soft coral
        // glow that appears on hover, echoing the reference site's
        // glow-under-button treatment. Used for every primary call-to-action
        // instead of the flat `default` variant.
        pop: "rounded-full bg-ink text-cream font-display font-semibold hover:bg-ink/90 hover:shadow-pop hover:-translate-y-0.5 active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
