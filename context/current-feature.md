# Current Feature: Vocabulary Learning (Week 1 MVP)

## Status

In Progress

## Goals

- Topic intro screen: topic name, word count, "Start" button
- Flashcard component: word + image + example sentence (audio stubbed/hidden — no TTS yet)
- Mandatory 4-option multiple-choice quiz immediately after each flashcard (1 correct + 3 distractors), before moving on
- Per-word correct/wrong tracking (in-memory, or localStorage — see Open Questions in Notes)
- Leitner-style repetition with 3 boxes: correct → move up one box, wrong → reset to box 1; box-1 words reappear more often in the remaining queue (every ~3–4 cards); cap wrong repeats at ~5, then mark "review later" instead of looping forever
- Session summary screen: correct/wrong counts + list of words to review again
- No `any` types, no console errors, follows naming/file conventions in `context/coding-standards.md`

## Notes

- Spec: `context/features/volabulary-learning-spec.md` (filename has a typo — "volabulary" — kept as-is to match the actual file on disk)
- Local state only for this pass — no backend/DB (Spring Boot integration is post-validation-MVP per `project-overview.md`); no Pet XP wiring yet (separate future feature once both Pet System and this exist independently)
- Data shapes (keep field names mappable to `VocabWord`/`Progress` in `project-overview.md` for later backend integration):
  - `VocabWord { id, word, definition, imageUrl, exampleSentence, topic }`
  - `WordAttempt { wordId, correctCount, wrongCount, box }` (box: 1–3)
- File structure per `coding-standards.md`:
  - `src/components/vocab/Flashcard.tsx`, `QuizCard.tsx`, `SessionSummary.tsx`
  - `src/lib/vocab/leitner.ts` — pure repetition/box logic, no side effects
  - `src/types/vocab.ts` — `VocabWord`, `WordAttempt`
  - `src/data/vocab/[topic].ts` — hardcoded word list (no CMS/DB for MVP)
  - Client components (`'use client'`) throughout — fully interactive feature
- Out of scope for this pass: backend persistence, multiple topics/topic picker UI, true date-based SRS scheduling, pronunciation scoring, video content, typed/written answers, Pet XP integration
- Open questions resolved during implementation:
  1. Session progress is in-memory React state only (no localStorage) — resets on refresh, acceptable for this MVP pass, matches "local state only" framing in the spec overview
  2. Audio fully hidden — no audio UI at all in Flashcard for this pass
  3. Distractors are 3 random words from the same topic set (`getQuizOptions` in `src/lib/vocab/quiz.ts`), not curated per word
- Implemented: `src/types/vocab.ts`, `src/data/vocab/animals.ts` (12-word "Everyday Animals" topic, emoji used as `imageUrl` placeholder pending real image assets), `src/lib/vocab/leitner.ts` (pure `createSession`/`recordAnswer`; box 1 reappears after 3 cards, box 2 after 6, wrong answers always reset to box 1, capped at `MAX_WRONG_REPEATS = 5`), `src/lib/vocab/quiz.ts`, `src/components/vocab/{TopicIntro,Flashcard,QuizCard,SessionSummary,VocabSession}.tsx`, route at `src/app/learn/page.tsx` (matches the "Learn" tab in the bottom nav from `project-overview.md`'s UI/UX section)
- Build (`next build`) and lint (`eslint .`) both pass; UI not yet visually verified in-browser (user tests UI themselves)
- References: `context/project-overview.md`, `context/coding-standards.md`, `context/current-feature.md`

## History

- 2026-08-16: Created static landing page prototype at `docs/pawlingo-landing/index.html` per Week 1 waitlist roadmap — hero, problem/why, features, personas, and waitlist CTA sections, styled with Tailwind (CDN) per project-overview.md.
- 2026-08-16: Reworked header to logo-left/centered-nav/login-register-right layout with mobile menu, and rebuilt footer into a 4-column layout (brand+social, Product, Support, copyright bar) with dynamic year.
- 2026-08-16: Landing Page Implementation feature left "In Progress" (branch `feature/landing-page-implementation`) — app/ moved to src/app/, all sections rebuilt as React/Tailwind v4 components, build+lint verified — when Vocabulary Learning spec was loaded on top of it. Resume/complete that feature separately before this history entry is superseded further.
