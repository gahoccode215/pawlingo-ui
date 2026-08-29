interface VocabularyPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function VocabularyPagination({ page, totalPages, onPageChange }: VocabularyPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-4 py-2 rounded-full text-sm font-semibold bg-surface border border-ink/10 text-ink/70 hover:border-coral-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        ← Trước
      </button>
      <span className="text-sm font-semibold text-ink/60">
        Trang {page + 1} / {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        className="px-4 py-2 rounded-full text-sm font-semibold bg-surface border border-ink/10 text-ink/70 hover:border-coral-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        Sau →
      </button>
    </div>
  );
}
