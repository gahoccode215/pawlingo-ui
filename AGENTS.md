# PawLingo Frontend — Codex Instructions

## Mission
Build and maintain PawLingo as a consistent, accessible English-learning application. Make focused changes that fit the existing architecture. Do not introduce dependencies, redesign unrelated screens, or modify authentication contracts without a clear reason.

## Source of truth: inspect before implementing
At the beginning of each task, inspect only the relevant parts of the repository:
1. Read `package.json` and the lockfile to identify installed packages, versions, scripts, and package manager. Never assume the inventory below is up to date.
2. Read the relevant routes, components, styles, configuration, and nearby patterns. Check `components.json` to understand shadcn/ui setup, if present.
3. Discover available Codex skills and read the relevant `SKILL.md` before following it. Do not assume a skill exists solely because it is named here.
4. Check `git status` and preserve pre-existing user changes. Never overwrite unrelated work.

## Known project context (verify against the repository)
- Next.js App Router, React, TypeScript, Tailwind CSS.
- NextAuth/Auth.js for authentication; Spring Boot provides the backend REST API and application JWTs.
- The project may use shadcn/ui, React Hook Form, Zod, and other packages. Verify actual installation and existing usage before importing them.
- Treat `package.json`, the lockfile, and actual source code as authoritative for exact versions and current conventions.

## Routing and layouts
- `src/app/(guest)` contains the landing page and `(auth)` login/register pages. The current guest layout is a transparent wrapper; `AuthPageShell` owns the full login/register presentation. Inspect the layout before changing this arrangement.
- `src/app/(user)` contains authenticated user pages.
- `src/app/(admin)` contains administrative pages.
- Route groups do not appear in URLs and do not enforce access control.
- Preserve existing URLs and nested-layout behavior. Confirm the actual structure before making changes.

## Library-first implementation
- Prefer existing installed packages, shared components, utilities, and established patterns.
- Before adding a package, explain the unmet need, why current dependencies are insufficient, its maintenance and compatibility considerations, and its expected bundle/runtime cost.
- Suggest at most 1–2 reasonable packages with a brief trade-off comparison when they materially improve the task.
- Ask for approval before installing, removing, or upgrading dependencies or changing the lockfile. Do not install merely to implement a trivial utility.
- Do not duplicate functionality already covered by existing packages.

## Design and Taste Skill
- For any UI/UX task, discover and read the installed Taste Skill (`design-taste-frontend` or its actual installed name). Apply its instructions alongside existing project conventions. If unavailable, say so and follow the design principles below; do not pretend to have used it.
- Inspect the current brand, landing page, design tokens, typography, assets, and existing shadcn/ui components before designing.
- Preserve visual consistency across landing, login, register, user dashboard, and admin dashboard while allowing each area an appropriate layout.
- Favor deliberate spacing, clear hierarchy, restrained color, accessible contrast, purposeful motion, and responsive behavior.
- Avoid generic AI-looking gradients, excessive cards, decorative animation, and inconsistent component variants.
- For substantial redesigns, propose the design direction and affected files before implementation.
- Do not generate or replace brand assets without permission.

## Authentication and security
- Preserve existing NextAuth providers, callbacks, Spring Boot endpoints, and JWT/refresh-token behavior unless the task explicitly requires changes.
- Keep server secrets and refresh tokens out of client-exposed session data and browser bundles.
- Never trust client-side role checks as the only authorization mechanism. Spring Boot must enforce access to protected APIs.
- Do not log credentials, ID tokens, access tokens, refresh tokens, or secrets.
- Never invent backend response fields: inspect existing DTOs and API client types.

## Code quality and UX
- Use TypeScript types; avoid `any` and `@ts-ignore` unless justified and documented.
- Prefer accessible semantic elements, keyboard support, visible focus, loading/error/empty states, and mobile-first layouts.
- Reuse shared UI primitives instead of creating near-duplicates.
- Keep server-only logic on the server. Do not add `use client` without a concrete need.
- Follow existing formatting, naming, file organization, and data-fetching patterns.

## Workflow and delivery
1. Inspect the relevant code, dependencies, available skills, and `git status`.
2. Briefly summarize the approach. For broad changes, list affected files and wait for approval; for small, well-scoped changes, proceed.
3. Implement the smallest coherent change while preserving existing behavior.
4. Run the relevant scripts available in `package.json` (such as lint, typecheck, and tests). Do not claim a check passed unless it ran.
5. Report changed files, dependency suggestions or changes, verification results, and remaining limitations.
6. Never commit, push, delete user work, or change backend contracts unless explicitly requested.

## Design Skill Selection

Before implementing frontend UI:

1. Identify the page type and design requirements.
2. Select the most appropriate installed skill.
3. Read its SKILL.md before implementation.
4. Avoid combining multiple design skills
   unless they serve distinct purposes.

Preferred skills:

- Landing pages: design-taste-frontend
- Login/Register: design-taste-frontend
- Existing UI redesign: redesign-existing-projects
- Advanced UX/motion: gpt-taste
- Visual references: imagegen-frontend-web

For dashboards and complex interfaces:
- Prioritize established application UI patterns.
- Reuse existing shadcn/ui components.
- Do not force marketing-oriented design patterns
  into data-heavy application interfaces.

Always preserve existing branding and architecture.


## Mandatory PawLingo Design System

PawLingo uses the Forest & Cream design system.

Before creating or modifying any frontend UI:

1. Read `docs/design-system/README.md`.
2. Read the relevant detailed documentation: `colors.md`, `typography.md`, and/or `components.md` in `docs/design-system/`.
3. Inspect the current semantic tokens in `src/app/globals.css`.
4. Reuse existing tokens and shared UI components.
5. Follow the existing typography, spacing and component conventions.
6. Do not introduce new colors, a new color palette, or a competing theme without explicit approval.
7. Do not hardcode colors when a suitable semantic token exists.
8. Preserve accessibility and responsive behavior.
9. Do not expand use of temporary legacy aliases; use their documented semantic replacements.

If a design requirement is not covered by the documentation,
propose an extension rather than silently inventing new rules.

The documentation describes design intent.
The current source code defines actual implementation.
If they disagree, report the inconsistency before making changes.
