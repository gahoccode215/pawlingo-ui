# PawLingo UI - Coding Conventions

## 1. General Philosophy

Write code that is:

* Simple
* Readable
* Predictable
* Type-safe
* Easy to maintain

Prefer consistency with the existing project over personal preferences.

Do not introduce a new pattern when an existing project pattern already works.

---

# 2. File Naming

Use lowercase kebab-case for files.

Good:

```text
vocabulary-card.tsx
use-vocabulary.ts
api-client.ts
vocabulary-schema.ts
```

Avoid:

```text
VocabularyCard.tsx
useVocabulary.ts
ApiClient.ts
```

React component names inside files should use PascalCase.

```tsx
export function VocabularyCard() {
  return (...)
}
```

---

# 3. Component Naming

Use PascalCase for React components.

```tsx
function VocabularyCard() {}
function UserProfile() {}
function SearchInput() {}
```

Component names should describe what the component represents.

Good:

```text
VocabularyCard
VocabularyList
VocabularySearch
```

Avoid vague names:

```text
DataBox
Thing
Content
Wrapper
Component1
```

---

# 4. Functions

Use camelCase.

```ts
getVocabulary()
createVocabulary()
updateVocabulary()
deleteVocabulary()
```

Functions should describe their action.

Prefer:

```ts
getVocabulary()
```

over:

```ts
handleData()
```

when the function actually retrieves vocabulary.

---

# 5. Hooks

Hooks must start with `use`.

```ts
useVocabulary()
useDebounce()
useCurrentUser()
```

Feature-specific hooks belong to the feature:

```text
features/vocabulary/hooks/
```

Shared hooks belong in:

```text
hooks/
```

---

# 6. Types

Use PascalCase.

```ts
type Vocabulary = {}
interface UserProfile {}
```

Prefer `type` by default unless `interface` provides a specific advantage.

Avoid unnecessary type duplication.

Do not create a type if TypeScript can safely infer the type and the explicit type does not improve readability.

---

# 7. TypeScript

Use strict TypeScript.

Avoid:

```ts
any
```

Prefer:

```ts
unknown
```

when the type is genuinely unknown.

Do not use type assertions to silence errors without understanding the underlying issue.

Avoid:

```ts
const data = response as Vocabulary
```

unless the assertion is justified.

Prefer proper validation or typing where possible.

---

# 8. Components

Keep components focused.

Good:

```tsx
<VocabularyCard />
<VocabularySearch />
<VocabularyList />
```

Avoid a single component containing:

* API calls
* complex state
* validation
* business logic
* multiple unrelated UI sections

When a component becomes difficult to understand, consider extracting a smaller component or moving logic into a hook/service.

---

# 9. Server vs Client Components

Prefer Server Components by default.

Do not add:

```tsx
"use client"
```

unless required.

Use Client Components when you need:

* State
* Event handlers
* Effects
* Browser APIs
* Client-side libraries
* Interactive UI

Keep the client boundary as small as possible.

---

# 10. Props

Prefer explicit props.

Good:

```tsx
type VocabularyCardProps = {
  word: string
  meaning: string
  pronunciation?: string
}

export function VocabularyCard({
  word,
  meaning,
  pronunciation,
}: VocabularyCardProps) {
  ...
}
```

Avoid passing large generic objects when only a few fields are needed.

Prefer:

```tsx
<VocabularyCard
  word={vocabulary.word}
  meaning={vocabulary.meaning}
/>
```

when appropriate.

---

# 11. State

Choose the smallest appropriate state scope.

Use this order:

```text
Local React state
        ↓
Context
        ↓
Zustand
```

Use local state when only one component needs the state.

Use Zustand when multiple unrelated components need shared client state.

Do not use global state simply because it is convenient.

---

# 12. Server State

Server state should not be treated as ordinary client state.

Use TanStack Query when the feature requires client-side server-state management.

Examples:

```text
queries
mutations
cache
refetching
pagination
optimistic updates
```

Do not duplicate the same server data into Zustand unless there is a specific architectural reason.

---

# 13. Data Fetching

Keep API calls outside presentational components.

Avoid:

```tsx
function VocabularyList() {
  const data = await fetch(...)
  
  return (...)
}
```

when the project already has an API/service/query pattern.

Prefer:

```text
VocabularyList
      ↓
useVocabulary
      ↓
vocabulary-api
```

---

# 14. Forms

Use:

* React form patterns already established in the project
* Zod for validation
* shadcn/ui form components when appropriate

Keep validation schemas separate from UI components.

Example:

```text
features/vocabulary/
├── components/
│   └── vocabulary-form.tsx
└── schemas/
    └── vocabulary-schema.ts
```

---

# 15. shadcn/ui

Use shadcn/ui as the primary UI component foundation.

Prefer:

```tsx
import { Button } from "@/components/ui/button"
```

over creating another Button implementation.

When a shadcn/ui component exists:

1. Reuse it.
2. Customize it if necessary.
3. Create a wrapper only when there is a real application-specific reason.

Do not modify shadcn/ui components unnecessarily.

Do not install another UI library without approval.

---

# 16. Tailwind CSS

Use Tailwind for styling.

Prefer utility classes:

```tsx
<div className="flex items-center gap-4">
```

Avoid unnecessary custom CSS.

Use responsive utilities:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

Keep class names readable.

When a class list becomes excessively long, consider whether the component should be split or a reusable component should be created.

---

# 17. Conditional Classes

Use the existing `cn()` utility for conditional Tailwind classes.

Example:

```tsx
<div
  className={cn(
    "rounded-lg border p-4",
    isActive && "border-primary"
  )}
/>
```

Do not manually concatenate complex class strings.

---

# 18. Imports

Prefer absolute imports using `@`.

Good:

```ts
import { Button } from "@/components/ui/button"
import { VocabularyCard } from "@/features/vocabulary/components/vocabulary-card"
```

Avoid:

```ts
import { Button } from "../../../components/ui/button"
```

Group imports logically when the project has an established convention.

---

# 19. Constants

Avoid magic values.

Bad:

```ts
if (status === 3) {}
```

Prefer:

```ts
const VOCABULARY_STATUS = {
  LEARNING: 3,
}
```

Feature-specific constants should stay inside the feature.

---

# 20. Error Handling

Do not silently ignore errors.

Bad:

```ts
try {
  await createVocabulary()
} catch {}
```

Handle errors appropriately.

For UI:

* Show meaningful error states.
* Use existing error components when available.
* Avoid exposing internal technical details to users.

For development:

* Preserve useful error information for debugging.

---

# 21. Loading States

Every asynchronous UI should consider:

* Loading
* Success
* Empty
* Error

Example:

```text
Loading → Skeleton
Success → Data
Empty → EmptyState
Error → ErrorState
```

Use `loading.tsx` for route-level loading states when appropriate.

Use component-level loading states for smaller interactive areas.

---

# 22. Empty States

Do not render a blank page when there is no data.

Prefer:

```tsx
<EmptyState
  title="No vocabulary yet"
  description="Start adding words to build your vocabulary."
/>
```

Use shadcn/ui primitives and shared components where appropriate.

---

# 23. Accessibility

UI should be accessible by default.

Examples:

* Use semantic HTML.
* Use `<button>` for actions.
* Use `<a>` or Next.js `Link` for navigation.
* Provide labels for form controls.
* Do not rely only on color to communicate state.
* Ensure interactive elements are keyboard accessible.
* Use appropriate ARIA attributes when necessary.

Do not use clickable `<div>` elements when a semantic element is available.

---

# 24. Next.js Navigation

Use Next.js navigation APIs.

Prefer:

```tsx
import Link from "next/link"

<Link href="/vocabulary">
  Vocabulary
</Link>
```

instead of manually manipulating `window.location`.

For programmatic navigation, use Next.js navigation hooks where appropriate.

---

# 25. Images

Use Next.js image optimization where appropriate.

Prefer:

```tsx
import Image from "next/image"
```

instead of using raw `<img>` for application images unless there is a specific reason.

Provide appropriate dimensions or responsive configuration.

---

# 26. Environment Variables

Never hardcode secrets.

Use:

```text
.env.local
```

for local development.

Do not commit secrets.

Only variables explicitly intended for the browser should use the `NEXT_PUBLIC_` prefix.

Never expose:

```text
DATABASE_URL
JWT_SECRET
API_SECRET
```

through client-side environment variables.

---

# 27. Business Logic

Do not put large amounts of business logic inside JSX.

Avoid:

```tsx
return (
  <div>
    {items
      .filter(...)
      .map(...)
      .filter(...)
      .sort(...)
      .map(...)}
  </div>
)
```

Move complex logic into:

* Functions
* Hooks
* Services
* Feature utilities

Keep JSX focused on presentation.

---

# 28. Reusability

Do not optimize for theoretical reuse.

Bad:

```text
UniversalDataRenderer
GenericEntityCard
AbstractFormBuilder
```

when they are only used once.

Prefer simple components first.

Extract reusable abstractions when repeated patterns become clear.

---

# 29. Comments

Write comments only when they explain something that is not obvious from the code.

Good:

```ts
// Keep this cache short because vocabulary progress changes frequently.
```

Avoid:

```ts
// Set loading to true
setLoading(true)
```

Prefer self-explanatory code.

---

# 30. Dependencies

Before adding a dependency:

1. Check Next.js.
2. Check React.
3. Check existing dependencies.
4. Check shadcn/ui.
5. Consider whether a small local utility is enough.

Do not add a package for a problem that can be solved simply with existing tools.

---

# 31. Git Changes

Keep changes focused.

If implementing:

```text
Vocabulary search
```

do not simultaneously refactor:

```text
Authentication
Header
Dashboard
Theme system
```

unless required.

Small focused commits and diffs are easier to review.

---

# 32. Verification

Before completing a task, run:

```bash
npm run lint
npm run typecheck
npm run build
```

If tests exist:

```bash
npm test
```

Fix errors before reporting completion.

Review:

```bash
git diff
git status
```

before finishing.

---

# 33. Definition of Done

A feature is considered complete when:

* The requested behavior works.
* TypeScript has no errors.
* ESLint passes.
* Build succeeds.
* Loading states are handled where needed.
* Error states are handled where needed.
* Empty states are handled where needed.
* Accessibility has been considered.
* No unrelated files were changed.
* No unnecessary dependencies were introduced.
* The final diff has been reviewed.
