import type { VocabWord, WordAttempt } from "@/types/vocab";
import { MASTERED_BOX } from "@/lib/vocab/leitner";

interface SessionSummaryProps {
  words: VocabWord[];
  attempts: Record<string, WordAttempt>;
  onRestart: () => void;
}

export default function SessionSummary({ words, attempts, onRestart }: SessionSummaryProps) {
  const totals = Object.values(attempts).reduce(
    (acc, attempt) => ({
      correct: acc.correct + attempt.correctCount,
      wrong: acc.wrong + attempt.wrongCount,
    }),
    { correct: 0, wrong: 0 }
  );

  const reviewWords = words.filter((word) => attempts[word.id].box < MASTERED_BOX);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card border border-ink/5 p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display font-extrabold text-3xl">Session complete!</h2>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-teal-50 py-4">
            <p className="text-2xl font-display font-bold text-teal-600">{totals.correct}</p>
            <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide">
              Correct
            </p>
          </div>
          <div className="rounded-2xl bg-coral-50 py-4">
            <p className="text-2xl font-display font-bold text-coral-600">{totals.wrong}</p>
            <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide">
              Wrong
            </p>
          </div>
        </div>

        {reviewWords.length > 0 ? (
          <div className="mt-6 text-left">
            <p className="text-sm font-semibold text-ink/70 mb-2">Words to review again:</p>
            <ul className="flex flex-wrap gap-2">
              {reviewWords.map((word) => (
                <li
                  key={word.id}
                  className="text-sm font-medium bg-cream border border-ink/10 rounded-full px-3 py-1"
                >
                  {word.word}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink/60">
            You mastered every word in this session. 🐾
          </p>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 w-full bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold px-6 py-3.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
        >
          Practice again
        </button>
      </div>
    </div>
  );
}
