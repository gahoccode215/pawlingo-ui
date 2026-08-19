# Current Feature

## Status

Not Started

## Goals

<!-- Bullet points of what success looks like -->

## Notes

<!-- Additional context, constraints, or details from spec -->

## History

- 2026-08-16: Created static landing page prototype at `docs/pawlingo-landing/index.html` per Week 1 waitlist roadmap — hero, problem/why, features, personas, and waitlist CTA sections, styled with Tailwind (CDN) per project-overview.md.
- 2026-08-16: Reworked header to logo-left/centered-nav/login-register-right layout with mobile menu, and rebuilt footer into a 4-column layout (brand+social, Product, Support, copyright bar) with dynamic year.
- 2026-08-16: Landing Page Implementation feature left "In Progress" (branch `feature/landing-page-implementation`) — app/ moved to src/app/, all sections rebuilt as React/Tailwind v4 components, build+lint verified — when Vocabulary Learning spec was loaded on top of it. Resume/complete that feature separately before this history entry is superseded further.
- 2026-08-17: Completed Vocabulary Learning (Week 1 MVP) — topic intro, flashcard, mandatory 4-option quiz, Leitner-style 3-box repetition (wrong answers reset to box 1, capped at 5 repeats), and session summary screens, all wired via `VocabSession` at route `src/app/learn/page.tsx`. Local in-memory state only, no backend/DB. Added `src/types/vocab.ts`, `src/data/vocab/animals.ts`, `src/lib/vocab/{leitner,quiz}.ts`, `src/components/vocab/{TopicIntro,Flashcard,QuizCard,SessionSummary,VocabSession}.tsx`. Build and lint verified; UI not visually tested in-browser by Claude (user tests UI themselves).
- 2026-08-19: Completed Vocabulary Learning Phase 2 (localStorage persistence, second topic "food", topic picker at `/learn` + `/learn/[topicId]`) and FE Auth Integration (email/password + Google Sign-In wired to the Spring Boot API via `src/lib/api.ts`/`src/lib/auth/*`, register/login screens, centralized Vietnamese error mapping, `/auth/me` session hydration, 401 handling scoped to authenticated requests only). Also translated the entire site UI (landing page, vocab learning flow, page metadata) to Vietnamese for the app's Vietnamese-speaking English-learner audience — vocab `word`/`exampleSentence` kept in English (the term being taught), `definition` and topic labels translated. Register intentionally has no `goal` field on FE (backend to make it optional/defaulted separately). Build and lint verified; UI not visually tested in-browser by Claude (user tests UI themselves) — Google Sign-In in particular still needs a real `NEXT_PUBLIC_GOOGLE_CLIENT_ID` from the backend team to test end-to-end.
