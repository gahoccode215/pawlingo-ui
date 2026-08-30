"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { vocabularyService } from "@/lib/vocabulary/service";
import type { LearnSessionWordResult } from "./LearnSession";

interface LearnSessionSummaryProps {
  results: LearnSessionWordResult[];
  onLearnMore: () => void;
  homeHref?: string;
}

type SaveState = "saving" | "done" | "error";

// Matches the established secondary-pill pattern used elsewhere for a CTA
// next to a primary `pop` button (e.g. VocabularyDetail.tsx's "Đã lưu — Xóa"),
// not shadcn's default `outline` variant, which is squared and off-brand here.
const SECONDARY_PILL =
  "bg-surface border border-ink/10 hover:border-coral-300 font-display font-semibold text-sm rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2";

export default function LearnSessionSummary({ results, onLearnMore, homeHref = "/home" }: LearnSessionSummaryProps) {
  const [saveState, setSaveState] = useState<SaveState>("saving");
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let ignore = false;

    // A session never claims MASTERED — every word introduced here moves to
    // LEARNING regardless of per-question performance within the session.
    Promise.all(results.map((result) => vocabularyService.setStatus(result.wordId, "LEARNING")))
      .then(() => {
        if (!ignore) setSaveState("done");
      })
      .catch(() => {
        if (!ignore) setSaveState("error");
      });

    return () => {
      ignore = true;
    };
  }, [results, retryToken]);

  const total = results.length;
  const correctFirstTry = results.filter((result) => result.correctFirstTry).length;
  const needsMorePractice = total - correctFirstTry;

  return (
    <div className="max-w-md mx-auto px-5 py-16 text-center">
      <p className="text-5xl" aria-hidden="true">
        🎉
      </p>
      <h1 className="mt-4 font-display font-extrabold text-2xl">Hoàn thành buổi học</h1>
      <p className="mt-2 text-ink/60">{total} từ mới</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-ink/10 bg-surface p-4">
          <p className="font-display font-bold text-2xl text-teal-600">{correctFirstTry}</p>
          <p className="mt-1 text-xs text-ink/50">câu trả lời đúng ngay lần đầu</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-surface p-4">
          <p className="font-display font-bold text-2xl">{needsMorePractice}</p>
          <p className="mt-1 text-xs text-ink/50">câu cần luyện thêm</p>
        </div>
      </div>

      {saveState === "error" && (
        <p className="mt-4 text-sm text-destructive">
          Chưa lưu được tiến độ.{" "}
          <button
            type="button"
            onClick={() => {
              setSaveState("saving");
              setRetryToken((token) => token + 1);
            }}
            className="font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 rounded"
          >
            Thử lại
          </button>
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={onLearnMore}
          className={cn(buttonVariants({ variant: "pop" }), "h-auto w-full py-3")}
        >
          Học thêm
        </button>
        <Link href={homeHref} className={cn(SECONDARY_PILL, "py-3")}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
