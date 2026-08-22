"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { getVocabularyById } from "@/lib/vocabulary/api";
import { getVocabularyErrorMessage } from "@/lib/vocabulary/errors";
import { ApiError } from "@/lib/api";
import { PART_OF_SPEECH_LABELS, TOPIC_LABELS } from "@/lib/vocabulary/labels";
import type { VocabularyItem } from "@/types/vocabulary";
import DifficultyBadge from "./DifficultyBadge";

type Outcome = { status: "success"; item: VocabularyItem } | { status: "error"; message: string };

export default function VocabularyDetail({ id }: { id: string }) {
  const { user, status } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const backHref = searchParams.get("back") || "/vocabulary";

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = `${id}|${retryToken}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);

  useEffect(() => {
    if (!user) return;
    let ignore = false;
    const key = `${id}|${retryToken}`;

    getVocabularyById(id)
      .then((item) => {
        if (!ignore) setResult({ key, outcome: { status: "success", item } });
      })
      .catch((error) => {
        if (ignore) return;
        const code = error instanceof ApiError ? error.code : "INTERNAL_ERROR";
        setResult({ key, outcome: { status: "error", message: getVocabularyErrorMessage(code) } });
      });

    return () => {
      ignore = true;
    };
  }, [user, id, retryToken]);

  const isLoading = result === null || result.key !== requestKey;
  const outcome = isLoading ? null : result.outcome;

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5">
        <p className="text-sm text-ink/50">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-coral-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 rounded-full"
      >
        ← Quay lại danh sách từ vựng
      </Link>

      <div className="mt-6">
        {isLoading && (
          <div className="bg-surface rounded-3xl shadow-card border border-ink/5 p-8 animate-pulse">
            <div className="h-9 w-1/2 rounded-full bg-ink/10" />
            <div className="flex gap-2 mt-4">
              <div className="h-5 w-16 rounded-full bg-ink/10" />
              <div className="h-5 w-10 rounded-full bg-ink/10" />
            </div>
            <div className="h-4 w-full rounded-full bg-ink/10 mt-6" />
            <div className="h-4 w-2/3 rounded-full bg-ink/10 mt-3" />
          </div>
        )}

        {outcome?.status === "error" && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3" aria-hidden="true">
              😿
            </p>
            <p className="font-display font-bold text-lg">Đã có lỗi xảy ra.</p>
            <p className="mt-1 text-sm text-ink/60">{outcome.message}</p>
            <button
              type="button"
              onClick={() => setRetryToken((token) => token + 1)}
              className="mt-5 bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
            >
              Thử lại
            </button>
          </div>
        )}

        {outcome?.status === "success" && (
          <div className="bg-surface rounded-3xl shadow-card border border-ink/5 p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="font-display font-extrabold text-3xl">{outcome.item.word}</h1>
                {outcome.item.ipa && (
                  <p className="mt-1 text-ink/50 italic font-mono">{outcome.item.ipa}</p>
                )}
              </div>
              {outcome.item.pronunciationAudioUrl && (
                <span aria-label="Có phát âm" role="img" className="text-2xl text-ink/40 shrink-0">
                  🔊
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-sand-100 text-charcoal uppercase tracking-wide">
                {PART_OF_SPEECH_LABELS[outcome.item.partOfSpeech]}
              </span>
              <DifficultyBadge difficulty={outcome.item.difficulty} />
            </div>

            <section className="mt-6">
              <h2 className="text-xs font-bold text-ink/40 uppercase tracking-wide">Nghĩa</h2>
              <p className="mt-1.5 text-lg">{outcome.item.meaning}</p>
            </section>

            {outcome.item.definition && (
              <section className="mt-5">
                <h2 className="text-xs font-bold text-ink/40 uppercase tracking-wide">
                  Định nghĩa
                </h2>
                <p className="mt-1.5 text-ink/70">{outcome.item.definition}</p>
              </section>
            )}

            <section className="mt-5">
              <h2 className="text-xs font-bold text-ink/40 uppercase tracking-wide">Ví dụ</h2>
              <p className="mt-1.5 text-ink/70 italic">&ldquo;{outcome.item.exampleSentence}&rdquo;</p>
            </section>

            <section className="mt-5">
              <h2 className="text-xs font-bold text-ink/40 uppercase tracking-wide">Chủ đề</h2>
              <p className="mt-1.5 text-ink/70">{TOPIC_LABELS[outcome.item.topic]}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
