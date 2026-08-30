"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { SessionWord } from "@/lib/vocabulary/learn-session";
import { cn } from "@/lib/utils";

export interface LearnSessionWordResult {
  wordId: string;
  correctFirstTry: boolean;
}

interface LearnSessionProps {
  words: SessionWord[];
  onFinish: (results: LearnSessionWordResult[]) => void;
  exitHref?: string;
}

type Stage = "presentation" | "recognition" | "context";
type OptionState = "idle" | "selected-correct" | "selected-incorrect" | "correct-reveal" | "muted";

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function blankOutWord(sentence: string, word: string): string | null {
  const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
  if (!pattern.test(sentence)) return null;
  return sentence.replace(pattern, "_____");
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function playAudio(audioUrl: string) {
  new Audio(audioUrl).play().catch(() => {
    // Sample mock audio may not exist as a real file — ignore playback failures.
  });
}

export default function LearnSession({ words, onFinish, exitHref = "/vocabularies" }: LearnSessionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("presentation");
  const [selected, setSelected] = useState<string | null>(null);
  const [hadMistake, setHadMistake] = useState(false);
  const [results, setResults] = useState<LearnSessionWordResult[]>([]);

  const current = words[wordIndex];
  const firstExample = current.word.examples[0] ?? null;
  const blankedSentence = firstExample ? blankOutWord(firstExample.sentence, current.word.word) : null;
  const hasContextStage = blankedSentence !== null;

  const recognitionOptions = useMemo(() => {
    const options = [current.word.primaryMeaning, ...current.distractors.map((d) => d.primaryMeaning)];
    return shuffle(options);
    // Reshuffle only when the underlying word changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.word.id]);

  const contextOptions = useMemo(() => {
    const options = [current.word.word, ...current.distractors.map((d) => d.word)];
    return shuffle(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.word.id]);

  function advanceToNextWord(wordCorrectFirstTry: boolean) {
    const nextResults = [...results, { wordId: current.word.id, correctFirstTry: wordCorrectFirstTry }];
    if (wordIndex + 1 >= words.length) {
      onFinish(nextResults);
      return;
    }
    setResults(nextResults);
    setWordIndex((index) => index + 1);
    setStage("presentation");
    setSelected(null);
    setHadMistake(false);
  }

  function handleAnswer(correctAnswer: string, picked: string) {
    setSelected(picked);
    if (picked !== correctAnswer) setHadMistake(true);
  }

  function handleContinueFromRecognition() {
    if (hasContextStage) {
      setStage("context");
      setSelected(null);
      return;
    }
    advanceToNextWord(!hadMistake);
  }

  function handleContinueFromContext() {
    advanceToNextWord(!hadMistake);
  }

  function optionState(option: string, correctAnswer: string): OptionState {
    if (selected === null) return "idle";
    if (option === selected && option === correctAnswer) return "selected-correct";
    if (option === selected) return "selected-incorrect";
    if (option === correctAnswer) return "correct-reveal";
    return "muted";
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-12">
      <div className="flex items-center justify-between text-sm font-semibold text-ink/50">
        <span>
          {wordIndex + 1} / {words.length}
        </span>
        <Link
          href={exitHref}
          className="hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 rounded-full"
        >
          Thoát
        </Link>
      </div>

      <div className="mt-10">
        {stage === "presentation" && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-display font-extrabold text-4xl">{current.word.word}</h1>
              {current.word.audioUrl && (
                <button
                  type="button"
                  onClick={() => playAudio(current.word.audioUrl!)}
                  aria-label="Phát âm"
                  className="text-2xl text-ink/40 hover:text-coral-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 rounded-full"
                >
                  🔊
                </button>
              )}
            </div>
            {current.word.phonetic && (
              <p className="mt-1 text-ink/50 italic font-mono">{current.word.phonetic}</p>
            )}
            <p className="mt-6 text-xl">{current.word.primaryMeaning}</p>
            {firstExample && (
              <div className="mt-6 bg-surface rounded-2xl border border-ink/10 p-4 text-left">
                <p className="italic text-ink/80">&ldquo;{firstExample.sentence}&rdquo;</p>
                {firstExample.translation && (
                  <p className="mt-1 text-sm text-ink/50">{firstExample.translation}</p>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setStage("recognition")}
              className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-8 px-8 py-3")}
            >
              Tiếp theo
            </button>
          </div>
        )}

        {stage === "recognition" && (
          <div>
            <p className="text-center text-sm font-semibold text-ink/50 uppercase tracking-wide">
              Nghĩa của từ này là gì?
            </p>
            <p className="mt-2 text-center font-display font-extrabold text-3xl">{current.word.word}</p>

            <div className="mt-8 grid gap-3">
              {recognitionOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  state={optionState(option, current.word.primaryMeaning)}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(current.word.primaryMeaning, option)}
                />
              ))}
            </div>

            {selected !== null && (
              <>
                <FeedbackBanner isCorrect={selected === current.word.primaryMeaning} example={null} />
                <button
                  type="button"
                  onClick={handleContinueFromRecognition}
                  className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-4 w-full py-3")}
                >
                  Tiếp tục
                </button>
              </>
            )}
          </div>
        )}

        {stage === "context" && blankedSentence && (
          <div>
            <p className="text-center text-sm font-semibold text-ink/50 uppercase tracking-wide">
              Điền từ còn thiếu
            </p>
            <p className="mt-4 text-center text-lg leading-relaxed">{blankedSentence}</p>

            <div className="mt-8 grid gap-3">
              {contextOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  state={optionState(option, current.word.word)}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(current.word.word, option)}
                />
              ))}
            </div>

            {selected !== null && (
              <>
                <FeedbackBanner
                  isCorrect={selected === current.word.word}
                  example={firstExample}
                />
                <button
                  type="button"
                  onClick={handleContinueFromContext}
                  className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-4 w-full py-3")}
                >
                  Tiếp tục
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OptionButton({
  label,
  state,
  disabled,
  onClick,
}: {
  label: string;
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
}) {
  const stateClass: Record<OptionState, string> = {
    idle: "border-ink/10 bg-surface hover:border-coral-300",
    "selected-correct": "border-teal-400 bg-teal-50 text-teal-600",
    "selected-incorrect": "border-destructive bg-destructive/10 text-destructive",
    "correct-reveal": "border-teal-400 bg-teal-50 text-teal-600",
    muted: "border-ink/10 bg-surface text-ink/40",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full text-left px-4 py-3 rounded-2xl border text-sm font-semibold transition-colors flex items-center justify-between gap-2 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2",
        stateClass[state],
      )}
    >
      <span>{label}</span>
      {(state === "selected-correct" || state === "correct-reveal") && <span aria-hidden="true">✓</span>}
      {state === "selected-incorrect" && <span aria-hidden="true">✕</span>}
    </button>
  );
}

function FeedbackBanner({
  isCorrect,
  example,
}: {
  isCorrect: boolean;
  example: { sentence: string; translation: string | null } | null;
}) {
  return (
    <div className={cn("mt-6 rounded-2xl p-4 flex items-start gap-3", isCorrect ? "bg-teal-50" : "bg-destructive/10")}>
      <span className={cn("text-lg font-bold", isCorrect ? "text-teal-600" : "text-destructive")} aria-hidden="true">
        {isCorrect ? "✓" : "✕"}
      </span>
      <div className="flex-1">
        <p className={cn("font-semibold", isCorrect ? "text-teal-600" : "text-destructive")}>
          {isCorrect ? "Chính xác" : "Chưa đúng"}
        </p>
        {example && <p className="mt-1 text-sm text-ink/60 italic">&ldquo;{example.sentence}&rdquo;</p>}
      </div>
    </div>
  );
}
