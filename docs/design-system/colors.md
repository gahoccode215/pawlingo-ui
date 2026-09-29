# Colors

PawLingo exposes semantic colors from `src/app/globals.css` through Tailwind CSS v4's `@theme inline` block. Use the semantic Tailwind utility, not the raw value, in component code.

## Core palette

| Role | CSS value variable | Tailwind color name | Exact value | Implemented use |
| --- | --- | --- | --- | --- |
| Background | `--background` | `background` | `#FFFDF5` | Page canvas and the authentication form side |
| Foreground | `--foreground` | `foreground` | `#26352C` | Primary text and default control text |
| Primary | `--primary` | `primary` | `#256B50` | Main actions, links, brand panel, focus emphasis |
| Primary hover | `--primary-hover` | `primary-hover` | `#1B513C` | Hover state for primary buttons and text links |
| Primary foreground | `--primary-foreground` | `primary-foreground` | `#FFFFFF` | Text and marks on primary surfaces |
| Secondary | `--secondary` | `secondary` | `#E7F3E9` | Soft green surface and text-selection background |
| Secondary foreground | `--secondary-foreground` | `secondary-foreground` | `#256B50` | Content on secondary surfaces and selected text |
| Card / surface | `--card` | `card`, `surface` | `#FFFFFF` | Inputs, outline buttons, and white surfaces |
| Muted background | `--muted` | `muted` | `#F2F5ED` | Subdued surfaces and disabled input background |
| Muted foreground | `--muted-foreground` | `muted-foreground` | `#526459` | Secondary copy, helper text, and subdued labels |
| Border | `--border` | `border` | `#DCE5D9` | Default borders and separators |
| Accent | `--accent` | `accent` | `#F2B95E` | Restrained decorative emphasis in the brand panel |
| Accent foreground | `--accent-foreground` | `accent-foreground` | `#54390D` | Text intended for an accent surface; no inspected auth component currently uses it |
| Focus ring | `--ring` | `ring` | `#256B50` | Global outline color and component focus treatment |

`surface` is a semantic convenience alias of `card`; both currently resolve to white.

## Status colors

| Role | CSS value variable | Tailwind color name | Exact value | Current implementation |
| --- | --- | --- | --- | --- |
| Destructive | `--destructive` | `destructive` | `#B42318` | Auth field errors, alert text, error borders, and error rings |
| Success | `--success` | `success` | `#256B50` | Defined and available; no inspected auth component renders a success state |
| Info | `--info` | `info` | `#3366D6` | Defined and available; no inspected auth component uses it |
| Warning | `--warning` | `warning` | `#A66A15` | Defined and available; no inspected auth component uses it |

Do not infer additional status backgrounds or foregrounds. Only the single status color for each role is currently defined. The auth error alert derives translucent border and background treatments from `destructive` using Tailwind opacity modifiers.

## State usage

- Primary button idle: `bg-primary text-primary-foreground`.
- Primary button hover: `bg-primary-hover`.
- Outline button idle: `bg-card text-foreground border-border`.
- Outline button hover: `bg-muted` with `border-primary/35`.
- Input idle: `bg-card text-foreground border-border`.
- Input focus: `border-primary` and a three-pixel `primary/15` ring.
- Invalid input: `border-destructive` and a `destructive/15` ring.
- Disabled input: `bg-muted` with `opacity-60`.
- Disabled button: `opacity-50`, no hover shadow, and no pointer interaction.
- General component focus: forest-green outlines or a translucent primary ring.
- Text selection: `secondary` background with `secondary-foreground` text.

## Temporary compatibility aliases

The following Tailwind v4 aliases exist only to keep older presentation code viable while migration is evaluated. They must not be used in new code.

| Temporary alias | Resolves to | Semantic replacement |
| --- | --- | --- |
| `canvas` | `background` | `background` |
| `ink` | `foreground` | `foreground` |
| `surface-raised` | `card` | `card` or `surface` |
| `auth-backdrop` | `secondary` | `secondary` |
| `line` | `border` | `border` |
| `cobalt` | `primary` | `primary` |
| `cobalt-strong` | `primary-hover` | `primary-hover` |
| `cobalt-soft` | `secondary` | `secondary` |
| `on-cobalt` | `primary-foreground` | `primary-foreground` |

No class-based uses of these aliases were found under `src` during this documentation audit. Their continued declaration is therefore defensive compatibility, not evidence that new code should depend on them.

## Light-mode policy

Only light mode is implemented. `:root` holds the sole palette and declares `color-scheme: light`. There is no `.dark` selector, dark media query, or alternate token set. Components must not assume a dark palette exists.

## Exceptions and inconsistencies

- `GoogleMark.tsx` contains Google's blue, green, yellow, and red SVG fills. These are third-party brand colors and are not PawLingo semantic tokens.
- Existing dashboard and admin code contains hard-coded colors. Those values are outside this design-system definition and have not been normalized by the current auth/theme implementation.
- `GoogleSignInButton.tsx` uses `text-muted` for text. Because `muted` is defined as a background role, `text-muted-foreground` is the correct semantic text role in the current system. This is a documented inconsistency, not a new convention.

