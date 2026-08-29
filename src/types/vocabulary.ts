export type DifficultyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type PartOfSpeech =
  | "NOUN"
  | "VERB"
  | "ADJECTIVE"
  | "ADVERB"
  | "PRONOUN"
  | "PREPOSITION"
  | "CONJUNCTION"
  | "INTERJECTION"
  | "OTHER";

export type VocabularyStatus = "NEW" | "LEARNING" | "MASTERED";

/**
 * Mock-only extension, NOT part of the real BE Spec 01 contract — `Word` has
 * no topic field on the actual backend (pawlingo-api dropped topics when it
 * rebuilt the vocab model). Added 2026-08-29 per explicit product decision to
 * ship the dashboard's topic grid ahead of a backend change; pawlingo-api
 * needs to add this field before real-API integration can support it.
 */
export type VocabularyTopic = "EDUCATION" | "TRAVEL" | "HOLIDAY" | "WORK" | "DAILY_LIFE" | "FOOD";

export interface WordExampleResponse {
  id: string;
  sentence: string;
  translation: string | null;
  source: string | null;
  orderIndex: number;
}

export interface WordSummaryResponse {
  id: string;
  word: string;
  phonetic: string | null;
  difficultyLevel: DifficultyLevel | null;
  partOfSpeech: PartOfSpeech;
  primaryMeaning: string;
  /** Mock-only — see VocabularyTopic. */
  topic: VocabularyTopic;
}

export interface WordDetailResponse extends WordSummaryResponse {
  audioUrl: string | null;
  examples: WordExampleResponse[];
}

export interface UserVocabularyResponse {
  id: string;
  wordId: string;
  isFavorite: boolean;
  status: VocabularyStatus;
  createdAt: string;
  /** Only present when returned nested from `listMyVocabularies`. */
  word?: WordSummaryResponse;
}

export interface PageMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PageMeta;
}

export interface ListVocabulariesParams {
  q?: string;
  difficultyLevel?: DifficultyLevel;
  partOfSpeech?: PartOfSpeech;
  /** Mock-only — see VocabularyTopic. */
  topic?: VocabularyTopic;
  page?: number;
  size?: number;
  sort?: string;
}

export interface ListMyVocabulariesParams {
  isFavorite?: boolean;
  status?: VocabularyStatus;
  page?: number;
  size?: number;
}

export type VocabularyErrorCode =
  | "VALIDATION_ERROR"
  | "WORD_NOT_FOUND"
  | "VOCABULARY_NOT_FOUND"
  | "UNAUTHORIZED"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR";

/** Matches the real API's error envelope shape, so component error handling
 * doesn't change when the service layer swaps from mock to real. */
export interface VocabularyServiceError {
  status: number;
  code: VocabularyErrorCode | (string & {});
  message: string;
}
