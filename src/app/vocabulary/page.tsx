import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VocabularyBrowser from "@/components/vocabulary/VocabularyBrowser";

export const metadata: Metadata = {
  title: "Từ vựng — PawLingo",
  description: "Khám phá các từ tiếng Anh hữu ích theo chủ đề.",
};

export default function VocabularyPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <VocabularyBrowser />
      </Suspense>
      <Footer />
    </>
  );
}
