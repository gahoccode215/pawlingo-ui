import type { DifficultyLevel, VocabularyTopic, WordSummaryResponse } from "@/types/vocabulary";
import { vocabularyService } from "./service";

export const SESSION_TARGET_SIZE = 6;
export const SESSION_MIN_SIZE = 3;
export const DISTRACTOR_COUNT = 3;

// Fetch a wider pool than the session needs so there's enough material left
// over for distractors once the session words are picked out of it.
const POOL_FETCH_SIZE = 20;

// The real API has no "check a single word's saved status" endpoint — the
// only way to know is to page through the user's saved list and look for a
// match. Same constraint and value as VocabularyDetail.tsx's SAVED_LOOKUP_SIZE.
const SAVED_LOOKUP_SIZE = 100;

export interface SessionWord {
  word: WordSummaryResponse;
  distractors: WordSummaryResponse[];
}

export interface LearnSessionFilters {
  topic?: VocabularyTopic;
  difficultyLevel?: DifficultyLevel;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function selectUnsavedWords(
  candidates: WordSummaryResponse[],
  savedWordIds: ReadonlySet<string>,
  targetSize: number = SESSION_TARGET_SIZE,
): WordSummaryResponse[] {
  return candidates.filter((word) => !savedWordIds.has(word.id)).slice(0, targetSize);
}

export function pickDistractors(
  word: WordSummaryResponse,
  pool: WordSummaryResponse[],
  options: { preferSamePartOfSpeech?: boolean; count?: number } = {},
): WordSummaryResponse[] {
  const { preferSamePartOfSpeech = false, count = DISTRACTOR_COUNT } = options;
  const others = pool.filter((candidate) => candidate.id !== word.id);
  const preferred = preferSamePartOfSpeech
    ? others.filter((candidate) => candidate.partOfSpeech === word.partOfSpeech)
    : others;
  // Fall back to the full pool if the preferred slice can't fill the quota —
  // a partially-relevant distractor beats not having one at all.
  const source = preferred.length >= count ? preferred : others;
  return shuffle(source).slice(0, count);
}

export function buildSessionWords(words: WordSummaryResponse[], distractorPool: WordSummaryResponse[]): SessionWord[] {
  return words.map((word) => ({
    word,
    distractors: pickDistractors(word, distractorPool),
  }));
}

/**
 * Fetches a topic/difficulty-filtered pool, excludes words already saved by
 * the user, and returns a ready-to-run session. Returns `null` when fewer
 * than SESSION_MIN_SIZE unsaved words match — the caller should show the
 * "not enough new words" empty state instead of starting a session.
 */
export async function buildLearnSession(filters: LearnSessionFilters): Promise<SessionWord[] | null> {
  const [pool, saved] = await Promise.all([
    vocabularyService.listVocabularies({ ...filters, size: POOL_FETCH_SIZE }),
    vocabularyService.listMyVocabularies({ size: SAVED_LOOKUP_SIZE }),
  ]);

  const savedWordIds = new Set(saved.data.map((record) => record.wordId));
  const sessionWords = selectUnsavedWords(pool.data, savedWordIds);

  if (sessionWords.length < SESSION_MIN_SIZE) return null;

  return buildSessionWords(sessionWords, pool.data);
}
