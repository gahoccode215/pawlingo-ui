# Components and Interaction Patterns

This page records the behavior of the currently implemented shared primitives and authentication presentation components.

## Shared UI primitives

### `Button`

File: `src/components/ui/button.tsx`

`Button` accepts native button props plus `variant="default" | "outline"`. Its default HTML `type` is `button`, so a consumer must opt into `type="submit"`.

- Height: `48px` by default; auth forms override it to `52px`.
- Horizontal padding: `16px`.
- Radius: `12px`.
- Type: `15px`, semibold.
- Default variant: forest primary background, white foreground, darker forest hover.
- Outline variant: white surface with neutral border; muted background and partially transparent primary border on hover.
- Active: translates downward by one pixel.
- Focus: three-pixel translucent primary ring and primary border.
- Disabled: pointer interaction removed, opacity reduced to 50%, hover shadow removed.
- Hover shadow: a literal subtle green-tinted shadow value in the component; it does not use `--shadow-soft`.

### `Input`

File: `src/components/ui/input.tsx`

`Input` forwards native input props and sets a `data-slot="input"` hook.

- Height: `48px` by default; auth forms override it to `52px`.
- Horizontal padding: `16px`.
- Radius: `12px`.
- Type: `15px`.
- Surface: white with the semantic border color.
- Placeholder: muted foreground at 75% opacity.
- Focus: primary border and three-pixel `primary/15` ring.
- Disabled: not-allowed cursor, muted background, 60% opacity.
- Invalid: destructive border and `destructive/15` ring, driven by `aria-invalid`.

### `Label`

File: `src/components/ui/label.tsx`

`Label` forwards native label props and sets `data-slot="label"`. Its default presentation is `14px`, semibold, single-line-height foreground text. Consumers may extend it through `className`, as the login checkbox label does.

## Authentication composition

### `AuthPageShell`

File: `src/components/auth/AuthPageShell.tsx`

`AuthPageShell` accepts `mode="login" | "register"` and renders mode-specific editorial copy. It owns the full authentication-page presentation:

- A full-height warm-cream form section.
- A PawLingo home link with a 36px forest-green “P” mark.
- A centered form column capped at `27.5rem`.
- A right-side forest brand panel at `lg` and wider.
- Restrained decoration made from low-opacity borders, one yellow accent bar, and a large translucent “hello.” word.

At widths below Tailwind's `lg` breakpoint, the brand panel is hidden and the form section fills the viewport. Page padding progresses from `20px` to `32px`, `48px`, `64px`, and `96px` across the implemented responsive breakpoints.

### `PasswordField`

File: `src/components/auth/PasswordField.tsx`

`PasswordField` is a client component with local visibility state. It composes `Label` and `Input`, requires an ID, autocomplete mode, and placeholder, and optionally accepts disabled, helper, and error values.

- The visibility control toggles the native input type between `password` and `text`.
- The control exposes `aria-controls`, an action-specific `aria-label`, and `aria-pressed`.
- The input reserves `5.25rem` on the right for the control.
- An error takes precedence over helper text and sets `aria-invalid`.
- Error or helper copy is connected with `aria-describedby`.
- Errors use `role="alert"`; helper text uses muted foreground styling.
- The visibility control has hover, focus, and disabled treatments.

### `LoginFormUI`

File: `src/components/auth/LoginFormUI.tsx`

This client component renders email and password fields, a locally controlled Remember me checkbox, a presentation-only Forgot password button, submit button, Google button, and link to `/register`.

The form calls `preventDefault()` on submission. It does not authenticate, navigate on success, call an API, or invoke OAuth. The Google button is a `type="button"` with no authentication handler.

### `RegisterFormUI`

File: `src/components/auth/RegisterFormUI.tsx`

This client component renders full name, email, and password fields, submit button, Google button, and link to `/login`. The password helper states “Use at least 8 characters.”

As with login, submission is prevented and no authentication, validation service, API, OAuth, or success navigation is implemented.

### `GoogleMark`

File: `src/components/auth/GoogleMark.tsx`

This decorative inline SVG supplies the recognizable four-color Google mark. It is hidden from assistive technology because the adjacent button text communicates the action. Its hard-coded path colors are an external brand exception to PawLingo's semantic palette.

## Form state model

Both auth form components accept the same presentation state union:

```ts
"idle" | "error" | "loading" | "disabled"
```

| State | Implemented behavior |
| --- | --- |
| `idle` | All controls are available; no alert or field error is shown |
| `error` | A form alert and field-level errors render; relevant inputs receive `aria-invalid` and descriptions |
| `loading` | Form receives `aria-busy`; all controls are disabled; submit text changes and includes a spinner |
| `disabled` | All interactive form controls are disabled; normal button labels remain visible |

The route pages currently render the default `idle` state. The states are visual component inputs, not an authentication state machine. Loading spinners stop animating when reduced motion is requested.

## Spacing, radius, and elevation

There are no semantic spacing tokens. Current auth spacing is expressed directly with Tailwind utilities:

- Label-to-control gaps are generally `8px` (`gap-2`).
- Major field groups are generally separated by `20px` (`gap-5` or `mt-5`).
- Forms begin `36px` below their header (`mt-9`).
- Primary actions and dividers use `28px` separation (`mt-7`, `my-7`).
- The post-form account link begins `32px` below the form (`mt-8`).

Controls use a `12px` radius. The password visibility button uses `10px`; auth error alerts use `16px`. Although `--radius-control: 0.75rem`, `--radius-container: 1.125rem`, and `--shadow-soft` exist in `:root`, the inspected components do not consume them directly.

Elevation is intentionally restrained. The shared button has only a subtle hover shadow; auth surfaces otherwise rely on color, borders, spacing, and typography instead of card shadows.

## Responsive behavior

- Mobile and tablet: single-column, full-height form section; branded side panel hidden.
- Desktop (`lg` and above): two-column grid with approximately `1.08fr / 0.92fr` proportions and a minimum 28rem right column.
- Content width: forms remain capped at `27.5rem` even as outer page padding grows.
- Display typography scales with CSS `clamp()` rather than breakpoint-specific fixed sizes.
- Controls remain at least 48px high, and auth controls are 52px high.

## Accessibility requirements for reuse

New or modified forms should preserve the patterns already present:

- Pair every form field with a visible label and matching `htmlFor`/`id`.
- Use accurate `type`, `inputMode`, and `autocomplete` attributes.
- Connect help and errors with `aria-describedby`.
- Set `aria-invalid` only from the rendered invalid state.
- Keep focus styles visible; do not remove outlines without an equally visible replacement.
- Use native buttons for actions and links for navigation.
- Keep non-submit actions at `type="button"` inside forms.
- Communicate asynchronous activity with `aria-busy` and a status label.
- Disable every related control consistently during loading or disabled states.
- Respect the global reduced-motion policy.

## Recommendations not currently implemented

- Add a component preview or test harness for the four auth form states if these states need routine visual regression testing.
- Centralize repeated spacing, radius, or typography values only after broader product usage establishes stable patterns.
- Replace the presentation-state props with real validation/auth state only as part of a separately scoped authentication integration.

