import type { Metadata } from "next";
import TopicPicker from "@/components/vocab/TopicPicker";
import { getTopics } from "@/lib/vocab/topics";

export const metadata: Metadata = {
  title: "Học — PawLingo",
  description: "Chọn một chủ đề từ vựng để luyện tập với flashcard và câu hỏi nhanh.",
};

export default function LearnPage() {
  return <TopicPicker topics={getTopics()} />;
}
