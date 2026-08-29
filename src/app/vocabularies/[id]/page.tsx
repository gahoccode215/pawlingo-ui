import type { Metadata } from "next";
import { Suspense } from "react";
import VocabularyDetail from "@/components/vocabulary/VocabularyDetail";

export const metadata: Metadata = {
  title: "Chi tiết từ vựng — PawLingo",
  description: "Xem chi tiết nghĩa, phát âm và ví dụ của từ vựng.",
};

export default async function VocabularyDetailPage(props: PageProps<"/vocabularies/[id]">) {
  const { id } = await props.params;

  return (
    <Suspense fallback={null}>
      <VocabularyDetail id={id} />
    </Suspense>
  );
}
