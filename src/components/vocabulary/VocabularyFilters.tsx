import {
  DIFFICULTY_FILTER_OPTIONS,
  PART_OF_SPEECH_FILTER_OPTIONS,
  TOPIC_FILTER_OPTIONS,
} from "@/lib/vocabulary/labels";
import type { DifficultyLevel, PartOfSpeech, VocabularyTopic } from "@/types/vocabulary";

interface VocabularyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  difficultyLevel: DifficultyLevel | "all";
  onDifficultyLevelChange: (value: DifficultyLevel | "all") => void;
  partOfSpeech: PartOfSpeech | "all";
  onPartOfSpeechChange: (value: PartOfSpeech | "all") => void;
  topic: VocabularyTopic | "all";
  onTopicChange: (value: VocabularyTopic | "all") => void;
}

export default function VocabularyFilters({
  search,
  onSearchChange,
  difficultyLevel,
  onDifficultyLevelChange,
  partOfSpeech,
  onPartOfSpeechChange,
  topic,
  onTopicChange,
}: VocabularyFiltersProps) {
  const showMinLengthHint = search.trim().length === 1;

  return (
    <div className="space-y-2">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tìm theo từ vựng..."
          aria-label="Tìm kiếm từ vựng"
          className="w-full bg-surface border border-ink/10 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-coral-400 transition-colors"
        />
      </div>
      {showMinLengthHint && <p className="text-xs text-ink/50 pl-4">Nhập tối thiểu 2 ký tự.</p>}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <select
          value={difficultyLevel}
          onChange={(event) => onDifficultyLevelChange(event.target.value as DifficultyLevel | "all")}
          aria-label="Lọc theo cấp độ"
          className="shrink-0 bg-surface border border-ink/10 rounded-full px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-coral-400 transition-colors"
        >
          {DIFFICULTY_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={partOfSpeech}
          onChange={(event) => onPartOfSpeechChange(event.target.value as PartOfSpeech | "all")}
          aria-label="Lọc theo loại từ"
          className="shrink-0 bg-surface border border-ink/10 rounded-full px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-coral-400 transition-colors"
        >
          {PART_OF_SPEECH_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={topic}
          onChange={(event) => onTopicChange(event.target.value as VocabularyTopic | "all")}
          aria-label="Lọc theo chủ đề"
          className="shrink-0 bg-surface border border-ink/10 rounded-full px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-coral-400 transition-colors"
        >
          {TOPIC_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
