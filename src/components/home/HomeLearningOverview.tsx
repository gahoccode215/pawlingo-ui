"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookMarked, Flame, Heart, Sparkles, Target } from "lucide-react";
import DifficultyBadge from "@/components/vocabulary/DifficultyBadge";
import { getVocabularyErrorMessage, isVocabularyServiceError } from "@/lib/vocabulary/errors";
import { PART_OF_SPEECH_LABELS } from "@/lib/vocabulary/labels";
import { vocabularyService } from "@/lib/vocabulary/service";
import type { Goal } from "@/types/auth";
import type { UserVocabularyResponse } from "@/types/vocabulary";

const GOAL_LABELS: Record<Goal, string> = {
  beginner: "Người mới bắt đầu",
  "test-prep": "Luyện thi",
  professional: "Đi làm",
  "for-child": "Cho trẻ em",
};

const RECENT_PREVIEW_SIZE = 5;

type Outcome =
  | { status: "success"; totalSaved: number; totalFavorited: number; recent: UserVocabularyResponse[] }
  | { status: "error"; message: string };

export default function HomeLearningOverview({ goal }: { goal: Goal }) {
  const [retryToken, setRetryToken] = useState(0);
  const [result, setResult] = useState<{ key: number; outcome: Outcome } | null>(null);

  useEffect(() => {
    let ignore = false;
    const key = retryToken;

    Promise.all([
      vocabularyService.listMyVocabularies({ size: RECENT_PREVIEW_SIZE }),
      vocabularyService.listMyVocabularies({ isFavorite: true, size: 1 }),
    ])
      .then(([recentPage, favoritedPage]) => {
        if (ignore) return;
        setResult({
          key,
          outcome: {
            status: "success",
            totalSaved: recentPage.meta.totalElements,
            totalFavorited: favoritedPage.meta.totalElements,
            recent: recentPage.data,
          },
        });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
        setResult({ key, outcome: { status: "error", message: getVocabularyErrorMessage(code) } });
      });

    return () => {
      ignore = true;
    };
  }, [retryToken]);

  const isLoading = result === null || result.key !== retryToken;
  const outcome = isLoading ? null : result.outcome;
  const totalSaved = outcome?.status === "success" ? outcome.totalSaved : null;
  const totalFavorited = outcome?.status === "success" ? outcome.totalFavorited : null;
  // A playful but honest derivation from the real saved-word count (10 XP
  // per word) — not a fabricated/random number, just a gamified framing of
  // real data. Streak has no backend yet, so it's the one purely static tile.
  const xp = totalSaved !== null ? totalSaved * 10 : null;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatTile icon={Target} label="Mục tiêu" value={GOAL_LABELS[goal]} />
        <StatTile icon={Flame} label="Streak" value="0 ngày" />
        <StatTile icon={Sparkles} label="Điểm KN" value={xp === null ? "…" : xp} />
        <StatTile icon={BookMarked} label="Từ đã lưu" value={totalSaved === null ? "…" : totalSaved} />
        <StatTile icon={Heart} label="Yêu thích" value={totalFavorited === null ? "…" : totalFavorited} />
      </div>

      <div className="mt-6 bg-surface rounded-3xl shadow-card border border-ink/10 p-6">
        <h2 className="font-display font-bold text-lg">Tiếp tục học</h2>

        {isLoading && (
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-14 rounded-xl bg-ink/5 animate-pulse" />
            ))}
          </div>
        )}

        {outcome?.status === "error" && (
          <div className="mt-4 text-center py-6">
            <p className="text-sm text-ink/60">{outcome.message}</p>
            <button
              type="button"
              onClick={() => setRetryToken((token) => token + 1)}
              className="mt-3 text-sm font-semibold text-coral-600 hover:underline"
            >
              Thử lại
            </button>
          </div>
        )}

        {outcome?.status === "success" && outcome.recent.length === 0 && (
          <div className="mt-4 text-center py-6">
            <p className="text-sm text-ink/60">Bạn chưa lưu từ nào.</p>
            <Link
              href="/vocabularies"
              className="mt-3 inline-block text-sm font-semibold text-coral-600 hover:underline"
            >
              Khám phá từ vựng →
            </Link>
          </div>
        )}

        {outcome?.status === "success" && outcome.recent.length > 0 && (
          <ul className="mt-4 space-y-2">
            {outcome.recent.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/vocabularies/${item.wordId}?back=${encodeURIComponent("/home")}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-cream transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-semibold truncate">
                        {item.word?.word ?? item.wordId}
                      </span>
                      {item.word && (
                        <span className="text-xs text-ink/40 shrink-0">
                          {PART_OF_SPEECH_LABELS[item.word.partOfSpeech]}
                        </span>
                      )}
                    </div>
                    {item.word?.primaryMeaning && (
                      <p className="text-sm text-ink/50 truncate">{item.word.primaryMeaning}</p>
                    )}
                  </div>
                  {item.word && <DifficultyBadge difficultyLevel={item.word.difficultyLevel} />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-ink/10 p-4">
      <Icon className="size-4 text-coral-500" />
      <p className="mt-2 text-lg font-display font-bold truncate">{value}</p>
      <p className="text-xs text-ink/50">{label}</p>
    </div>
  );
}
