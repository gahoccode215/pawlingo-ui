import Link from "next/link";
import { PART_OF_SPEECH_LABELS } from "@/lib/vocabulary/labels";
import type { WordSummaryResponse } from "@/types/vocabulary";
import DifficultyBadge from "./DifficultyBadge";

interface VocabularyCardProps {
  item: WordSummaryResponse;
  backHref: string;
}

export default function VocabularyCard({ item, backHref }: VocabularyCardProps) {
  return (
    <Link
      href={`/vocabularies/${item.id}?back=${encodeURIComponent(backHref)}`}
      className="h-full flex flex-col bg-surface rounded-3xl shadow-card border border-ink/5 p-6 hover:border-coral-300 hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
    >
      <div className="flex items-baseline gap-2 min-w-0">
        <h3 className="font-display font-bold text-xl truncate">{item.word}</h3>
        {item.phonetic && (
          <span className="text-xs text-ink/50 italic font-mono shrink-0">{item.phonetic}</span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-sand-100 text-charcoal uppercase tracking-wide">
          {PART_OF_SPEECH_LABELS[item.partOfSpeech]}
        </span>
        <DifficultyBadge difficultyLevel={item.difficultyLevel} />
      </div>

      <p className="mt-3 text-ink/70 line-clamp-2">{item.primaryMeaning}</p>
    </Link>
  );
}
