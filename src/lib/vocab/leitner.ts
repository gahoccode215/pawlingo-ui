import type { VocabWord, WordAttempt } from "@/types/vocab";

export const MASTERED_BOX = 3;
export const MAX_WRONG_REPEATS = 5;

const BOX_1_SPACING = 3;
const BOX_2_SPACING = 6;

export interface VocabSessionState {
  queue: string[];
  attempts: Record<string, WordAttempt>;
}

export function createSession(words: VocabWord[]): VocabSessionState {
  const attempts: Record<string, WordAttempt> = {};
  words.forEach((word) => {
    attempts[word.id] = {
      wordId: word.id,
      correctCount: 0,
      wrongCount: 0,
      box: 1,
    };
  });

  return {
    queue: words.map((word) => word.id),
    attempts,
  };
}

export function recordAnswer(
  state: VocabSessionState,
  wordId: string,
  isCorrect: boolean
): VocabSessionState {
  const previous = state.attempts[wordId];
  const attempt: WordAttempt = isCorrect
    ? {
        ...previous,
        correctCount: previous.correctCount + 1,
        box: Math.min(previous.box + 1, MASTERED_BOX),
      }
    : {
        ...previous,
        wrongCount: previous.wrongCount + 1,
        box: 1,
      };

  const attempts = { ...state.attempts, [wordId]: attempt };
  const queue = state.queue.slice(1);

  const mastered = attempt.box >= MASTERED_BOX;
  const gaveUp = attempt.wrongCount >= MAX_WRONG_REPEATS;

  // Box 1 (new/wrong) reappears sooner than box 2 (correct once) so words
  // that need more practice are seen more often within the same session.
  if (!mastered && !gaveUp) {
    const spacing = attempt.box === 1 ? BOX_1_SPACING : BOX_2_SPACING;
    const insertAt = Math.min(spacing, queue.length);
    queue.splice(insertAt, 0, wordId);
  }

  return { queue, attempts };
}

export function isSessionComplete(state: VocabSessionState): boolean {
  return state.queue.length === 0;
}
