import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VocabularyDetail from "@/components/vocabulary/VocabularyDetail";

export const metadata: Metadata = {
  title: "Chi tiết từ vựng — PawLingo",
  description: "Xem chi tiết nghĩa, định nghĩa và ví dụ của từ vựng.",
};

export default async function VocabularyDetailPage(props: PageProps<"/vocabulary/[id]">) {
  const { id } = await props.params;

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <VocabularyDetail id={id} />
      </Suspense>
      <Footer />
    </>
  );
}
