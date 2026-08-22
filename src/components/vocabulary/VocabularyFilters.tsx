import { DIFFICULTY_OPTIONS, TOPIC_FILTER_OPTIONS } from "@/lib/vocabulary/labels";
import type { VocabularyDifficulty, VocabularyTopic } from "@/types/vocabulary";

interface VocabularyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  topic: VocabularyTopic | "all";
  onTopicChange: (value: VocabularyTopic | "all") => void;
  difficulty: VocabularyDifficulty | "all";
  onDifficultyChange: (value: VocabularyDifficulty | "all") => void;
}

export default function VocabularyFilters({
  search,
  onSearchChange,
  topic,
  onTopicChange,
  difficulty,
  onDifficultyChange,
}: VocabularyFiltersProps) {
  return (
    <div className="space-y-4">
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
          placeholder="Tìm theo từ hoặc nghĩa..."
          aria-label="Tìm kiếm từ vựng"
          className="w-full bg-surface border border-ink/10 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-coral-400 transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-1" role="tablist" aria-label="Lọc theo chủ đề">
          {TOPIC_FILTER_OPTIONS.map((option) => {
            const isActive = topic === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTopicChange(option.value)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 ${
                  isActive
                    ? "bg-coral-500 text-white"
                    : "bg-surface border border-ink/10 text-ink/70 hover:border-coral-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <select
          value={difficulty}
          onChange={(event) =>
            onDifficultyChange(event.target.value as VocabularyDifficulty | "all")
          }
          aria-label="Lọc theo cấp độ"
          className="shrink-0 bg-surface border border-ink/10 rounded-full px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-coral-400 transition-colors"
        >
          {DIFFICULTY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
