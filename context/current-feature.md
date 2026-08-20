# Current Feature: FE Vocabulary Content Integration (Vocab MVP, Phase 1)

## Status

In Progress

## Goals

- Integrate `GET /api/v1/vocabularies` (list, paginated, filterable by `topic`/`difficulty`/`search`) and `GET /api/v1/vocabularies/{id}` (detail) against the new backend content model.
- Build `/vocabulary` browse page: header, search bar, topic pill/chip tabs + difficulty dropdown, responsive card grid (1/2/3 cols).
- Build `/vocabulary/[id]` detail page with back-to-list (preserving prior filter/search/page), word/IPA/POS/difficulty/meaning/definition/example/topic sections.
- Vocabulary card shows word, POS+difficulty badges (color-coded by CEFR level), meaning, truncated example, IPA, and audio icon only when `pronunciationAudioUrl` is non-null.
- Implement loading (skeleton), empty, and error (with Retry) states — mutually exclusive, no blank/ambiguous screen.
- Sync `search` (debounced ~300-400ms), `topic`, `difficulty`, `page` to the URL query string; reset `page` to 0 on filter/search change.
- Simple Previous/Next pagination using `totalPages`, disabling at bounds.
- Mobile-first responsive (test ~375px), AA contrast on difficulty badges, full keyboard focus support, `aria-label` on audio icon.

## Notes

- Backend: `pawlingo-api`, endpoints on branch `feature/vocabulary-content-refactor` — **not yet merged to `main`**. Confirm with backend team that it's deployed before wiring real integration.
- This is a **full replacement** of the old Vocab model (`Topic` + `VocabWord`, `/api/v1/vocab/topics...`). Old endpoints are gone; remove any FE code still calling them. This is separate from the existing local/in-memory Leitner learning flow at `/learn` (`src/data/vocab/*`, `src/lib/vocab/{leitner,quiz}.ts`) — that flow's data model is unrelated and out of scope here unless explicitly merged later.
- Auth required (JWT `Authorization: Bearer <accessToken>`) — reuse session/token handling from `src/lib/api.ts` / `src/lib/auth/*` (see FE auth integration, completed 2026-08-19). 401 → `UNAUTHORIZED`.
- Response envelope: `{ success, data, error }` on every call; list response `data` = `{ content, page, size, totalElements, totalPages }`.
- Enums: `topic` (`work`, `education`, `travel`, `food`, `daily-life`), `difficulty` (CEFR `A1`-`C2`, use as-is for labels), `partOfSpeech` (`noun`, `verb`, `adjective`, `adverb`, `pronoun`, `preposition`, `conjunction`, `interjection`).
- `definition` and `pronunciationAudioUrl` can be `null` — no seed data currently has real audio; hide the audio icon entirely (not disabled/greyed) when null, and hide the whole Definition section (not just blank it) when null.
- Filtering/search/pagination is **server-side only** — always re-call the API on param change, never fetch-all-then-filter client-side.
- Phase 1 is browse-only: explicitly **no** flashcard/quiz/progress/mastery/XP/streak/spaced-repetition/AI-generated content/audio playback UI beyond the hide-if-null icon. Don't build ahead for those — separate spec later.
- Error codes: 404 `VOCABULARY_NOT_FOUND` (detail), 401 `UNAUTHORIZED`, 400 `VALIDATION_ERROR`, 500 `INTERNAL_ERROR`.
- Full spec retained at `context/features/fe-vocab-integration.md` for detailed UI/UX guidance (card layout priority, color-by-CEFR-level badge scheme, etc.) — refer back to it during implementation.

## History

- 2026-08-16: Created static landing page prototype at `docs/pawlingo-landing/index.html` per Week 1 waitlist roadmap — hero, problem/why, features, personas, and waitlist CTA sections, styled with Tailwind (CDN) per project-overview.md.
- 2026-08-16: Reworked header to logo-left/centered-nav/login-register-right layout with mobile menu, and rebuilt footer into a 4-column layout (brand+social, Product, Support, copyright bar) with dynamic year.
- 2026-08-16: Landing Page Implementation feature left "In Progress" (branch `feature/landing-page-implementation`) — app/ moved to src/app/, all sections rebuilt as React/Tailwind v4 components, build+lint verified — when Vocabulary Learning spec was loaded on top of it. Resume/complete that feature separately before this history entry is superseded further.
- 2026-08-17: Completed Vocabulary Learning (Week 1 MVP) — topic intro, flashcard, mandatory 4-option quiz, Leitner-style 3-box repetition (wrong answers reset to box 1, capped at 5 repeats), and session summary screens, all wired via `VocabSession` at route `src/app/learn/page.tsx`. Local in-memory state only, no backend/DB. Added `src/types/vocab.ts`, `src/data/vocab/animals.ts`, `src/lib/vocab/{leitner,quiz}.ts`, `src/components/vocab/{TopicIntro,Flashcard,QuizCard,SessionSummary,VocabSession}.tsx`. Build and lint verified; UI not visually tested in-browser by Claude (user tests UI themselves).
- 2026-08-19: Completed Vocabulary Learning Phase 2 (localStorage persistence, second topic "food", topic picker at `/learn` + `/learn/[topicId]`) and FE Auth Integration (email/password + Google Sign-In wired to the Spring Boot API via `src/lib/api.ts`/`src/lib/auth/*`, register/login screens, centralized Vietnamese error mapping, `/auth/me` session hydration, 401 handling scoped to authenticated requests only). Also translated the entire site UI (landing page, vocab learning flow, page metadata) to Vietnamese for the app's Vietnamese-speaking English-learner audience — vocab `word`/`exampleSentence` kept in English (the term being taught), `definition` and topic labels translated. Register intentionally has no `goal` field on FE (backend to make it optional/defaulted separately). Build and lint verified; UI not visually tested in-browser by Claude (user tests UI themselves) — Google Sign-In in particular still needs a real `NEXT_PUBLIC_GOOGLE_CLIENT_ID` from the backend team to test end-to-end.
- 2026-08-19: Completed Dark/Light Mode — CSS-variable theming (`data-theme` attribute, blocking init script so there's no flash of the wrong theme, `ThemeProvider`/`useTheme`) so existing `bg-cream`/`text-ink`-style utilities adapt automatically instead of `dark:`-prefixed classes everywhere; toggle button in `Header.tsx`, choice persisted to `localStorage`, default light. Fixed a class of bugs this surfaced across the landing page: components using *fixed* (non-theme-flipping) colors paired with *flipping* text/background — unreadable or visually static across themes — in `Footer.tsx`, `WhySection.tsx`'s "PawLingo" card, `Features.tsx`'s badge and icon tile, and vocab `QuizCard`/`SessionSummary`. Footer was rebuilt twice on user feedback: first inverted to `bg-ink`/`text-cream` (still fixed-feeling), then corrected to the normal `bg-cream`/`text-ink` pairing to match `Header`. Also bumped section-boundary borders (`ink/5` → `ink/10`) so alternating `cream`/`surface` sections stay visibly separated. Out-of-scope side work bundled into this branch at user request: removed the waitlist CTA (real registration now exists; Hero's CTA links to `/register`), added the `/home` post-login dashboard with real Leitner-based progress bars (`src/lib/vocab/progress.ts`), Header logged-in state (email + logout), and route-aware active auth link styling. Documented a planned shadcn/ui migration + dependency list in `project-overview.md`. Build and lint verified; UI visually tested by the user themselves across iterations.
