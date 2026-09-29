# PawLingo Login Page Audit

No application files were modified as part of this audit. Findings reflect the current working tree, including pre-existing uncommitted authentication changes.

## A. Current UI architecture

- `/login` is a server page that sanitizes `callbackUrl`, reads session-expiry state, and renders a client form: `src/app/login/page.tsx`.
- `LoginForm` owns presentation, React Hook Form state, Zod validation, NextAuth sign-in, errors, loading, and redirect behavior: `src/components/auth/LoginForm.tsx`.
- Styling uses Tailwind CSS v4 through PostCSS and CSS theme variables: `package.json`, `postcss.config.mjs`, and `src/app/globals.css`.
- UI controls are small local shadcn-style primitives, not an installed full UI library. There is no `components.json`, Radix dependency, CVA, or external component package: `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, and `src/components/ui/label.tsx`.
- Typography uses Geist through `next/font`, including Vietnamese glyphs: `src/app/layout.tsx`.
- The current layout is a centered, unboxed, 420px form on a blue-lavender backdrop. It has no PawLingo wordmark, home navigation, image, or contextual learning visual.
- The landing page establishes a stronger brand language: warm neutral surfaces, cobalt accent, oversized editorial typography, rounded 18px surfaces, and learning-focused vocabulary compositions.
- `docs/login_ref.png` is reference art, not the implementation. Its Google login, remember-me, and forgot-password controls are not supported by the current frontend authentication flow.

Current design dial estimate:

- `DESIGN_VARIANCE: 2`
- `MOTION_INTENSITY: 2`
- `VISUAL_DENSITY: 3`

## B. UI/UX problems and improvement opportunities

### Brand presence

The only visible brand reference is inside supporting copy. The page feels like a generic authentication utility rather than the entry point to PawLingo.

### Generic composition

The centered narrow form, pastel-blue backdrop, standard stacked fields, and single blue button are common template patterns. The absence of a card avoids one cliché, but the page still lacks a distinctive visual idea.

### Visual hierarchy

The 38px heading and spacing are clear, but there is no secondary hierarchy connecting login to the learning journey, existing wordmark, or landing-page composition.

### Color consistency

Cobalt and Geist match the landing page, but `--auth-backdrop: #e4e9f8` introduces a colder lavender field that feels disconnected from the warm `--canvas: #f7f7f2` brand base.

### Dark-mode contrast

The button uses `#779bff` with hardcoded near-white text in dark mode, producing approximately `2.56:1` contrast. That fails WCAG AA for normal text. The existing `--on-cobalt` token provides the intended dark foreground color.

### Component duplication

`LoginForm` reconstructs input and button styles already present in shared primitives. This creates visual drift and makes future token changes less reliable.

### Shape consistency

Authentication controls use 10px radii while the public brand frequently uses 18px surfaces and pill actions. A documented radius hierarchy would feel more intentional.

### Accessibility strengths

- Real labels and stable field IDs.
- Appropriate autocomplete attributes.
- `aria-invalid` and `aria-describedby` for validation errors.
- Alert roles for authentication and field errors.
- Visible focus indicators.
- Loading state with `aria-busy`.
- Stable mobile viewport height through `min-h-[100dvh]`.

### Accessibility opportunities

- `autoFocus` can summon the keyboard immediately on mobile.
- Error colors should be verified in both light and dark themes.
- The light red error surface feels visually foreign in dark mode.
- Password visibility would improve usability without changing authentication behavior.

### Responsive behavior

The form safely contracts through `w-full`, horizontal padding, and `min-h-[100dvh]`. However, every viewport receives essentially the same composition. Desktop space is underused, while mobile has no compact brand header or visual context.

### Unsupported controls

Forgot-password, remember-me, and social login should not be added during a visual redesign because the current frontend does not implement those flows.

## C. Authentication functionality to preserve

- Preserve the `/login` route and its page metadata.
- Preserve callback sanitization, including rejection of external, protocol-relative, backslash-containing, control-character, and recursive login URLs.
- Preserve the default redirect to `/my-profile`.
- Preserve the exact field names and order: `email`, then `password`.
- Preserve Zod validation and React Hook Form integration.
- Preserve `signIn("credentials")`, `redirect: false`, `redirectTo`, `router.replace`, and `router.refresh`.
- Preserve the three visible error categories: invalid credentials, general sign-in failure, and connection failure.
- Preserve the `reason=session_expired` message path.
- Preserve the backend request contract: `POST /api/v1/auth/login` with `email` and `password`, returning `accessToken`, `refreshToken`, and `expiresIn`.
- Preserve JWT session duration, the 60-second refresh buffer, refresh-token handling, and the rule that refresh tokens never enter the client session.
- Preserve session error handling for `RefreshTokenError` and `RefreshTemporaryError`.
- The backend supports Google authentication, but NextAuth currently registers only the credentials provider. Google login must remain absent unless separately implemented and approved.
- Do not modify `src/auth.ts`, the NextAuth route, schemas, session types, profile route, or backend code during a visual redesign.

## D. Proposed design direction

### Design read

A focused consumer login for Vietnamese language learners, with a warm, calm study-room character and one confident cobalt accent.

Proposed design dials:

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 3`
- `VISUAL_DENSITY: 3`

### Layout

- Use an asymmetric two-column desktop composition.
- Reuse `public/images/pawlingo-study.png` as a quiet learning-world panel.
- Place the form on a warm canvas surface with generous but controlled whitespace.
- Add the existing PawLingo text wordmark as a home link.
- Do not invent a new logo mark or fake product interface.

### Mobile

- Collapse to a single-column, form-first layout.
- Keep the PawLingo wordmark visible at the top.
- Use a shallow image crop below the form or omit the image on short screens.
- Avoid decorative content that delays access to the form.

### Typography

- Keep Geist and avoid adding a font dependency.
- Use a compact 40-48px heading with controlled negative tracking.
- Use 15-16px body and form text with comfortable line height.
- Preserve the existing Vietnamese voice unless copy changes receive separate approval.

### Color palette

- Keep the existing warm canvas, ink, muted green-gray, and cobalt tokens.
- Replace the full lavender backdrop with warm canvas plus a restrained cobalt-soft region.
- Use semantic foreground tokens rather than hardcoded white button text.
- Keep one accent color across the page.

### Form design

- Keep labels above inputs.
- Keep a minimum 48px control height.
- Use clearer focus treatment and theme-aware error colors.
- Establish a consistent radius rule, such as 14px controls and an 18px outer surface.
- Preserve the field order, names, autocomplete values, error relationships, and loading behavior.

### Interactions

- Keep motion functional and restrained.
- Retain button press feedback and focus transitions.
- Retain clear loading feedback.
- Optionally add password visibility as local presentation state.
- Respect reduced-motion preferences.

## E. Files that would need modification

### Required

#### `src/app/login/page.tsx`

Recompose the page shell, brand link, responsive split, and existing image placement while preserving query parsing, metadata, callback sanitization, and session-expiry detection.

#### `src/components/auth/LoginForm.tsx`

Update presentation, semantic grouping, dark-mode-safe colors, and optional password visibility while leaving validation, submission, error mapping, and redirect logic unchanged.

### Conditional shared changes

#### `src/app/globals.css`

Only change this file if an authentication-specific semantic surface token is needed. Editing `--auth-backdrop` also changes the registration page.

#### `src/components/ui/button.tsx`

Changing shared button defaults affects login, registration, dashboard, and other consumers. A login-only redesign should prefer local composition unless a shared primitive cleanup is explicitly approved.

#### `src/components/ui/input.tsx`

Changing shared input defaults affects every form consumer. Shared changes require regression review outside the login page.

#### `src/app/register/page.tsx`

Optional follow-up if both authentication pages should use the same redesigned shell.

#### `src/components/auth/RegisterForm.tsx`

Optional follow-up for form-level consistency. Registration behavior is currently incomplete and remains outside this login redesign scope.

### Existing assets to reuse without modification

- `public/images/pawlingo-study.png`
- `public/images/pawlingo-hero.png`

### Authentication files that should not change

- `src/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/schemas/auth.schema.ts`
- `src/types/next-auth.d.ts`
- `src/app/api/profile/route.ts`
- Backend authentication source files in `../pawlingo-api`

## F. Recommended implementation plan

1. Capture desktop, tablet, mobile, light, and dark baselines.
2. Recompose only the `/login` presentation shell.
3. Restyle the form without changing fields, validation, handlers, or redirects.
4. Verify keyboard order, focus visibility, alerts, autocomplete, loading behavior, and contrast.
5. Regression-test valid login, invalid credentials, backend failure, session expiry, and safe callback redirects.
6. Run `npm run lint`.
7. Run `npm run typecheck`.
8. Run `npm run build`.
9. Review the final diff to confirm authentication and backend files remain untouched.

## Audit limitations

- No in-app or connected browser was available during the audit, so responsive findings are based on the actual Tailwind classes and project source rather than live viewport captures.
- `docs/login_ref.png` was inspected only as reference material and was not treated as implemented functionality.
- The expected `docs/backend-contract.md` file is currently missing. Backend behavior was verified from the read-only sibling `../pawlingo-api` source.

## Working tree note

Before this audit document was created, the repository already contained uncommitted changes in authentication and profile files. Those existing changes were not modified by the audit.
