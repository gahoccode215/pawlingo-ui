import type { Metadata } from "next";
import { Suspense } from "react";
import VocabularyBrowser from "@/components/vocabulary/VocabularyBrowser";

export const metadata: Metadata = {
  title: "Từ vựng — PawLingo",
  description: "Khám phá và lưu lại các từ tiếng Anh hữu ích.",
};

export default function VocabulariesPage() {
  return (
    <Suspense fallback={null}>
      <VocabularyBrowser />
    </Suspense>
  );
}
