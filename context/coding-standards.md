# Coding Standards

## Architecture Overview
- **Frontend**: Next.js (App Router) — UI only, no database access
- **Backend**: Spring Boot REST API — owns all business logic and database access
- Next.js talks to Spring Boot exclusively over HTTP (server-side `fetch` or the shared API client)

## TypeScript
- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React
- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js
- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Backend is a separate **Spring Boot REST API** — Next.js is frontend-only, no direct DB access
- Server components fetch data by calling the Spring Boot API directly (server-side `fetch`)
- Client components call the Spring Boot API via a shared API client (`src/lib/api.ts`), not Server Actions with a DB
- Use Next.js API routes (Route Handlers) only when you need:
  - A proxy/BFF layer in front of the Spring Boot API (e.g. hiding internal URLs, combining calls)
  - File uploads with progress tracking
  - Third-party integrations specific to the frontend (e.g. NextAuth callbacks)
- Dynamic routes for item/collection pages

## Tailwind CSS v4
**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.
- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed

Example v4 configuration:
```css
@import "tailwindcss";
@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization
- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Route Handlers (BFF/proxy only): `src/app/api/[route]/route.ts`
- API client: `src/lib/api.ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`
- Validation schemas: `src/lib/validation/[feature].ts`

## Naming
- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling
- Tailwind CSS for all styling
- Use shadcn/ui components where applicable
- No inline styles
- Dark mode first, light mode as option

## Data Fetching
- **Server components**: fetch directly from the Spring Boot API using server-side `fetch` (can attach auth cookies/tokens as needed)
- **Client components**: call the Spring Boot API through the shared API client (`src/lib/api.ts`) — centralizes base URL, auth headers, and response parsing
- Never call Spring Boot endpoints with raw `fetch` scattered across client components — always go through `src/lib/api.ts`
- Validate all inputs with Zod before sending to the API (forms, query params, etc.)

## Error Handling
- **Server components**: wrap the `fetch` call in try/catch; on failure, throw to trigger the nearest `error.tsx`, or render a fallback UI directly
- **Client components / API client**: `src/lib/api.ts` normalizes Spring Boot error responses into a consistent shape, e.g. `{ success, data, error }`
- Display user-friendly error messages via toast on the client
- Never leak raw backend error messages/stack traces to the UI — map known error codes to friendly copy

## Code Quality
- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible