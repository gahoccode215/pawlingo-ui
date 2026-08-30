# Vocabulary — Learn Session

Scoped slice of `docs/PAWLINGO_VOCABULARY_PLAN.md` §9 ("Learn Session") and §39
("Learn Screen"), sized to what's actually buildable today: mock-first,
against the current flat `Word`/`UserVocabularyResponse` model, with no
curriculum/unit/lesson, no SRS, no AI. Everything else in the plan doc is
explicitly deferred — see "Out of scope" below.

## Why this slice, not a bigger one

Per the earlier discussion on the combined Library+Session model: nothing in
the app today moves a saved word from `NEW` to `LEARNING`. Library
(`/vocabularies`, `/me/vocabularies`) already covers browse/save/favorite
well. This spec closes the one concrete gap — introducing new words through a
short guided session — without waiting on backend decisions (SRS algorithm,
curriculum model, content licensing) that belong to `pawlingo-api` and aren't
made yet.

Review sessions (spaced-repetition of already-`LEARNING` words) are a natural
follow-up spec once this ships, not part of this one — see plan doc §14.

## Current data available (confirmed from `src/types/vocabulary.ts`)

Already real, no fabrication needed:

- `Word` fields: `word`, `phonetic`, `difficultyLevel` (A1–C2), `partOfSpeech`,
  `primaryMeaning`, `topic` (mock-only).
- `WordDetailResponse` adds `audioUrl` (nullable) and `examples[]`
  (`sentence`, `translation`, `orderIndex`).
- `UserVocabularyResponse.status`: `NEW | LEARNING | MASTERED`.

Not available, and not needed for this slice:

- Senses, collocations, word family, synonyms/antonyms.
- Any exercise/quiz backend model or pre-built distractors.
- Curriculum (Course/Level/Unit/Lesson).

## New service method required

`VocabularyService` (`src/lib/vocabulary/service.ts`) has no way to move a
saved word out of `NEW`. Add one method, mirroring the existing `setFavorite`
shape:

```ts
setStatus(wordId: string, status: VocabularyStatus): Promise<UserVocabularyResponse>;
```

Implement in `mockVocabularyService` (`src/lib/vocabulary/mock/service.ts`)
the same way `setFavorite` already works. `realVocabularyService` keeps
throwing via `realServiceUnavailable()` like every other method today — no
real backend call exists yet, this isn't a gap specific to this feature.

## Entry points

Following the app's actual route convention (`/vocabularies`, plural — not
the plan doc's suggested singular `/vocabulary/*`):

- New route: `/vocabularies/learn?topic=<topic>&difficultyLevel=<level>`
- From `/home`: the topic chips already added in the Dashboard step (`Từ vựng`
  section) get a secondary "Học từ mới" action per topic, alongside the
  existing browse link.
- From `/vocabularies`: a "Học 6 từ mới theo bộ lọc này" action appears when
  the current filter combination has enough un-saved words.

Primary nav labels, existing routes, and existing filter UI are unchanged —
this is purely an additive route.

## Session composition

- Session size: 6 words (matches plan doc §5.3's "Lesson" size of 5–8).
- Pool: `listVocabularies({ topic, difficultyLevel, size: 6 })` filtered to
  words with no existing `UserVocabularyResponse` record (not already saved).
  If fewer than 6 unsaved words match, use what's available (minimum 3 — below
  that, show the empty state instead of starting a session).
- Distractors (for Recognition/Context multiple choice): 3 other words drawn
  from the same `listVocabularies` result set — same topic and/or difficulty,
  so wrong answers are plausible rather than random. This is real data,
  algorithmically selected, not generated content.

## Screen flow (per word)

Matches plan doc §9, trimmed to 3 stages (Presentation, Recognition, Context)
— Recall (typing the English word) and Production are deferred; typed-answer
validation (accents, casing, partial credit) is its own design problem not
worth solving in the first slice, and the plan doc itself says not every word
needs every stage on first exposure.

1. **Presentation** — word, phonetic, 🔊 audio (if `audioUrl` present, button
   hidden otherwise — not a broken/disabled button), `primaryMeaning`, first
   example sentence + translation. One "Tiếp theo" action.
2. **Recognition** — `primaryMeaning` as the correct answer among 4 options
   (3 distractors' `primaryMeaning`). Tests recognition only.
3. **Context** — the word's own example sentence with the word blanked out,
   4-option choice among the word + 3 distractors (same part-of-speech
   preferred, else same topic). Tests recognition-in-context.

Feedback after each answer (plan doc §15, trimmed — no audio-replay/explain
actions in this slice, no backend to generate explanations from):

- Correct: `✓ Chính xác` + the word + its example, brief, auto-advances or a
  single "Tiếp tục" tap.
- Incorrect: `✕ Chưa đúng` + the correct answer + its example. Never just a
  color change — icon and text both communicate the result (accessibility
  requirement, plan doc §41).

## Session summary

End screen, matching plan doc §39's tone ("Không tuyên bố Mastered sau một
lesson"):

```
Hoàn thành buổi học

6 từ mới

4 câu trả lời đúng ngay lần đầu
2 câu cần luyện thêm

[Về trang chủ]   [Học thêm]
```

All 6 words get `setStatus(wordId, "LEARNING")` regardless of per-question
performance within the session — a session never assigns `MASTERED`. This
matches the plan doc's explicit rule and avoids fabricating a "mastery" signal
from a single pass.

## Empty / error states

- Fewer than 3 unsaved words match the filter: don't start a session — show
  "Không đủ từ mới cho bộ lọc này." with a link back to browse/adjust filters.
- Word list fetch fails: reuse the existing error-state convention (emoji +
  message + "Thử lại"), same as `VocabularyBrowser`/`VocabularyDetail` today.
- Leaving mid-session (navigation away): session state is local React state,
  not persisted — leaving early loses progress, no partial `setStatus` calls
  happen. Acceptable for this slice; session persistence/resume is future
  scope, not silently half-implemented here.

## Accessibility

Per plan doc §41 and the project's existing pattern (already used throughout
`vocabulary/*` components):

- Every interactive element keyboard-reachable, visible
  `focus-visible:outline-coral-500` ring (existing convention, reuse it).
- Correct/incorrect communicated via icon + text, never color alone.
- Audio has a text equivalent already (phonetic + meaning are always shown,
  audio is supplementary, not the only way to get the answer).
- Touch targets match existing button sizing (`px-5 py-2.5` pill, already
  established sitewide).

## Design direction

This is a focused exercise screen, not a marketing page — same category as
the Dashboard and Vocabulary browse pages already built. The
`design-taste-frontend` skill's Section 13 explicitly excludes dense product
UI from its landing-page audit/redesign workflow (Section 11's 4-step
process), so that formal workflow does not apply here, same conclusion as for
`/home` and `/vocabularies` earlier in this project.

What does apply — the skill's underlying anti-slop principles, which also
happen to be exactly what the plan doc's own §38/§54 ask for:

- One exercise on screen at a time. No sidebar, no dashboard stat tiles, no
  unrelated nav noise next to the question.
- Reuse existing tokens only: coral accent, `rounded-3xl`/`rounded-full`
  surfaces, `buttonVariants({ variant: "pop" })` for the primary action,
  existing focus-ring convention. No new colors, radii, or shadows.
- No decorative motion. A progress transition (answer → feedback → next) is
  fine; a looping/floating animation is not.
- Progress indicator (`3 / 6`) stays minimal — text, not a chart or gauge.

## Out of scope for this spec

Deferred to later specs, per the plan doc's own phased roadmap (§50):

- Review sessions / SRS scheduling (plan doc §13–14, Phase 5).
- Curriculum (Course/Level/Unit/Lesson) — words are selected by topic +
  difficulty filter, not a fixed lesson sequence (Phase 3).
- Recall (typing) and Production exercise stages.
- Listening exercises, collocation/word-family exercises (P1 in plan doc §10).
- AI explanation/evaluation, pronunciation scoring (P2).
- Adaptive difficulty selection (plan doc §11) — this slice always runs the
  same 3-stage sequence for every word.
- Real backend integration — stays mock-first like the rest of the app until
  `pawlingo-api`'s vocab rebuild ships.

## Open questions before implementation

- Session size (6) and minimum pool size (3) are proposed defaults, not
  confirmed — adjust if they feel too short/long once tried.
- Whether "Học thêm" on the summary screen immediately starts another session
  with the same filter, or returns to the topic picker.
