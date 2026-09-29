# PawLingo Forest & Cream Design System

This directory documents the design system currently implemented in PawLingo. It is an implementation reference for contributors and coding agents, not a roadmap. When this documentation and the source disagree, the source is authoritative and the discrepancy must be reported.

## Philosophy

Forest & Cream presents PawLingo as a friendly, calm educational product:

- Warm cream replaces stark application backgrounds.
- Forest green carries primary actions, focus, and brand emphasis.
- Pale green and neutral surfaces support long reading and learning sessions.
- Yellow is a restrained accent, not a general-purpose action color.
- Typography, generous spacing, and a small number of clear surfaces establish hierarchy without gradients, heavy shadows, or decorative animation.
- Controls use visible labels, large touch targets, and explicit interaction states.

The implemented theme is light-mode only.

## Source of truth

The current implementation is distributed across:

- `src/app/globals.css`: semantic colors, global typography stack, light-mode policy, selection styling, focus color, and reduced-motion behavior.
- `src/components/ui/button.tsx`: shared default and outline button variants.
- `src/components/ui/input.tsx`: shared text-input states.
- `src/components/ui/label.tsx`: shared form labels.
- `src/components/auth/AuthPageShell.tsx`: responsive authentication-page layout and brand panel.
- `src/components/auth/LoginFormUI.tsx`: presentation-only login form.
- `src/components/auth/RegisterFormUI.tsx`: presentation-only registration form.
- `src/components/auth/PasswordField.tsx`: password input and local visibility control.
- `src/components/auth/GoogleMark.tsx`: presentation-only Google brand mark.

See the detailed references:

- [Colors](./colors.md)
- [Typography](./typography.md)
- [Components and interaction patterns](./components.md)

## Rules for frontend changes

Before modifying frontend UI:

1. Read this page and the detailed document relevant to the change.
2. Inspect `src/app/globals.css` and the component being changed; documentation does not replace source inspection.
3. Reuse semantic Tailwind classes such as `bg-background`, `text-foreground`, `bg-primary`, and `border-border` instead of embedding theme color values.
4. Reuse the shared `Button`, `Input`, and `Label` primitives when their APIs cover the use case.
5. Do not add colors, aliases, a dark theme, or a competing visual theme without approval.
6. Preserve keyboard focus, disabled, loading, error, and reduced-motion behavior when extending components.
7. Do not expand the use of temporary legacy aliases. Prefer their semantic replacements.

The four-color paths in `GoogleMark` are a third-party brand exception, not PawLingo theme colors.

## Implemented layout behavior

Authentication pages use a full-viewport split layout at Tailwind's `lg` breakpoint and above. The form occupies the left side, and a forest-green editorial brand panel occupies the right side. Below `lg`, the brand panel is hidden and the form becomes a single-column, form-first layout. The guest layout itself is currently a transparent wrapper; `AuthPageShell` supplies the authentication-page structure.

The login and registration route components render the default `idle` state. Their presentation components also accept `error`, `loading`, and `disabled` states for visual integration and testing, but no route-level state selector or authentication behavior is implemented.

## Accessibility baseline

The implementation includes:

- Semantic `main`, `section`, `aside`, `header`, `form`, `label`, `button`, and link elements.
- Explicit labels and stable input IDs.
- Appropriate `autocomplete` values.
- `aria-invalid` and `aria-describedby` links for field errors and password help.
- `role="alert"` for rendered error messages and `role="status"` for loading labels.
- Visible keyboard focus styles on shared controls, links, the checkbox, and password visibility control.
- Disabled controls that are visibly muted and non-interactive.
- A global `prefers-reduced-motion` rule that reduces animations and transitions to `0.01ms` and limits animations to one iteration.

These patterns are the minimum baseline for new UI. Accessibility still needs to be checked in the actual rendered context.

## Known implementation boundaries

- `--font-geist` is referenced by the global font stack, but the root layout does not currently load Geist with `next/font` or define that variable. Browsers therefore fall through to a locally available `Geist`, then system sans-serif fonts when necessary.
- `--radius-control`, `--radius-container`, and `--shadow-soft` are declared in `:root`, but the inspected shared and authentication components use literal Tailwind radius and shadow values rather than consuming these custom properties.
- The compatibility aliases in [colors.md](./colors.md#temporary-compatibility-aliases) remain declared, but no class-based consumers of them were found under `src` during this audit.
- Some dashboard and administration components still contain hard-coded colors from other visual directions. They are existing migration boundaries, not part of the documented Forest & Cream palette.
- `GoogleSignInButton.tsx` uses `text-muted` for a status line. In the current semantic system, `muted` is a background color and `muted-foreground` is the text color, so that usage does not follow the current token meaning. The new authentication routes use `GoogleMark` inside the shared outline button instead.

## Recommendations not currently implemented

The following are recommendations only:

- Load Geist explicitly through the root layout and define `--font-geist`, or revise the documented font policy to rely on system fonts.
- Migrate literal radius and shadow values to shared tokens if consistent programmatic reuse is required.
- Remove compatibility aliases after a repository-wide migration check confirms they are unnecessary.
- Migrate hard-coded colors in out-of-scope dashboard and administration UI in a separately approved redesign.

