import type {
  ListMyVocabulariesParams,
  ListVocabulariesParams,
  PaginatedResponse,
  UserVocabularyResponse,
  VocabularyServiceError,
  VocabularyStatus,
  WordDetailResponse,
  WordSummaryResponse,
} from "@/types/vocabulary";
import { getMockWords } from "./data";

const MOCK_USER_ID = "mock-user-1";
const MIN_DELAY_MS = 300;
const MAX_DELAY_MS = 600;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

interface UserVocabularyRecord {
  id: string;
  userId: string;
  wordId: string;
  isFavorite: boolean;
  status: VocabularyStatus;
  createdAt: string;
}

// Reset whenever the module is re-evaluated (i.e. on a full page reload) —
// acceptable for this mock phase, documented in mock/README.md.
let userVocabularies: UserVocabularyRecord[] = [];
let nextRecordSeq = 1;

function delay(): Promise<void> {
  const ms = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rejectWith(status: number, code: string, message: string): never {
  const error: VocabularyServiceError = { status, code, message };
  throw error;
}

/**
 * Lets any screen exercise error states on demand by appending
 * `?__mockError=<code>` to the URL — see mock/README.md. Codes:
 * `validation` | `not-found` | `network` | `server`.
 */
function throwForcedErrorIfRequested(): void {
  if (typeof window === "undefined") return;
  const forced = new URLSearchParams(window.location.search).get("__mockError");
  switch (forced) {
    case "validation":
      rejectWith(400, "VALIDATION_ERROR", "Yêu cầu không hợp lệ (mock).");
    case "not-found":
      rejectWith(404, "WORD_NOT_FOUND", "Không tìm thấy (mock).");
    case "network":
      rejectWith(0, "NETWORK_ERROR", "Lỗi mạng (mock).");
    case "server":
      rejectWith(500, "INTERNAL_ERROR", "Lỗi máy chủ (mock).");
    default:
      return;
  }
}

function toSummary(word: WordDetailResponse): WordSummaryResponse {
  const { id, word: text, phonetic, difficultyLevel, partOfSpeech, topic, primaryMeaning } = word;
  return { id, word: text, phonetic, difficultyLevel, partOfSpeech, topic, primaryMeaning };
}

function createRecordId(): string {
  return `uservocab-${nextRecordSeq++}`;
}

function findWord(wordId: string): WordDetailResponse | undefined {
  return getMockWords().find((word) => word.id === wordId);
}

function findRecord(wordId: string): UserVocabularyRecord | undefined {
  return userVocabularies.find((record) => record.userId === MOCK_USER_ID && record.wordId === wordId);
}

const DIFFICULTY_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];

function compareBySort(a: WordDetailResponse, b: WordDetailResponse, sort: string): number {
  const [field, direction = "asc"] = sort.split(",");
  const dir = direction === "desc" ? -1 : 1;

  if (field === "difficultyLevel") {
    const rankA = a.difficultyLevel ? DIFFICULTY_ORDER.indexOf(a.difficultyLevel) : -1;
    const rankB = b.difficultyLevel ? DIFFICULTY_ORDER.indexOf(b.difficultyLevel) : -1;
    return (rankA - rankB) * dir;
  }
  if (field === "createdAt") {
    // Mock words have no createdAt — seed order stands in for insertion order.
    return (a.id < b.id ? -1 : a.id > b.id ? 1 : 0) * dir;
  }
  return a.word.localeCompare(b.word) * dir;
}

function paginate<T>(items: T[], page: number, size: number): PaginatedResponse<T> {
  const clampedSize = Math.min(size, MAX_PAGE_SIZE);
  const start = page * clampedSize;
  const data = items.slice(start, start + clampedSize);
  return {
    data,
    meta: {
      page,
      size: clampedSize,
      totalElements: items.length,
      totalPages: Math.ceil(items.length / clampedSize),
    },
  };
}

async function listVocabularies(
  params: ListVocabulariesParams = {},
): Promise<PaginatedResponse<WordSummaryResponse>> {
  await delay();
  throwForcedErrorIfRequested();

  const { q, difficultyLevel, partOfSpeech, topic, page = 0, size = DEFAULT_PAGE_SIZE, sort = "word,asc" } =
    params;

  if (q !== undefined && q.length > 0 && q.length < 2) {
    rejectWith(400, "VALIDATION_ERROR", "Từ khóa tìm kiếm phải có ít nhất 2 ký tự.");
  }

  let words = getMockWords();
  if (q && q.length >= 2) {
    const prefix = q.toLowerCase();
    words = words.filter((word) => word.word.toLowerCase().startsWith(prefix));
  }
  if (difficultyLevel) {
    words = words.filter((word) => word.difficultyLevel === difficultyLevel);
  }
  if (partOfSpeech) {
    words = words.filter((word) => word.partOfSpeech === partOfSpeech);
  }
  if (topic) {
    words = words.filter((word) => word.topic === topic);
  }

  const sorted = [...words].sort((a, b) => compareBySort(a, b, sort));
  const summaries = sorted.map(toSummary);

  return paginate(summaries, page, size);
}

async function getVocabularyDetail(id: string): Promise<WordDetailResponse> {
  await delay();
  throwForcedErrorIfRequested();

  const word = findWord(id);
  if (!word) rejectWith(404, "WORD_NOT_FOUND", "Không tìm thấy từ vựng này.");
  return word;
}

async function addToMyVocabulary(wordId: string): Promise<UserVocabularyResponse> {
  await delay();
  throwForcedErrorIfRequested();

  if (!findWord(wordId)) rejectWith(404, "WORD_NOT_FOUND", "Không tìm thấy từ vựng này.");

  const existing = findRecord(wordId);
  if (existing) return { ...existing };

  const record: UserVocabularyRecord = {
    id: createRecordId(),
    userId: MOCK_USER_ID,
    wordId,
    isFavorite: false,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  userVocabularies.push(record);
  return { ...record };
}

async function removeFromMyVocabulary(wordId: string): Promise<void> {
  await delay();
  throwForcedErrorIfRequested();

  const existing = findRecord(wordId);
  if (!existing) rejectWith(404, "VOCABULARY_NOT_FOUND", "Từ này chưa có trong danh sách của bạn.");

  userVocabularies = userVocabularies.filter((record) => record.id !== existing.id);
}

async function setFavorite(wordId: string, isFavorite: boolean): Promise<UserVocabularyResponse> {
  await delay();
  throwForcedErrorIfRequested();

  if (!findWord(wordId)) rejectWith(404, "WORD_NOT_FOUND", "Không tìm thấy từ vựng này.");

  const existing = findRecord(wordId);
  if (existing) {
    existing.isFavorite = isFavorite;
    return { ...existing };
  }

  const record: UserVocabularyRecord = {
    id: createRecordId(),
    userId: MOCK_USER_ID,
    wordId,
    isFavorite,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  userVocabularies.push(record);
  return { ...record };
}

async function listMyVocabularies(
  params: ListMyVocabulariesParams = {},
): Promise<PaginatedResponse<UserVocabularyResponse>> {
  await delay();
  throwForcedErrorIfRequested();

  const { isFavorite, status, page = 0, size = DEFAULT_PAGE_SIZE } = params;

  let records = userVocabularies.filter((record) => record.userId === MOCK_USER_ID);
  if (isFavorite !== undefined) records = records.filter((record) => record.isFavorite === isFavorite);
  if (status) records = records.filter((record) => record.status === status);

  const sorted = [...records].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const withWord: UserVocabularyResponse[] = sorted.map((record) => {
    const word = findWord(record.wordId);
    return { ...record, word: word ? toSummary(word) : undefined };
  });

  return paginate(withWord, page, size);
}

export const mockVocabularyService = {
  listVocabularies,
  getVocabularyDetail,
  addToMyVocabulary,
  removeFromMyVocabulary,
  setFavorite,
  listMyVocabularies,
};
