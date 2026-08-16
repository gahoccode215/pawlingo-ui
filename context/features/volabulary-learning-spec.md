# Vocabulary Learning Feature Spec (Week 1 MVP)

## Overview
This is the second core feature for PawLingo's Week 1 Validation MVP (after the landing page). Build a flashcard-based vocabulary lesson with a mandatory quiz step and simplified spaced repetition (Leitner-style), using **local state only** — no backend/DB yet. This will later connect to the Pet System (correct answers → pet XP), but that wiring is a separate future feature, not part of this spec.

## Why This Approach
- Spaced repetition (even simplified) meaningfully improves vocabulary retention vs. no repetition
- Active recall (quiz) beats passive review (just flipping a card)
- Images + example sentences (context) improve encoding vs. text-only definitions
- Full SRS algorithms (Anki-style SM-2) are overkill for MVP — a simple Leitner box gives most of the benefit with far less complexity

## Requirements for this phase
- Topic intro screen: topic name, word count, "Start" button
- Flashcard: word + image + example sentence (audio can be stubbed/hidden if no TTS yet)
- Quiz immediately after each flashcard: 4-option multiple choice (1 correct + 3 distractors), mandatory before moving on
- Correct/wrong tracking per word, in-memory (or localStorage — TBD, see Open Questions)
- Leitner-style repetition: 3 boxes (1 = new/wrong, 2 = correct once, 3 = learned this session)
  - Correct → move up one box; Wrong → reset to box 1
  - Box 1 words re-appear more frequently in the remaining queue (e.g. every 3–4 cards)
  - Cap wrong repeats at ~5 to avoid infinite loop; mark as "review later" if exceeded
- Session summary screen: correct/wrong count, list of words to review again

## Out of scope (do not implement yet)
- Backend persistence (Spring Boot integration comes post-validation MVP)
- Multiple topics / topic picker UI
- True date-based SRS scheduling
- Pronunciation scoring (Phase 2)
- Video-based content
- Typed/written answers (multiple choice only for now)
- Pet XP integration (build after both Pet System and this feature exist independently)

## Data Shape
```ts
interface VocabWord {
  id: string;
  word: string;
  definition: string;
  imageUrl: string;
  exampleSentence: string;
  topic: string;
}

interface WordAttempt {
  wordId: string;
  correctCount: number;
  wrongCount: number;
  box: number; // Leitner box level, 1-3
}
```
Keep field names consistent with the `VocabWord` / `Progress` shapes in `project-overview.md` — the real backend (Spring Boot) will eventually own this data, so naming should stay easy to map later.

## File Structure (per coding-standards.md)
- `src/components/vocab/Flashcard.tsx`
- `src/components/vocab/QuizCard.tsx`
- `src/components/vocab/SessionSummary.tsx`
- `src/lib/vocab/leitner.ts` — pure repetition/box logic, no side effects
- `src/types/vocab.ts` — `VocabWord`, `WordAttempt`
- `src/data/vocab/[topic].ts` — hardcoded word list for MVP (no CMS/DB)
- Client components (`'use client'`) throughout — this feature is fully interactive

## Open Questions
- [ ] Should session progress persist across page reload (localStorage), or is losing it on refresh acceptable for MVP?
- [ ] Audio/pronunciation in Week 1, or fully stubbed until Phase 2?
- [ ] Distractor generation — random words from the same topic, or curated wrong answers per word?

## Definition of Done
- [ ] User can start a session for the one available topic
- [ ] Flashcard → mandatory quiz flow works end to end
- [ ] Wrong-answer words reliably reappear more often within the session
- [ ] Session summary shows accurate correct/wrong counts
- [ ] No `any` types, no console errors, follows naming/file conventions

## References
- @context/project-overview.md
- @context/coding-standards.md
- @context/current-feature.md