import type { Metadata } from "next";
import { Suspense } from "react";
import VocabularyLearn from "@/components/vocabulary/VocabularyLearn";

export const metadata: Metadata = {
  title: "Học từ mới — PawLingo",
  description: "Học từ vựng mới qua flashcard và câu hỏi trắc nghiệm.",
};

export default function VocabularyLearnPage() {
  return (
    <Suspense fallback={null}>
      <VocabularyLearn />
    </Suspense>
  );
}
