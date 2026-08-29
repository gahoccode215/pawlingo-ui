"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getVocabularyErrorMessage, isVocabularyServiceError } from "@/lib/vocabulary/errors";
import { VOCABULARY_STATUS_FILTER_OPTIONS } from "@/lib/vocabulary/labels";
import { vocabularyService } from "@/lib/vocabulary/service";
import type { PaginatedResponse, UserVocabularyResponse, VocabularyStatus } from "@/types/vocabulary";
import MyVocabularyCard from "./MyVocabularyCard";
import VocabularyPagination from "./VocabularyPagination";

const PAGE_SIZE = 12;
const VALID_STATUSES: VocabularyStatus[] = ["NEW", "LEARNING", "MASTERED"];

function parseStatus(value: string | null): VocabularyStatus | "all" {
  return value && (VALID_STATUSES as string[]).includes(value) ? (value as VocabularyStatus) : "all";
}

function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

type Outcome =
  | { status: "success"; data: PaginatedResponse<UserVocabularyResponse> }
  | { status: "error"; message: string };

export default function MyVocabularyBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const favoriteOnly = searchParams.get("isFavorite") === "1";
  const status = parseStatus(searchParams.get("status"));
  const page = parsePage(searchParams.get("page"));

  const updateParams = useCallback(
    (next: Partial<{ isFavorite: boolean; status: string; page: number }>, resetPage = false) => {
      const merged = { isFavorite: favoriteOnly, status, page, ...next, ...(resetPage ? { page: 0 } : {}) };

      const params = new URLSearchParams();
      if (merged.isFavorite) params.set("isFavorite", "1");
      if (merged.status !== "all") params.set("status", merged.status);
      if (merged.page) params.set("page", String(merged.page));

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [pathname, router, favoriteOnly, status, page],
  );

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = `${page}|${favoriteOnly}|${status}|${retryToken}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);

  useEffect(() => {
    let ignore = false;
    const key = `${page}|${favoriteOnly}|${status}|${retryToken}`;

    vocabularyService
      .listMyVocabularies({
        page,
        size: PAGE_SIZE,
        isFavorite: favoriteOnly ? true : undefined,
        status: status === "all" ? undefined : status,
      })
      .then((data) => {
        if (!ignore) setResult({ key, outcome: { status: "success", data } });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
        setResult({ key, outcome: { status: "error", message: getVocabularyErrorMessage(code) } });
      });

    return () => {
      ignore = true;
    };
  }, [page, favoriteOnly, status, retryToken]);

  const isLoading = result === null || result.key !== requestKey;
  const outcome = isLoading ? null : result.outcome;

  const [removingWordId, setRemovingWordId] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState<string | null>(null);

  async function handleRemove(wordId: string) {
    setRemoveError(null);
    setRemovingWordId(wordId);
    try {
      await vocabularyService.removeFromMyVocabulary(wordId);
      setResult((current) => {
        if (!current || current.outcome.status !== "success") return current;
        const data = current.outcome.data.data.filter((item) => item.wordId !== wordId);
        return {
          ...current,
          outcome: {
            status: "success",
            data: {
              data,
              meta: { ...current.outcome.data.meta, totalElements: current.outcome.data.meta.totalElements - 1 },
            },
          },
        };
      });
    } catch (error) {
      const code = isVocabularyServiceError(error) ? error.code : "INTERNAL_ERROR";
      setRemoveError(getVocabularyErrorMessage(code));
    } finally {
      setRemovingWordId(null);
    }
  }

  const hasActiveFilters = favoriteOnly || status !== "all";

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">Học từ vựng</p>
      <h1 className="font-display font-extrabold text-3xl mt-2">Từ vựng của tôi</h1>
      <p className="mt-1 text-ink/60">Danh sách các từ bạn đã lưu.</p>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="button"
          onClick={() => updateParams({ isFavorite: !favoriteOnly }, true)}
          aria-pressed={favoriteOnly}
          className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2 ${
            favoriteOnly ? "bg-coral-500 text-white" : "bg-surface border border-ink/10 text-ink/70 hover:border-coral-300"
          }`}
        >
          ❤️ Chỉ yêu thích
        </button>

        <select
          value={status}
          onChange={(event) => updateParams({ status: event.target.value }, true)}
          aria-label="Lọc theo trạng thái"
          className="shrink-0 bg-surface border border-ink/10 rounded-full px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-coral-400 transition-colors"
        >
          {VOCABULARY_STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {removeError && <p className="mt-4 text-sm text-red-600">{removeError}</p>}

      <div className="mt-8">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-24 rounded-3xl bg-ink/5 animate-pulse" />
            ))}
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

        {outcome?.status === "success" && outcome.data.data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3" aria-hidden="true">
              📭
            </p>
            <p className="font-display font-bold text-lg">Bạn chưa lưu từ nào.</p>
            <p className="mt-1 text-sm text-ink/60">
              {hasActiveFilters
                ? "Không có từ nào khớp với bộ lọc hiện tại."
                : "Hãy khám phá và lưu lại những từ bạn muốn học."}
            </p>
            <Link
              href="/vocabularies"
              className="inline-block mt-5 bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
            >
              Khám phá từ vựng
            </Link>
          </div>
        )}

        {outcome?.status === "success" && outcome.data.data.length > 0 && (
          <>
            <div className="space-y-4">
              {outcome.data.data.map((item) => (
                <MyVocabularyCard
                  key={item.id}
                  item={item}
                  isRemoving={removingWordId === item.wordId}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <VocabularyPagination
              page={outcome.data.meta.page}
              totalPages={outcome.data.meta.totalPages}
              onPageChange={(nextPage) => updateParams({ page: nextPage })}
            />
          </>
        )}
      </div>
    </div>
  );
}
