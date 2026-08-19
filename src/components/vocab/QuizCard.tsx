"use client";

import { useState } from "react";
import type { VocabWord } from "@/types/vocab";

interface QuizCardProps {
  word: VocabWord;
  options: VocabWord[];
  masteredCount: number;
  totalWords: number;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({
  word,
  options,
  masteredCount,
  totalWords,
  onAnswer,
}: QuizCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const hasAnswered = selectedId !== null;
  const isCorrect = selectedId === word.id;

  function optionClasses(optionId: string) {
    if (!hasAnswered) {
      return "border-ink/10 hover:border-coral-300 hover:bg-coral-50";
    }
    if (optionId === word.id) {
      return "border-teal-500 bg-teal-50 text-teal-700";
    }
    if (optionId === selectedId) {
      return "border-coral-500 bg-coral-50 text-coral-700";
    }
    return "border-ink/10 opacity-50";
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card border border-ink/5 p-8">
        <p className="text-xs font-semibold text-ink/40 text-center">
          Đã thuộc {masteredCount} / {totalWords} từ
        </p>
        <h2 className="font-display font-bold text-xl text-center mt-3">
          Từ nào có nghĩa là:
        </h2>
        <p className="mt-2 text-center text-ink/70 italic">
          &ldquo;{word.definition}&rdquo;
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              disabled={hasAnswered}
              onClick={() => setSelectedId(option.id)}
              className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold transition-colors ${optionClasses(option.id)}`}
            >
              {option.word}
            </button>
          ))}
        </div>

        {hasAnswered && (
          <button
            type="button"
            onClick={() => onAnswer(isCorrect)}
            className="mt-6 w-full bg-ink hover:bg-ink/90 text-white font-display font-semibold px-6 py-3.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
          >
            {isCorrect ? "Tốt lắm! Tiếp tục →" : "Tiếp tục →"}
          </button>
        )}
      </div>
    </div>
  );
}
