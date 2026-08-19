import type { Metadata } from "next";
import TopicPicker from "@/components/vocab/TopicPicker";
import { getTopics } from "@/lib/vocab/topics";

export const metadata: Metadata = {
  title: "Learn — PawLingo",
  description: "Pick a vocabulary topic to practice with flashcards and a quick quiz.",
};

export default function LearnPage() {
  return <TopicPicker topics={getTopics()} />;
}
