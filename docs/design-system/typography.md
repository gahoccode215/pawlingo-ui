# Typography

## Font configuration

The global CSS declares this sans-serif stack:

```css
var(--font-geist), "Geist", ui-sans-serif, system-ui, sans-serif
```

Tailwind's `font-sans` theme value points to the same stack. Form controls inherit the surrounding font through the global `button`, `input`, `textarea`, and `select` rule. The body also enables `text-rendering: optimizeLegibility`.

### Current configuration gap

`src/app/layout.tsx` imports `globals.css`, but it does not import Geist from `next/font` or attach a class/variable that defines `--font-geist`. Therefore the first stack entry is currently unresolved. A locally installed `Geist` font may be used by name; otherwise the browser falls back to `ui-sans-serif`, `system-ui`, and `sans-serif`.

Explicitly loading Geist is a recommendation, not an implemented feature.

## Implemented type hierarchy

Typography is expressed directly with Tailwind utilities in components; there are no named heading or body-size tokens.

| Context | Implemented styling |
| --- | --- |
| Auth page title | Fluid `2.25rem` to `3rem`, weight 600, line-height `1.05`, tracking `-0.055em` |
| Brand-panel title | Fluid `3rem` to `5.25rem`, weight 600, line-height `0.98`, tracking `-0.065em`, balanced wrapping |
| Decorative “hello.” | Fluid `4.5rem` to `8rem`, weight 600, line-height `1`, tracking `-0.08em` |
| Auth introductory copy | `15px`, line-height `1.5rem`, muted foreground |
| Brand-panel body | `1rem`, line-height `1.75rem`, primary foreground at 75% opacity |
| Form label | `14px`, weight 600, line-height `1` |
| Input and button text | `15px`; buttons use weight 600 |
| Helper and error text | `14px`, line-height `1.25rem` |
| Divider and eyebrow text | `12px`; eyebrow is uppercase with `0.16em` tracking |
| PawLingo wordmark | `17px`, weight 600, tracking `-0.025em` |

## Conventions

- Use semibold weight for headings, labels, links, and button actions.
- Use negative letter spacing on large display headings and the compact wordmark; normal body and form copy does not use negative tracking.
- Keep supporting form copy short and readable. Auth introductory paragraphs are capped at `38ch`.
- Use `text-muted-foreground` for secondary copy and helper text, not `text-muted`.
- Keep field labels visible. Placeholders supplement labels and do not replace them.
- Preserve the fluid title sizes used by the auth experience when adjusting its responsive layout.

## Recommendations not currently implemented

- Configure Geist through `next/font` and define `--font-geist` in the root layout if Geist must be guaranteed rather than preferred.
- Introduce named typography tokens only if several product areas converge on the same scale. Current type sizes are component-level Tailwind values.

