# PawLingo UI - Coding Guidelines

## Project

PawLingo is an English vocabulary learning application.

## Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zod
* Zustand
* TanStack Query

## General Rules

* Use TypeScript.
* Prefer existing patterns over introducing new abstractions.
* Do not install new dependencies without approval.
* Do not modify unrelated files.
* Keep components small and focused.
* Reuse existing components whenever possible.
* Do not duplicate existing functionality.
* Follow the existing project structure and naming conventions.
* Do not refactor unrelated code while implementing a feature.

## Architecture

* Follow the existing project architecture.
* Organize code by feature when the existing project structure supports it.
* Keep UI components separate from business logic.
* Keep API/data-access logic separate from presentation components.
* Prefer composition over deeply nested or overly generic components.

## UI Components

* Use shadcn/ui for common UI components when an appropriate component exists.
* Prefer existing shadcn/ui components over creating custom equivalents.
* Customize shadcn/ui components when necessary to match the PawLingo design.
* Do not install another UI component library without explicit approval.
* Do not recreate components that already exist in the shadcn/ui component set.
* Keep reusable UI components in the existing project component structure.
* Follow the existing shadcn/ui conventions for component imports, variants, and composition.

## Data Fetching

* Use TanStack Query for server state.
* Do not use Zustand for server state.
* Do not fetch data directly inside presentational components when an existing data-access pattern is available.
* Reuse existing API clients and query patterns.

## State Management

* Use Zustand only for client/global state.
* Prefer local React state for component-local state.
* Do not introduce global state when local state is sufficient.

## Forms & Validation

* Use Zod for validation.
* Follow existing form-handling patterns.
* Reuse existing validation schemas when possible.
* Use shadcn/ui form-related components when appropriate.

## Styling

* Use Tailwind CSS.
* Use shadcn/ui as the primary UI component foundation.
* Follow existing Tailwind conventions.
* Reuse existing UI components.
* Do not introduce another styling solution without approval.
* Avoid unnecessary custom CSS when Tailwind or existing shadcn/ui components can solve the problem.

## Dependencies

* Do not install new dependencies without explicit approval.
* Before suggesting a new dependency, check whether the existing stack can solve the problem.
* Prefer the existing dependencies and shadcn/ui components whenever possible.

## Code Quality

* Avoid unnecessary abstractions.
* Avoid `any` unless there is a strong technical reason.
* Handle loading, error, and empty states where appropriate.
* Keep TypeScript types explicit and meaningful.
* Do not leave debug code such as `console.log` in production code.

## Testing & Verification

Before reporting a task as complete, run:

```bash
npm run lint
npm run typecheck
npm run build
```

If a command fails:

1. Investigate the root cause.
2. Fix the issue.
3. Run the command again.

Do not report the task as complete while known errors remain.

## Git / Changes

* Do not modify unrelated files.
* Keep changes focused on the requested feature.
* Do not create commits unless explicitly requested.
* Do not modify `.env` files or secrets.
* Do not remove existing functionality unless explicitly required.

## Task Execution

Before implementing a non-trivial feature:

1. Inspect the existing codebase.
2. Identify relevant existing patterns.
3. Create an implementation plan.
4. Explain the plan before making significant changes.
5. Implement the feature.
6. Run validation commands.
7. Review the final diff.
8. Report what changed and any remaining issues.

## Backend Integration

Before implementing features that depend on the backend:

1. Read `docs/backend-contract.md`.
2. If the contract is incomplete or potentially outdated, inspect `../pawlingo-api`.
3. Never guess backend API behavior.
4. Treat the backend repository as read-only unless explicitly instructed otherwise.