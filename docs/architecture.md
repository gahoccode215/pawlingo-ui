# PawLingo UI - Architecture

## 1. Overview

PawLingo UI is a web application built with Next.js App Router, React, and TypeScript.

The architecture should remain simple, feature-oriented, and easy to understand.

Do not introduce complex architecture patterns unless the project has a clear need for them.

### Core Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zod
* TanStack Query
* Zustand

### Architectural Principles

1. Prefer Next.js conventions over custom frameworks.
2. Prefer Server Components by default.
3. Use Client Components only when client-side capabilities are required.
4. Keep UI components separate from data-fetching and business logic.
5. Organize complex functionality by feature.
6. Reuse existing components and utilities.
7. Avoid premature abstractions.
8. Keep dependencies minimal.
9. Prefer simple solutions over enterprise-style patterns.

---

# 2. Project Structure

The recommended project structure is:

```text
pawlingo-ui/
│
├── AGENTS.md
├── docs/
│   ├── architecture.md
│   ├── conventions.md
│   └── features/
│
├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── vocabulary/
│   │   ├── auth/
│   │   └── ...
│   │
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── ...
│
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── eslint.config.mjs
```

The `src` directory is optional in Next.js, but it is recommended for PawLingo because it separates application source code from project configuration files.

Next.js officially supports placing `app` inside `src`.

---

# 3. App Router

The `src/app` directory is responsible primarily for:

* Routing
* Pages
* Layouts
* Loading UI
* Error boundaries
* Route handlers
* Metadata

Example:

```text
src/app/
├── layout.tsx
├── page.tsx
├── globals.css
│
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
│
├── (dashboard)/
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── vocabulary/
│       └── page.tsx
│
└── not-found.tsx
```

Route groups such as `(dashboard)` are organizational and do not become part of the URL.

For example:

```text
src/app/(dashboard)/vocabulary/page.tsx
```

maps to:

```text
/vocabulary
```

Next.js supports route groups specifically for organizing routes without changing the URL structure.

---

# 4. Server Components

Server Components are the default.

Prefer Server Components whenever possible.

Use them for:

* Static UI
* Initial page rendering
* Server-side data fetching
* Metadata
* Pages and layouts
* Content that does not require browser APIs

Example:

```tsx
export default async function VocabularyPage() {
  const vocabulary = await getVocabulary()

  return <VocabularyList vocabulary={vocabulary} />
}
```

Do not add `"use client"` unless the component actually needs client-side functionality.

---

# 5. Client Components

Use Client Components when the component requires:

* `useState`
* `useEffect`
* Event handlers
* Browser APIs
* Interactive UI
* Client-side state
* Client-side libraries

Example:

```tsx
"use client"

import { useState } from "react"

export function VocabularySearch() {
  const [query, setQuery] = useState("")

  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  )
}
```

Keep the Client Component boundary as small as practical.

Do not make an entire page a Client Component when only one interactive component requires it.

Next.js recommends using Client Components when state, event handlers, effects, or browser APIs are required.

---

# 6. Components

Use three main categories.

## UI Components

Location:

```text
src/components/ui/
```

These are shadcn/ui components.

Examples:

```text
button.tsx
dialog.tsx
input.tsx
select.tsx
card.tsx
```

Do not manually recreate a component when an appropriate shadcn/ui component already exists.

shadcn/ui provides components directly in the project rather than treating the library as a traditional opaque component dependency. Its CLI can add components such as `button` and `card` to the application.

---

## Shared Components

Location:

```text
src/components/shared/
```

Use this directory for application-wide components that are not specific to one feature.

Examples:

```text
Header
Sidebar
PageHeader
EmptyState
LoadingState
ErrorState
ConfirmDialog
```

A component should only be placed here when it is genuinely shared.

Do not move a component here just because it might theoretically be reused in the future.

---

## Feature Components

Location:

```text
src/features/
```

Example:

```text
src/features/vocabulary/
├── components/
│   ├── vocabulary-card.tsx
│   ├── vocabulary-list.tsx
│   └── vocabulary-search.tsx
│
├── hooks/
│   └── use-vocabulary.ts
│
├── api/
│   └── vocabulary-api.ts
│
├── schemas/
│   └── vocabulary-schema.ts
│
├── types/
│   └── vocabulary.ts
│
└── index.ts
```

Feature-specific components should stay inside the feature.

This prevents `src/components/` from becoming a large collection of unrelated components.

---

# 7. Feature Architecture

A feature should generally follow this flow:

```text
Page
 ↓
Feature Component
 ↓
Feature Hook / Query
 ↓
API / Service
 ↓
Backend
```

For example:

```text
src/app/(dashboard)/vocabulary/page.tsx
        ↓
src/features/vocabulary/components/vocabulary-list.tsx
        ↓
src/features/vocabulary/hooks/use-vocabulary.ts
        ↓
src/features/vocabulary/api/vocabulary-api.ts
        ↓
Spring Boot API
```

Do not put API calls directly inside large UI components.

---

# 8. Data Fetching

Use the appropriate strategy for the situation.

## Server-side data

Prefer Next.js Server Components and server-side data fetching when appropriate.

## Client-side server state

Use TanStack Query when the application needs:

* Client-side fetching
* Caching
* Refetching
* Mutations
* Pagination
* Infinite queries
* Optimistic updates
* Synchronization between multiple components

TanStack Query should be treated as server-state management.

Do not use Zustand to store API/server state.

---

# 9. Zustand

Use Zustand for client-side application state.

Examples:

* UI preferences
* Sidebar state
* Theme-related client state
* Temporary client workflows
* Client-only global state

Do not use Zustand as a replacement for TanStack Query.

Avoid global state when local React state is enough.

---

# 10. Zod

Use Zod for runtime validation.

Typical use cases:

* Form validation
* API response validation when needed
* Query parameter validation
* Environment variable validation
* User input validation

Example:

```ts
import { z } from "zod"

export const vocabularySchema = z.object({
  word: z.string().min(1),
  meaning: z.string().min(1),
})
```

Keep feature-specific schemas inside the feature when possible.

---

# 11. API / Service Layer

Do not scatter API calls throughout UI components.

Prefer:

```text
src/features/vocabulary/api/
└── vocabulary-api.ts
```

Example:

```ts
export async function getVocabulary() {
  const response = await fetch("/api/vocabulary")

  if (!response.ok) {
    throw new Error("Failed to fetch vocabulary")
  }

  return response.json()
}
```

When the project introduces a shared API client, reuse it instead of creating separate fetch configurations in every feature.

---

# 12. Hooks

Use:

```text
src/hooks/
```

for genuinely shared hooks.

Example:

```text
src/hooks/
├── use-debounce.ts
├── use-media-query.ts
└── use-mobile.ts
```

Feature-specific hooks should remain inside the feature:

```text
src/features/vocabulary/hooks/
```

Do not create a hook simply to wrap one line of code unless it improves readability or encapsulation.

---

# 13. Utilities

Use:

```text
src/lib/
```

for shared utilities and infrastructure-level helpers.

Examples:

```text
src/lib/
├── utils.ts
├── api-client.ts
└── constants.ts
```

Avoid putting business logic into `lib/`.

Business logic should normally belong to its relevant feature.

---

# 14. Types

Use:

```text
src/types/
```

only for types that are genuinely shared across multiple features.

Feature-specific types should stay inside the feature.

Prefer:

```text
src/features/vocabulary/types/
```

over:

```text
src/types/vocabulary.ts
```

when the type is only used by Vocabulary.

---

# 15. Route Groups

Use route groups to organize sections of the application.

Example:

```text
app/
├── (marketing)/
├── (auth)/
└── (dashboard)/
```

Possible structure:

```text
src/app/
├── (marketing)/
│   ├── page.tsx
│   └── pricing/
│       └── page.tsx
│
├── (auth)/
│   ├── login/
│   └── register/
│
└── (dashboard)/
    ├── layout.tsx
    ├── dashboard/
    └── vocabulary/
```

Use route groups for organization, not as a replacement for feature architecture.

---

# 16. Loading and Error States

Use Next.js route-level conventions when appropriate:

```text
loading.tsx
error.tsx
not-found.tsx
```

Example:

```text
src/app/(dashboard)/vocabulary/
├── page.tsx
├── loading.tsx
└── error.tsx
```

Use component-level loading and error states when only a specific part of a page requires them.

---

# 17. Metadata

Use Next.js metadata APIs for page metadata.

Prefer:

```ts
export const metadata = {
  title: "Vocabulary | PawLingo",
  description: "Manage your English vocabulary",
}
```

Keep metadata close to the relevant route when practical.

---

# 18. Styling

Use:

* Tailwind CSS
* shadcn/ui

Avoid introducing additional styling systems.

Prefer:

```tsx
<div className="flex items-center gap-4">
```

instead of creating custom CSS for simple layout requirements.

Use custom CSS only when Tailwind or existing components are not appropriate.

---

# 19. Import Aliases

Use the `@/*` alias.

Prefer:

```ts
import { Button } from "@/components/ui/button"
```

instead of:

```ts
import { Button } from "../../../components/ui/button"
```

Keep import paths predictable and consistent.

---

# 20. Dependency Management

Keep dependencies minimal.

Before installing a package:

1. Check whether Next.js already provides the functionality.
2. Check whether React provides the functionality.
3. Check whether an existing PawLingo dependency solves the problem.
4. Check whether shadcn/ui already provides the required UI.
5. Only then consider adding a dependency.

Do not install dependencies automatically without approval.

---

# 21. Architectural Decision Rule

When choosing between two approaches:

Prefer this order:

```text
Next.js convention
        ↓
React convention
        ↓
Existing PawLingo pattern
        ↓
Existing dependency
        ↓
Simple custom solution
        ↓
New dependency / abstraction
```

Do not introduce:

* Redux
* another UI library
* another state-management library
* another data-fetching library
* unnecessary design patterns

unless there is a clear requirement.

---

# 22. Recommended Feature Example

A mature Vocabulary feature could eventually look like:

```text
src/
├── app/
│   └── (dashboard)/
│       └── vocabulary/
│           ├── page.tsx
│           ├── loading.tsx
│           └── error.tsx
│
├── components/
│   ├── ui/
│   └── shared/
│
├── features/
│   └── vocabulary/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── schemas/
│       ├── types/
│       ├── constants/
│       └── index.ts
│
├── hooks/
├── lib/
├── stores/
└── types/
```

Do not create every directory in advance.

Create directories only when the feature actually needs them.

---

# 23. Keep It Simple

PawLingo is not an enterprise framework.

Avoid architecture for architecture's sake.

Good:

```text
page
 ↓
feature component
 ↓
query
 ↓
API
```

Avoid unnecessarily complex chains such as:

```text
page
 ↓
controller
 ↓
facade
 ↓
application service
 ↓
domain service
 ↓
repository abstraction
 ↓
API adapter
```

The frontend should remain understandable to developers who are learning and maintaining the project.

---

# 24. Final Principle

The architecture should evolve with the project.

Start simple.

When repeated patterns appear, extract them.

When a feature becomes complex, isolate it.

When a component becomes shared, move it to shared components.

When state becomes global, consider Zustand.

When server state becomes complex, use TanStack Query.

Do not design the entire application around problems that do not exist yet.
