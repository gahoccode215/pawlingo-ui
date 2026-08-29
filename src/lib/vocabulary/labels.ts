import type { DifficultyLevel, PartOfSpeech, VocabularyStatus, VocabularyTopic } from "@/types/vocabulary";

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  C2: "C2",
};

export const UNKNOWN_DIFFICULTY_LABEL = "Chưa xác định";

export function getDifficultyLabel(level: DifficultyLevel | null): string {
  return level ? DIFFICULTY_LABELS[level] : UNKNOWN_DIFFICULTY_LABEL;
}

export const DIFFICULTY_FILTER_OPTIONS: { value: DifficultyLevel | "all"; label: string }[] = [
  { value: "all", label: "Mọi cấp độ" },
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
];

// Fixed (non-theme-flipping) pastel + text-charcoal, same pairing used across
// the app's other badges — green (easy) -> yellow (medium) -> coral (hard).
export const DIFFICULTY_BADGE_CLASSES: Record<DifficultyLevel, string> = {
  A1: "bg-teal-100 text-charcoal",
  A2: "bg-teal-100 text-charcoal",
  B1: "bg-honey-100 text-charcoal",
  B2: "bg-honey-100 text-charcoal",
  C1: "bg-coral-100 text-charcoal",
  C2: "bg-coral-100 text-charcoal",
};

export const UNKNOWN_DIFFICULTY_BADGE_CLASSES = "bg-sand-100 text-charcoal";

export const PART_OF_SPEECH_LABELS: Record<PartOfSpeech, string> = {
  NOUN: "Danh từ",
  VERB: "Động từ",
  ADJECTIVE: "Tính từ",
  ADVERB: "Trạng từ",
  PRONOUN: "Đại từ",
  PREPOSITION: "Giới từ",
  CONJUNCTION: "Liên từ",
  INTERJECTION: "Thán từ",
  OTHER: "Khác",
};

export const PART_OF_SPEECH_FILTER_OPTIONS: { value: PartOfSpeech | "all"; label: string }[] = [
  { value: "all", label: "Mọi loại từ" },
  { value: "NOUN", label: PART_OF_SPEECH_LABELS.NOUN },
  { value: "VERB", label: PART_OF_SPEECH_LABELS.VERB },
  { value: "ADJECTIVE", label: PART_OF_SPEECH_LABELS.ADJECTIVE },
  { value: "ADVERB", label: PART_OF_SPEECH_LABELS.ADVERB },
  { value: "PRONOUN", label: PART_OF_SPEECH_LABELS.PRONOUN },
  { value: "PREPOSITION", label: PART_OF_SPEECH_LABELS.PREPOSITION },
  { value: "CONJUNCTION", label: PART_OF_SPEECH_LABELS.CONJUNCTION },
  { value: "INTERJECTION", label: PART_OF_SPEECH_LABELS.INTERJECTION },
  { value: "OTHER", label: PART_OF_SPEECH_LABELS.OTHER },
];

export const VOCABULARY_STATUS_LABELS: Record<VocabularyStatus, string> = {
  NEW: "Mới",
  LEARNING: "Đang học",
  MASTERED: "Đã thành thạo",
};

export const VOCABULARY_STATUS_FILTER_OPTIONS: { value: VocabularyStatus | "all"; label: string }[] =
  [
    { value: "all", label: "Mọi trạng thái" },
    { value: "NEW", label: VOCABULARY_STATUS_LABELS.NEW },
    { value: "LEARNING", label: VOCABULARY_STATUS_LABELS.LEARNING },
    { value: "MASTERED", label: VOCABULARY_STATUS_LABELS.MASTERED },
  ];

// Mock-only taxonomy — see VocabularyTopic in src/types/vocabulary.ts.
export const TOPIC_LABELS: Record<VocabularyTopic, string> = {
  EDUCATION: "Học tập",
  TRAVEL: "Du lịch",
  HOLIDAY: "Lễ hội",
  WORK: "Công việc",
  DAILY_LIFE: "Đời sống",
  FOOD: "Ẩm thực",
};

export const TOPIC_ICONS: Record<VocabularyTopic, string> = {
  EDUCATION: "📚",
  TRAVEL: "✈️",
  HOLIDAY: "🎉",
  WORK: "💼",
  DAILY_LIFE: "🏠",
  FOOD: "🍜",
};

export const TOPIC_LIST: VocabularyTopic[] = ["EDUCATION", "TRAVEL", "HOLIDAY", "WORK", "DAILY_LIFE", "FOOD"];

export const TOPIC_FILTER_OPTIONS: { value: VocabularyTopic | "all"; label: string }[] = [
  { value: "all", label: "Mọi chủ đề" },
  ...TOPIC_LIST.map((topic) => ({ value: topic, label: TOPIC_LABELS[topic] })),
];
