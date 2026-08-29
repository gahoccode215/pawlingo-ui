import type { Metadata } from "next";
import { Suspense } from "react";
import MyVocabularyBrowser from "@/components/vocabulary/MyVocabularyBrowser";

export const metadata: Metadata = {
  title: "Từ vựng của tôi — PawLingo",
  description: "Danh sách các từ tiếng Anh bạn đã lưu.",
};

export default function MyVocabulariesPage() {
  return (
    <Suspense fallback={null}>
      <MyVocabularyBrowser />
    </Suspense>
  );
}
