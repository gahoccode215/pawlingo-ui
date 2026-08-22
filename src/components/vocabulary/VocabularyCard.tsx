import Link from "next/link";
import DifficultyBadge from "./DifficultyBadge";
import { PART_OF_SPEECH_LABELS } from "@/lib/vocabulary/labels";
import type { VocabularyItem } from "@/types/vocabulary";

interface VocabularyCardProps {
  item: VocabularyItem;
  backHref: string;
}

export default function VocabularyCard({ item, backHref }: VocabularyCardProps) {
  return (
    <Link
      href={`/vocabulary/${item.id}?back=${encodeURIComponent(backHref)}`}
      className="h-full flex flex-col bg-surface rounded-3xl shadow-card border border-ink/5 p-6 hover:border-coral-300 hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <h3 className="font-display font-bold text-xl truncate">{item.word}</h3>
          {item.ipa && (
            <span className="text-xs text-ink/50 italic font-mono shrink-0">{item.ipa}</span>
          )}
        </div>
        {item.pronunciationAudioUrl && (
          <span aria-label="Có phát âm" role="img" className="text-ink/40 shrink-0">
            🔊
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-sand-100 text-charcoal uppercase tracking-wide">
          {PART_OF_SPEECH_LABELS[item.partOfSpeech]}
        </span>
        <DifficultyBadge difficulty={item.difficulty} />
      </div>

      <p className="mt-3 text-ink/70">{item.meaning}</p>

      <p className="mt-2 text-sm text-ink/50 italic line-clamp-2">
        &ldquo;{item.exampleSentence}&rdquo;
      </p>
    </Link>
  );
}
