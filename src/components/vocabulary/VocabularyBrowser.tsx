"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { listVocabularies } from "@/lib/vocabulary/api";
import { getVocabularyErrorMessage } from "@/lib/vocabulary/errors";
import { ApiError } from "@/lib/api";
import type { VocabularyDifficulty, VocabularyListResult, VocabularyTopic } from "@/types/vocabulary";
import VocabularyFilters from "./VocabularyFilters";
import VocabularyCard from "./VocabularyCard";
import VocabularyCardSkeleton from "./VocabularyCardSkeleton";
import VocabularyPagination from "./VocabularyPagination";

const PAGE_SIZE = 20;
const VALID_TOPICS: VocabularyTopic[] = ["work", "education", "travel", "food", "daily-life"];
const VALID_DIFFICULTIES: VocabularyDifficulty[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

function parseTopic(value: string | null): VocabularyTopic | "all" {
  return value && (VALID_TOPICS as string[]).includes(value) ? (value as VocabularyTopic) : "all";
}

function parseDifficulty(value: string | null): VocabularyDifficulty | "all" {
  return value && (VALID_DIFFICULTIES as string[]).includes(value)
    ? (value as VocabularyDifficulty)
    : "all";
}

function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

type Outcome =
  | { status: "success"; data: VocabularyListResult }
  | { status: "error"; message: string };

export default function VocabularyBrowser() {
  const { user, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  const urlSearch = searchParams.get("search") ?? "";
  const topic = parseTopic(searchParams.get("topic"));
  const difficulty = parseDifficulty(searchParams.get("difficulty"));
  const page = parsePage(searchParams.get("page"));

  // Local input mirrors the URL's search value, but is allowed to run ahead
  // of it while the user is typing (before the debounce commits to the URL).
  const [priorUrlSearch, setPriorUrlSearch] = useState(urlSearch);
  const [searchInput, setSearchInput] = useState(urlSearch);
  if (urlSearch !== priorUrlSearch) {
    setPriorUrlSearch(urlSearch);
    setSearchInput(urlSearch);
  }
  const debouncedSearch = useDebouncedValue(searchInput.trim(), 350);

  const updateParams = useCallback(
    (
      next: Partial<{ search: string; topic: string; difficulty: string; page: number }>,
      resetPage = false,
    ) => {
      const merged = {
        search: urlSearch,
        topic,
        difficulty,
        page,
        ...next,
        ...(resetPage ? { page: 0 } : {}),
      };

      const params = new URLSearchParams();
      if (merged.search) params.set("search", merged.search);
      if (merged.topic !== "all") params.set("topic", merged.topic);
      if (merged.difficulty !== "all") params.set("difficulty", merged.difficulty);
      if (merged.page) params.set("page", String(merged.page));

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [pathname, router, urlSearch, topic, difficulty, page],
  );

  useEffect(() => {
    if (debouncedSearch !== urlSearch) updateParams({ search: debouncedSearch }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = `${page}|${topic}|${difficulty}|${urlSearch}|${retryToken}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);

  useEffect(() => {
    if (!user) return;
    let ignore = false;
    const key = `${page}|${topic}|${difficulty}|${urlSearch}|${retryToken}`;

    listVocabularies({
      page,
      size: PAGE_SIZE,
      topic: topic === "all" ? undefined : topic,
      difficulty: difficulty === "all" ? undefined : difficulty,
      search: urlSearch || undefined,
    })
      .then((data) => {
        if (!ignore) setResult({ key, outcome: { status: "success", data } });
      })
      .catch((error) => {
        if (ignore) return;
        const code = error instanceof ApiError ? error.code : "INTERNAL_ERROR";
        setResult({ key, outcome: { status: "error", message: getVocabularyErrorMessage(code) } });
      });

    return () => {
      ignore = true;
    };
  }, [user, page, topic, difficulty, urlSearch, retryToken]);

  const isLoading = result === null || result.key !== requestKey;
  const outcome = isLoading ? null : result.outcome;

  const backHref = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  const hasActiveFilters = Boolean(urlSearch) || topic !== "all" || difficulty !== "all";

  function clearFilters() {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5">
        <p className="text-sm text-ink/50">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">Học từ vựng</p>
      <h1 className="font-display font-extrabold text-3xl mt-2">Từ vựng</h1>
      <p className="mt-1 text-ink/60">Khám phá các từ tiếng Anh hữu ích theo chủ đề.</p>

      <div className="mt-8">
        <VocabularyFilters
          search={searchInput}
          onSearchChange={setSearchInput}
          topic={topic}
          onTopicChange={(value) => updateParams({ topic: value }, true)}
          difficulty={difficulty}
          onDifficultyChange={(value) => updateParams({ difficulty: value }, true)}
        />
      </div>

      <div className="mt-8">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <VocabularyCardSkeleton key={index} />
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

        {outcome?.status === "success" && outcome.data.content.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3" aria-hidden="true">
              🔍
            </p>
            <p className="font-display font-bold text-lg">Không tìm thấy từ vựng nào.</p>
            <p className="mt-1 text-sm text-ink/60">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 bg-surface border border-ink/10 hover:border-coral-300 font-display font-semibold text-sm px-5 py-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}

        {outcome?.status === "success" && outcome.data.content.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {outcome.data.content.map((item) => (
                <VocabularyCard key={item.id} item={item} backHref={backHref} />
              ))}
            </div>
            <VocabularyPagination
              page={outcome.data.page}
              totalPages={outcome.data.totalPages}
              onPageChange={(nextPage) => updateParams({ page: nextPage })}
            />
          </>
        )}
      </div>
    </div>
  );
}
