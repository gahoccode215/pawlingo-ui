"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getVocabularyErrorMessage, isVocabularyServiceError } from "@/lib/vocabulary/errors";
import { cn } from "@/lib/utils";
import { vocabularyService } from "@/lib/vocabulary/service";
import type {
  DifficultyLevel,
  PartOfSpeech,
  PaginatedResponse,
  VocabularyTopic,
  WordSummaryResponse,
} from "@/types/vocabulary";
import VocabularyCard from "./VocabularyCard";
import VocabularyCardSkeleton from "./VocabularyCardSkeleton";
import VocabularyFilters from "./VocabularyFilters";
import VocabularyPagination from "./VocabularyPagination";

const PAGE_SIZE = 12;
const VALID_DIFFICULTIES: DifficultyLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const VALID_PARTS_OF_SPEECH: PartOfSpeech[] = [
  "NOUN",
  "VERB",
  "ADJECTIVE",
  "ADVERB",
  "PRONOUN",
  "PREPOSITION",
  "CONJUNCTION",
  "INTERJECTION",
  "OTHER",
];

function parseDifficulty(value: string | null): DifficultyLevel | "all" {
  return value && (VALID_DIFFICULTIES as string[]).includes(value) ? (value as DifficultyLevel) : "all";
}

function parsePartOfSpeech(value: string | null): PartOfSpeech | "all" {
  return value && (VALID_PARTS_OF_SPEECH as string[]).includes(value) ? (value as PartOfSpeech) : "all";
}

const VALID_TOPICS: VocabularyTopic[] = ["EDUCATION", "TRAVEL", "HOLIDAY", "WORK", "DAILY_LIFE", "FOOD"];

function parseTopic(value: string | null): VocabularyTopic | "all" {
  return value && (VALID_TOPICS as string[]).includes(value) ? (value as VocabularyTopic) : "all";
}

function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

type Outcome =
  | { status: "success"; data: PaginatedResponse<WordSummaryResponse> }
  | { status: "error"; message: string };

export default function VocabularyBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("q") ?? "";
  const difficultyLevel = parseDifficulty(searchParams.get("difficultyLevel"));
  const partOfSpeech = parsePartOfSpeech(searchParams.get("partOfSpeech"));
  const topic = parseTopic(searchParams.get("topic"));
  const page = parsePage(searchParams.get("page"));

  // Local input mirrors the URL's search value, but is allowed to run ahead
  // of it while the user is typing (before the debounce commits to the URL).
  const [priorUrlSearch, setPriorUrlSearch] = useState(urlSearch);
  const [searchInput, setSearchInput] = useState(urlSearch);
  if (urlSearch !== priorUrlSearch) {
    setPriorUrlSearch(urlSearch);
    setSearchInput(urlSearch);
  }
  const debouncedSearch = useDebouncedValue(searchInput.trim(), 400);

  const updateParams = useCallback(
    (
      next: Partial<{ q: string; difficultyLevel: string; partOfSpeech: string; topic: string; page: number }>,
      resetPage = false,
    ) => {
      const merged = {
        q: urlSearch,
        difficultyLevel,
        partOfSpeech,
        topic,
        page,
        ...next,
        ...(resetPage ? { page: 0 } : {}),
      };

      const params = new URLSearchParams();
      if (merged.q) params.set("q", merged.q);
      if (merged.difficultyLevel !== "all") params.set("difficultyLevel", merged.difficultyLevel);
      if (merged.partOfSpeech !== "all") params.set("partOfSpeech", merged.partOfSpeech);
      if (merged.topic !== "all") params.set("topic", merged.topic);
      if (merged.page) params.set("page", String(merged.page));

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [pathname, router, urlSearch, difficultyLevel, partOfSpeech, topic, page],
  );

  useEffect(() => {
    // Fewer than 2 characters never triggers a search — mirrors the mock
    // service's own 400 for a 1-char query, so the UI never even sends it.
    if (debouncedSearch.length === 1) return;
    if (debouncedSearch !== urlSearch) updateParams({ q: debouncedSearch }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = `${page}|${difficultyLevel}|${partOfSpeech}|${topic}|${urlSearch}|${retryToken}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);

  useEffect(() => {
    let ignore = false;
    const key = `${page}|${difficultyLevel}|${partOfSpeech}|${topic}|${urlSearch}|${retryToken}`;

    vocabularyService
      .listVocabularies({
        page,
        size: PAGE_SIZE,
        difficultyLevel: difficultyLevel === "all" ? undefined : difficultyLevel,
        partOfSpeech: partOfSpeech === "all" ? undefined : partOfSpeech,
        topic: topic === "all" ? undefined : topic,
        q: urlSearch || undefined,
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
  }, [page, difficultyLevel, partOfSpeech, topic, urlSearch, retryToken]);

  const isLoading = result === null || result.key !== requestKey;
  const outcome = isLoading ? null : result.outcome;

  const backHref = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
  const hasActiveFilters =
    Boolean(urlSearch) || difficultyLevel !== "all" || partOfSpeech !== "all" || topic !== "all";

  function clearFilters() {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">Học từ vựng</p>
      <h1 className="font-display font-extrabold text-3xl mt-2">Từ vựng</h1>
      <p className="mt-1 text-ink/60">Khám phá và lưu lại các từ tiếng Anh hữu ích.</p>

      <div className="mt-8">
        <VocabularyFilters
          search={searchInput}
          onSearchChange={setSearchInput}
          difficultyLevel={difficultyLevel}
          onDifficultyLevelChange={(value) => updateParams({ difficultyLevel: value }, true)}
          partOfSpeech={partOfSpeech}
          onPartOfSpeechChange={(value) => updateParams({ partOfSpeech: value }, true)}
          topic={topic}
          onTopicChange={(value) => updateParams({ topic: value }, true)}
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
              className={cn(buttonVariants({ variant: "pop" }), "h-auto mt-5 px-5 py-2.5")}
            >
              Thử lại
            </button>
          </div>
        )}

        {outcome?.status === "success" && outcome.data.data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3" aria-hidden="true">
              🔍
            </p>
            <p className="font-display font-bold text-lg">Không tìm thấy từ vựng nào.</p>
            <p className="mt-1 text-sm text-ink/60">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
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

        {outcome?.status === "success" && outcome.data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {outcome.data.data.map((item) => (
                <VocabularyCard key={item.id} item={item} backHref={backHref} />
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
