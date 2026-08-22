import { DIFFICULTY_BADGE_CLASSES } from "@/lib/vocabulary/labels";
import type { VocabularyDifficulty } from "@/types/vocabulary";

export default function DifficultyBadge({ difficulty }: { difficulty: VocabularyDifficulty }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-1 rounded-full ${DIFFICULTY_BADGE_CLASSES[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
