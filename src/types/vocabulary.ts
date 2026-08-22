export type VocabularyTopic = "work" | "education" | "travel" | "food" | "daily-life";

export type VocabularyDifficulty = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection";

export interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech: PartOfSpeech;
  ipa: string | null;
  definition: string | null;
  exampleSentence: string;
  difficulty: VocabularyDifficulty;
  topic: VocabularyTopic;
  pronunciationAudioUrl: string | null;
}

export interface VocabularyListResult {
  content: VocabularyItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface VocabularyListParams {
  page?: number;
  size?: number;
  topic?: VocabularyTopic;
  difficulty?: VocabularyDifficulty;
  search?: string;
}
