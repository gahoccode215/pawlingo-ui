# Vocabulary mock service

Backs the 3 vocabulary screens (`/vocabularies`, `/vocabularies/[id]`, `/me/vocabularies`)
with in-memory data so they run without the backend. Spec: `context/features/vocab-fe-spec-01-mock.md`.

## Toggling mock vs real

Set in `.env.local`:

```
NEXT_PUBLIC_USE_MOCK_VOCABULARY=false
```

Defaults to mock (`true`) when unset. See `src/lib/vocabulary/config.ts`. Components only
ever import `vocabularyService` from `src/lib/vocabulary/service.ts` — never this mock
directly — so flipping the flag is the only change needed once a real service
implementation replaces the `realVocabularyService` stub in `service.ts`.

## Seeding more data

Add entries to `WORD_SEEDS` in `src/lib/vocabulary/mock/data.ts`. IDs (`word-NNN`) and
example IDs are generated automatically from array order.

## Simulating errors

Append `?__mockError=<code>` to any of the 3 routes' URL:

| Code | Result |
|---|---|
| `validation` | 400 `VALIDATION_ERROR` |
| `not-found` | 404 `WORD_NOT_FOUND` |
| `network` | `NETWORK_ERROR` (status 0) |
| `server` | 500 `INTERNAL_ERROR` |

e.g. `/vocabularies?__mockError=server` or `/vocabularies/word-001?__mockError=not-found`.

## Known limitations (accepted for this phase)

- The saved-vocabulary store (`userVocabularies` in `mock/service.ts`) is a plain in-memory
  array scoped to the JS module — it resets on a full page reload (F5), and there's a
  single fixed user (`mock-user-1`), no real login required.
- Every request has a simulated 300–600ms delay, even on a fast connection.
- **`topic` (education/travel/holiday/work/daily-life/food) is a mock-only field, added
  2026-08-29 for the `/home` dashboard's topic grid.** The real BE Spec 01 `Word` model has
  no topic column — `pawlingo-api` needs to add one before real-API integration can support
  filtering/grouping by topic. Until then, this only exists in the mock.
