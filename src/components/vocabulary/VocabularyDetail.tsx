"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getVocabularyErrorMessage, isVocabularyServiceError } from "@/lib/vocabulary/errors";
import { PART_OF_SPEECH_LABELS } from "@/lib/vocabulary/labels";
import { vocabularyService } from "@/lib/vocabulary/service";
import type { UserVocabularyResponse, WordDetailResponse } from "@/types/vocabulary";
import DifficultyBadge from "./DifficultyBadge";

type Outcome =
  | { status: "success"; word: WordDetailResponse; savedRecord: UserVocabularyResponse | null }
  | { status: "not-found" }
  | { status: "error"; message: string };

// The real API has no "check a single word's saved status" endpoint (see BE
// Spec 01 §4) — the only way to know is to page through the user's saved
// list and look for a match. Fine for this phase's data volumes.
const SAVED_LOOKUP_SIZE = 100;

export default function VocabularyDetail({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const backHref = searchParams.get("back") || "/vocabularies";

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = `${id}|${retryToken}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);

  useEffect(() => {
    let ignore = false;
    const key = `${id}|${retryToken}`;

    Promise.all([
      vocabularyService.getVocabularyDetail(id),
      vocabularyService.listMyVocabularies({ size: SAVED_LOOKUP_SIZE }),
    ])
      .then(([word, saved]) => {
        if (ignore) return;
        const savedRecord = saved.data.find((record) => record.wordId === id) ?? null;
        setResult({ key, outcome: { status: "success", word, savedRecord } });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        if (isVocabularyServiceError(error) && error.code === "WORD_NOT_FOUND") {
          setResult({ key, outcome: { status: "not-found" } });
          return;
        }
        const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
        setResult({ key, outcome: { status: "error", message: getVocabularyErrorMessage(code) } });
      });

    return () => {
      ignore = true;
    };
  }, [id, retryToken]);

  const isLoading = result === null || result.key !== requestKey;
  const outcome = isLoading ? null : result.outcome;

  const [savedRecord, setSavedRecord] = useState<UserVocabularyResponse | null>(null);
  const [priorOutcome, setPriorOutcome] = useState<Outcome | null>(null);
  if (outcome && outcome !== priorOutcome) {
    setPriorOutcome(outcome);
    setSavedRecord(outcome.status === "success" ? outcome.savedRecord : null);
  }

  const [isActionPending, setIsActionPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleAdd() {
    const previous = savedRecord;
    setActionError(null);
    setIsActionPending(true);
    // Optimistic: flip to "saved" immediately, reconcile with the real
    // record once the call resolves.
    setSavedRecord((current) => current ?? { id: "pending", wordId: id, isFavorite: false, status: "NEW", createdAt: new Date().toISOString() });
    try {
      const record = await vocabularyService.addToMyVocabulary(id);
      setSavedRecord(record);
    } catch (error) {
      setSavedRecord(previous);
      const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
      setActionError(getVocabularyErrorMessage(code));
    } finally {
      setIsActionPending(false);
    }
  }

  async function handleRemove() {
    const previous = savedRecord;
    setActionError(null);
    setIsActionPending(true);
    // Optimistic: removing also clears favorite, since the whole record is gone.
    setSavedRecord(null);
    try {
      await vocabularyService.removeFromMyVocabulary(id);
    } catch (error) {
      setSavedRecord(previous);
      const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
      setActionError(getVocabularyErrorMessage(code));
    } finally {
      setIsActionPending(false);
    }
  }

  async function handleToggleFavorite() {
    const previous = savedRecord;
    const nextIsFavorite = !(savedRecord?.isFavorite ?? false);
    setActionError(null);
    setIsActionPending(true);
    // Optimistic: favoriting an unsaved word also flips "Add" to "Đã lưu",
    // since favorite implicitly creates the saved record.
    setSavedRecord((current) => ({
      id: current?.id ?? "pending",
      wordId: id,
      isFavorite: nextIsFavorite,
      status: current?.status ?? "NEW",
      createdAt: current?.createdAt ?? new Date().toISOString(),
    }));
    try {
      const record = await vocabularyService.setFavorite(id, nextIsFavorite);
      setSavedRecord(record);
    } catch (error) {
      setSavedRecord(previous);
      const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
      setActionError(getVocabularyErrorMessage(code));
    } finally {
      setIsActionPending(false);
    }
  }

  function playAudio(audioUrl: string) {
    new Audio(audioUrl).play().catch(() => {
      // Sample mock audio may not exist as a real file — ignore playback failures.
    });
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

        {outcome?.status === "not-found" && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3" aria-hidden="true">
              🙀
            </p>
            <p className="font-display font-bold text-lg">Không tìm thấy từ vựng này.</p>
            <Link
              href="/vocabularies"
              className="inline-block mt-5 bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
            >
              Quay lại danh sách từ vựng
            </Link>
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
                <h1 className="font-display font-extrabold text-3xl">{outcome.word.word}</h1>
                {outcome.word.phonetic && (
                  <p className="mt-1 text-ink/50 italic font-mono">{outcome.word.phonetic}</p>
                )}
              </div>
              {outcome.word.audioUrl && (
                <button
                  type="button"
                  onClick={() => playAudio(outcome.word.audioUrl!)}
                  aria-label="Phát âm"
                  className="text-2xl text-ink/40 hover:text-coral-500 shrink-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 rounded-full"
                >
                  🔊
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-sand-100 text-charcoal uppercase tracking-wide">
                {PART_OF_SPEECH_LABELS[outcome.word.partOfSpeech]}
              </span>
              <DifficultyBadge difficultyLevel={outcome.word.difficultyLevel} />
            </div>

            <section className="mt-6">
              <h2 className="text-xs font-bold text-ink/40 uppercase tracking-wide">Nghĩa</h2>
              <p className="mt-1.5 text-lg">{outcome.word.primaryMeaning}</p>
            </section>

            <section className="mt-5">
              <h2 className="text-xs font-bold text-ink/40 uppercase tracking-wide">Ví dụ</h2>
              {outcome.word.examples.length === 0 ? (
                <p className="mt-1.5 text-sm text-ink/50">Chưa có ví dụ cho từ này.</p>
              ) : (
                <ul className="mt-1.5 space-y-2">
                  {[...outcome.word.examples]
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((example) => (
                      <li key={example.id} className="text-ink/70">
                        <p className="italic">&ldquo;{example.sentence}&rdquo;</p>
                        {example.translation && (
                          <p className="text-sm text-ink/50 mt-0.5">{example.translation}</p>
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </section>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {savedRecord ? (
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isActionPending}
                  className="bg-surface border border-ink/10 hover:border-coral-300 font-display font-semibold text-sm px-5 py-2.5 rounded-full transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
                >
                  Đã lưu — Xóa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={isActionPending}
                  className="bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
                >
                  + Thêm vào từ vựng
                </button>
              )}

              <button
                type="button"
                onClick={handleToggleFavorite}
                disabled={isActionPending}
                aria-pressed={savedRecord?.isFavorite ?? false}
                aria-label={savedRecord?.isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
                className="text-2xl transition-transform disabled:opacity-50 disabled:pointer-events-none hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 rounded-full"
              >
                {savedRecord?.isFavorite ? "❤️" : "🤍"}
              </button>
            </div>

            {actionError && <p className="mt-3 text-sm text-red-600">{actionError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
