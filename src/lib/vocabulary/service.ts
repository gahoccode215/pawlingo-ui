import type {
  ListMyVocabulariesParams,
  ListVocabulariesParams,
  PaginatedResponse,
  UserVocabularyResponse,
  WordDetailResponse,
  WordSummaryResponse,
} from "@/types/vocabulary";
import { USE_MOCK_VOCABULARY } from "./config";
import { mockVocabularyService } from "./mock/service";

export interface VocabularyService {
  listVocabularies(params?: ListVocabulariesParams): Promise<PaginatedResponse<WordSummaryResponse>>;
  getVocabularyDetail(id: string): Promise<WordDetailResponse>;
  addToMyVocabulary(wordId: string): Promise<UserVocabularyResponse>;
  removeFromMyVocabulary(wordId: string): Promise<void>;
  setFavorite(wordId: string, isFavorite: boolean): Promise<UserVocabularyResponse>;
  listMyVocabularies(params?: ListMyVocabulariesParams): Promise<PaginatedResponse<UserVocabularyResponse>>;
}

function realServiceUnavailable(): never {
  throw new Error(
    "Real vocabulary API integration isn't built yet — this mock phase only ships mockVocabularyService. " +
      "See context/features/vocab-fe-spec-01-mock.md and pawlingo-api's context/features/01-vocabulary-foundation.md " +
      "when implementing the real service.",
  );
}

const realVocabularyService: VocabularyService = {
  listVocabularies: realServiceUnavailable,
  getVocabularyDetail: realServiceUnavailable,
  addToMyVocabulary: realServiceUnavailable,
  removeFromMyVocabulary: realServiceUnavailable,
  setFavorite: realServiceUnavailable,
  listMyVocabularies: realServiceUnavailable,
};

// The only place components should import from — swapping USE_MOCK_VOCABULARY
// to false (once a real implementation replaces realVocabularyService above)
// is the single change needed to go live; no component should change.
export const vocabularyService: VocabularyService = USE_MOCK_VOCABULARY
  ? mockVocabularyService
  : realVocabularyService;
