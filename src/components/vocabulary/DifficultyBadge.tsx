import {
  DIFFICULTY_BADGE_CLASSES,
  getDifficultyLabel,
  UNKNOWN_DIFFICULTY_BADGE_CLASSES,
} from "@/lib/vocabulary/labels";
import type { DifficultyLevel } from "@/types/vocabulary";

export default function DifficultyBadge({ difficultyLevel }: { difficultyLevel: DifficultyLevel | null }) {
  const classes = difficultyLevel ? DIFFICULTY_BADGE_CLASSES[difficultyLevel] : UNKNOWN_DIFFICULTY_BADGE_CLASSES;

  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${classes}`}>
      {getDifficultyLabel(difficultyLevel)}
    </span>
  );
}
