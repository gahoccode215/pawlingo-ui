export default function VocabularyCardSkeleton() {
  return (
    <div className="h-full flex flex-col bg-surface rounded-3xl shadow-card border border-ink/5 p-6 animate-pulse">
      <div className="h-6 w-2/3 rounded-full bg-ink/10" />
      <div className="flex gap-2 mt-3">
        <div className="h-5 w-14 rounded-full bg-ink/10" />
        <div className="h-5 w-10 rounded-full bg-ink/10" />
      </div>
      <div className="h-4 w-full rounded-full bg-ink/10 mt-4" />
      <div className="h-3 w-4/5 rounded-full bg-ink/10 mt-3" />
    </div>
  );
}
