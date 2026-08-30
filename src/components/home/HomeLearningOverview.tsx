"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookMarked, CheckCircle2, type LucideIcon, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import DifficultyBadge from "@/components/vocabulary/DifficultyBadge";
import { getVocabularyErrorMessage, isVocabularyServiceError } from "@/lib/vocabulary/errors";
import { PART_OF_SPEECH_LABELS } from "@/lib/vocabulary/labels";
import { vocabularyService } from "@/lib/vocabulary/service";
import { cn } from "@/lib/utils";
import type { Goal } from "@/types/auth";
import type { UserVocabularyResponse } from "@/types/vocabulary";

export const GOAL_LABELS: Record<Goal, string> = {
  beginner: "Người mới bắt đầu",
  "test-prep": "Luyện thi",
  professional: "Đi làm",
  "for-child": "Cho trẻ em",
};

const RECENT_PREVIEW_SIZE = 5;

type Outcome =
  | {
      status: "success";
      totalSaved: number;
      totalLearning: number;
      totalMastered: number;
      continueTarget: UserVocabularyResponse | null;
      recent: UserVocabularyResponse[];
    }
  | { status: "error"; message: string };

export default function HomeLearningOverview() {
  const [retryToken, setRetryToken] = useState(0);
  const [result, setResult] = useState<{ key: number; outcome: Outcome } | null>(null);

  useEffect(() => {
    let ignore = false;
    const key = retryToken;

    Promise.all([
      vocabularyService.listMyVocabularies({ status: "LEARNING", size: 1 }),
      vocabularyService.listMyVocabularies({ size: RECENT_PREVIEW_SIZE }),
      vocabularyService.listMyVocabularies({ status: "MASTERED", size: 1 }),
    ])
      .then(([learningPage, recentPage, masteredPage]) => {
        if (ignore) return;
        setResult({
          key,
          outcome: {
            status: "success",
            totalSaved: recentPage.meta.totalElements,
            totalLearning: learningPage.meta.totalElements,
            totalMastered: masteredPage.meta.totalElements,
            continueTarget: learningPage.data[0] ?? recentPage.data[0] ?? null,
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

  if (outcome?.status === "error") {
    return (
      <div className="rounded-3xl bg-surface border border-ink/10 p-6 text-center">
        <p className="text-sm text-ink/60">{outcome.message}</p>
        <button
          type="button"
          onClick={() => setRetryToken((token) => token + 1)}
          className="mt-3 text-sm font-semibold text-coral-600 hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-lg">Tiếp tục học</h2>

        {isLoading && <div className="mt-3 h-24 rounded-3xl bg-ink/5 animate-pulse" />}

        {outcome?.status === "success" && outcome.continueTarget && (
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-surface border border-ink/10 p-6">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 min-w-0">
                <p className="font-display font-bold text-xl truncate">
                  {outcome.continueTarget.word?.word ?? outcome.continueTarget.wordId}
                </p>
                {outcome.continueTarget.word && (
                  <DifficultyBadge difficultyLevel={outcome.continueTarget.word.difficultyLevel} />
                )}
              </div>
              {outcome.continueTarget.word?.primaryMeaning && (
                <p className="mt-1 text-sm text-ink/50 truncate">
                  {outcome.continueTarget.word.primaryMeaning}
                </p>
              )}
            </div>
            <Link
              href={`/vocabularies/${outcome.continueTarget.wordId}?back=${encodeURIComponent("/home")}`}
              className={cn(buttonVariants({ variant: "pop" }), "h-auto px-6 py-3 shrink-0")}
            >
              {outcome.continueTarget.status === "LEARNING" ? "Tiếp tục" : "Bắt đầu"} →
            </Link>
          </div>
        )}

        {outcome?.status === "success" && !outcome.continueTarget && (
          <div className="mt-3 rounded-3xl bg-surface border border-ink/10 p-6 text-center">
            <p className="text-sm text-ink/60">Bạn chưa lưu từ nào để học.</p>
            <Link
              href="/vocabularies"
              className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-3 inline-flex px-6 py-3")}
            >
              Khám phá từ vựng
            </Link>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display font-bold text-lg">Tiến độ của bạn</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <StatTile
            icon={BookMarked}
            label="Đã lưu"
            value={outcome?.status === "success" ? outcome.totalSaved : "…"}
          />
          <StatTile
            icon={Sparkles}
            label="Đang học"
            value={outcome?.status === "success" ? outcome.totalLearning : "…"}
          />
          <StatTile
            icon={CheckCircle2}
            label="Đã thành thạo"
            value={outcome?.status === "success" ? outcome.totalMastered : "…"}
          />
        </div>
      </div>

      <div>
        <h2 className="font-display font-bold text-lg">Hoạt động gần đây</h2>

        {isLoading && (
          <div className="mt-3 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-12 rounded-xl bg-ink/5 animate-pulse" />
            ))}
          </div>
        )}

        {outcome?.status === "success" && outcome.recent.length === 0 && (
          <p className="mt-3 text-sm text-ink/50">Chưa có hoạt động nào gần đây.</p>
        )}

        {outcome?.status === "success" && outcome.recent.length > 0 && (
          <ul className="mt-3 divide-y divide-ink/5">
            {outcome.recent.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/vocabularies/${item.wordId}?back=${encodeURIComponent("/home")}`}
                  className="flex items-center gap-3 rounded-lg px-2 -mx-2 py-2.5 hover:bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
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
  icon: LucideIcon;
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
