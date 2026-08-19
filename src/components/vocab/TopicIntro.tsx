interface TopicIntroProps {
  topicLabel: string;
  wordCount: number;
  onStart: () => void;
}

export default function TopicIntro({ topicLabel, wordCount, onStart }: TopicIntroProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-card border border-ink/5 p-8 text-center">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">
          Bài học từ vựng
        </p>
        <h1 className="font-display font-extrabold text-3xl mt-2">{topicLabel}</h1>
        <p className="mt-3 text-ink/60">
          {wordCount} từ · mỗi từ có một flashcard và một câu hỏi nhanh
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 w-full bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold px-6 py-3.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
        >
          Bắt đầu 🐾
        </button>
      </div>
    </div>
  );
}
