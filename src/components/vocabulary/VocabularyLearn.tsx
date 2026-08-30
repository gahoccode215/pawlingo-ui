"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getVocabularyErrorMessage, isVocabularyServiceError } from "@/lib/vocabulary/errors";
import { buildLearnSession, type SessionWord } from "@/lib/vocabulary/learn-session";
import { cn } from "@/lib/utils";
import type { DifficultyLevel, VocabularyTopic } from "@/types/vocabulary";
import LearnSession, { type LearnSessionWordResult } from "./LearnSession";
import LearnSessionSummary from "./LearnSessionSummary";

const VALID_TOPICS: VocabularyTopic[] = ["EDUCATION", "TRAVEL", "HOLIDAY", "WORK", "DAILY_LIFE", "FOOD"];
const VALID_DIFFICULTIES: DifficultyLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

function parseTopic(value: string | null): VocabularyTopic | undefined {
  return value && (VALID_TOPICS as string[]).includes(value) ? (value as VocabularyTopic) : undefined;
}

function parseDifficulty(value: string | null): DifficultyLevel | undefined {
  return value && (VALID_DIFFICULTIES as string[]).includes(value) ? (value as DifficultyLevel) : undefined;
}

type Outcome =
  | { status: "insufficient" }
  | { status: "error"; message: string }
  | { status: "success"; words: SessionWord[] };

export default function VocabularyLearn() {
  const searchParams = useSearchParams();
  const topic = parseTopic(searchParams.get("topic"));
  const difficultyLevel = parseDifficulty(searchParams.get("difficultyLevel"));

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = `${topic}|${difficultyLevel}|${retryToken}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);
  const [sessionResults, setSessionResults] = useState<LearnSessionWordResult[] | null>(null);

  useEffect(() => {
    let ignore = false;
    const key = `${topic}|${difficultyLevel}|${retryToken}`;

    buildLearnSession({ topic, difficultyLevel })
      .then((words) => {
        if (ignore) return;
        setResult({ key, outcome: words ? { status: "success", words } : { status: "insufficient" } });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
        setResult({ key, outcome: { status: "error", message: getVocabularyErrorMessage(code) } });
      });

    return () => {
      ignore = true;
    };
  }, [topic, difficultyLevel, retryToken]);

  const isLoading = result === null || result.key !== requestKey;
  const outcome = isLoading ? null : result.outcome;

  function startAnotherSession() {
    setSessionResults(null);
    setRetryToken((token) => token + 1);
  }

  if (sessionResults) {
    return <LearnSessionSummary results={sessionResults} onLearnMore={startAnotherSession} />;
  }

  if (isLoading || !outcome) {
    return (
      <div className="max-w-lg mx-auto px-5 py-16">
        <div className="h-64 rounded-3xl bg-ink/5 animate-pulse" />
      </div>
    );
  }

  if (outcome.status === "insufficient") {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-4xl mb-3" aria-hidden="true">
          📭
        </p>
        <p className="font-display font-bold text-lg">Không đủ từ mới cho bộ lọc này.</p>
        <p className="mt-1 text-sm text-ink/60">Hãy thử chủ đề hoặc cấp độ khác.</p>
        <Link
          href="/vocabularies"
          className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-5 inline-flex px-5 py-2.5")}
        >
          Quay lại danh sách từ vựng
        </Link>
      </div>
    );
  }

  if (outcome.status === "error") {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-4xl mb-3" aria-hidden="true">
          😿
        </p>
        <p className="font-display font-bold text-lg">Đã có lỗi xảy ra.</p>
        <p className="mt-1 text-sm text-ink/60">{outcome.message}</p>
        <button
          type="button"
          onClick={() => setRetryToken((token) => token + 1)}
          className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-5 px-5 py-2.5")}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return <LearnSession words={outcome.words} onFinish={setSessionResults} />;
}
