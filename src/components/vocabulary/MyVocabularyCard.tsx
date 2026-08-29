import Link from "next/link";
import { PART_OF_SPEECH_LABELS, VOCABULARY_STATUS_LABELS } from "@/lib/vocabulary/labels";
import type { UserVocabularyResponse } from "@/types/vocabulary";
import DifficultyBadge from "./DifficultyBadge";

interface MyVocabularyCardProps {
  item: UserVocabularyResponse;
  isRemoving: boolean;
  onRemove: (wordId: string) => void;
}

export default function MyVocabularyCard({ item, isRemoving, onRemove }: MyVocabularyCardProps) {
  const word = item.word;

  return (
    <div className="flex items-start justify-between gap-4 bg-surface rounded-3xl shadow-card border border-ink/5 p-6">
      <Link href={`/vocabularies/${item.wordId}?back=${encodeURIComponent("/me/vocabularies")}`} className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 min-w-0">
          <h3 className="font-display font-bold text-xl truncate">{word?.word ?? item.wordId}</h3>
          {word?.phonetic && <span className="text-xs text-ink/50 italic font-mono shrink-0">{word.phonetic}</span>}
          {item.isFavorite && (
            <span aria-label="Yêu thích" role="img" className="shrink-0">
              ❤️
            </span>
          )}
        </div>

        {word && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-sand-100 text-charcoal uppercase tracking-wide">
              {PART_OF_SPEECH_LABELS[word.partOfSpeech]}
            </span>
            <DifficultyBadge difficultyLevel={word.difficultyLevel} />
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-teal-100 text-charcoal uppercase tracking-wide">
              {VOCABULARY_STATUS_LABELS[item.status]}
            </span>
          </div>
        )}

        {word?.primaryMeaning && <p className="mt-3 text-ink/70 line-clamp-2">{word.primaryMeaning}</p>}
      </Link>

      <button
        type="button"
        onClick={() => onRemove(item.wordId)}
        disabled={isRemoving}
        className="shrink-0 bg-surface border border-ink/10 hover:border-coral-300 font-display font-semibold text-sm px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
      >
        Xóa
      </button>
    </div>
  );
}
