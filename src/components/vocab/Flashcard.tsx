import type { VocabWord } from "@/types/vocab";

interface FlashcardProps {
  word: VocabWord;
  masteredCount: number;
  totalWords: number;
  onContinue: () => void;
}

export default function Flashcard({
  word,
  masteredCount,
  totalWords,
  onContinue,
}: FlashcardProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-card border border-ink/5 p-8 text-center">
        <p className="text-xs font-semibold text-ink/40">
          Đã thuộc {masteredCount} / {totalWords} từ
        </p>
        <div className="text-7xl my-5">{word.imageUrl}</div>
        <h2 className="font-display font-extrabold text-3xl">{word.word}</h2>
        <p className="mt-3 text-ink/70">{word.definition}</p>
        <p className="mt-4 text-sm text-ink/50 italic">
          &ldquo;{word.exampleSentence}&rdquo;
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-8 w-full bg-teal-500 hover:bg-teal-600 text-white font-display font-semibold px-6 py-3.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
        >
          Kiểm tra tôi →
        </button>
      </div>
    </div>
  );
}
