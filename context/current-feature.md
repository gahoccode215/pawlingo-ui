# Current Feature

## Status



## Goals



## Notes



## History

- 2026-08-16: Created static landing page prototype at `docs/pawlingo-landing/index.html` per Week 1 waitlist roadmap — hero, problem/why, features, personas, and waitlist CTA sections, styled with Tailwind (CDN) per project-overview.md.
- 2026-08-16: Reworked header to logo-left/centered-nav/login-register-right layout with mobile menu, and rebuilt footer into a 4-column layout (brand+social, Product, Support, copyright bar) with dynamic year.
- 2026-08-16: Landing Page Implementation feature left "In Progress" (branch `feature/landing-page-implementation`) — app/ moved to src/app/, all sections rebuilt as React/Tailwind v4 components, build+lint verified — when Vocabulary Learning spec was loaded on top of it. Resume/complete that feature separately before this history entry is superseded further.
- 2026-08-17: Completed Vocabulary Learning (Week 1 MVP) — topic intro, flashcard, mandatory 4-option quiz, Leitner-style 3-box repetition (wrong answers reset to box 1, capped at 5 repeats), and session summary screens, all wired via `VocabSession` at route `src/app/learn/page.tsx`. Local in-memory state only, no backend/DB. Added `src/types/vocab.ts`, `src/data/vocab/animals.ts`, `src/lib/vocab/{leitner,quiz}.ts`, `src/components/vocab/{TopicIntro,Flashcard,QuizCard,SessionSummary,VocabSession}.tsx`. Build and lint verified; UI not visually tested in-browser by Claude (user tests UI themselves).
