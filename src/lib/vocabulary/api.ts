import { apiRequest } from "@/lib/api";
import type { VocabularyItem, VocabularyListParams, VocabularyListResult } from "@/types/vocabulary";

export function listVocabularies(
  params: VocabularyListParams = {},
): Promise<VocabularyListResult> {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.size !== undefined) query.set("size", String(params.size));
  if (params.topic) query.set("topic", params.topic);
  if (params.difficulty) query.set("difficulty", params.difficulty);
  if (params.search) query.set("search", params.search);

  const queryString = query.toString();
  return apiRequest<VocabularyListResult>(
    `/vocabularies${queryString ? `?${queryString}` : ""}`,
    { auth: true },
  );
}

export function getVocabularyById(id: string): Promise<VocabularyItem> {
  return apiRequest<VocabularyItem>(`/vocabularies/${id}`, { auth: true });
}
