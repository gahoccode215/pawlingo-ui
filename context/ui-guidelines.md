# PawLingo UI Guidelines

Read this file before implementing or modifying frontend UI.

## Component foundation

- Use existing shadcn/ui components from `src/components/ui` for standard controls such as buttons, inputs, labels, dialogs, dropdowns, tabs, forms, and feedback elements.
- Customize shadcn/ui components with Tailwind CSS so they match the PawLingo visual language; do not leave components in an unrelated default appearance.
- Use native HTML elements when no appropriate shadcn/ui component exists or when a specialized interactive element would become less accessible or harder to maintain.
- Do not recreate a component already available in `src/components/ui`.
- Do not install another component library or new dependency without explicit approval.
- If a suitable shadcn/ui component is not installed, ask the user for approval to add it instead of recreating it or silently choosing a different library.

## Styling

- Use Tailwind CSS v4 for layout, responsive behavior, spacing, typography, color, states, and animation.
- Keep Tailwind theme values and shared CSS variables in `src/app/globals.css` using Tailwind v4 CSS configuration.
- Do not create a `tailwind.config.js` or `tailwind.config.ts` file.
- Avoid inline `style` unless the value must be calculated dynamically at runtime.
- Reuse the existing PawLingo design tokens and component variants before adding new hard-coded values.
- Maintain accessible focus, hover, active, disabled, loading, error, and empty states where relevant.

## Implementation preference

For a standard UI control, use this order:

1. Existing PawLingo feature component.
2. Existing shadcn/ui component in `src/components/ui`.
3. shadcn/ui component customized with Tailwind.
4. Focused custom component using Tailwind when the first three options do not fit.

Keep presentation components separate from authentication, API, and business logic.
