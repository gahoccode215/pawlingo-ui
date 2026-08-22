import type { PartOfSpeech, VocabularyDifficulty, VocabularyTopic } from "@/types/vocabulary";

export const TOPIC_LABELS: Record<VocabularyTopic, string> = {
  work: "Công việc",
  education: "Học tập",
  travel: "Du lịch",
  food: "Ẩm thực",
  "daily-life": "Đời sống",
};

export const TOPIC_FILTER_OPTIONS: { value: VocabularyTopic | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "work", label: TOPIC_LABELS.work },
  { value: "education", label: TOPIC_LABELS.education },
  { value: "travel", label: TOPIC_LABELS.travel },
  { value: "food", label: TOPIC_LABELS.food },
  { value: "daily-life", label: TOPIC_LABELS["daily-life"] },
];

export const DIFFICULTY_OPTIONS: { value: VocabularyDifficulty | "all"; label: string }[] = [
  { value: "all", label: "Mọi cấp độ" },
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
];

// Fixed (non-theme-flipping) pastel + text-charcoal, same pairing as the
// landing page's badge/tile chips — keeps AA contrast in both themes and
// reads green (easy) -> yellow (medium) -> coral (hard) at a glance.
export const DIFFICULTY_BADGE_CLASSES: Record<VocabularyDifficulty, string> = {
  A1: "bg-teal-100 text-charcoal",
  A2: "bg-teal-100 text-charcoal",
  B1: "bg-honey-100 text-charcoal",
  B2: "bg-honey-100 text-charcoal",
  C1: "bg-coral-100 text-charcoal",
  C2: "bg-coral-100 text-charcoal",
};

export const PART_OF_SPEECH_LABELS: Record<PartOfSpeech, string> = {
  noun: "Danh từ",
  verb: "Động từ",
  adjective: "Tính từ",
  adverb: "Trạng từ",
  pronoun: "Đại từ",
  preposition: "Giới từ",
  conjunction: "Liên từ",
  interjection: "Thán từ",
};
