import type { Metadata } from "next";
import VocabSession from "@/components/vocab/VocabSession";
import { ANIMALS_TOPIC_LABEL, animalsWords } from "@/data/vocab/animals";

export const metadata: Metadata = {
  title: "Learn — PawLingo",
  description: "Practice vocabulary with flashcards and a quick quiz after each word.",
};

export default function LearnPage() {
  return <VocabSession topicLabel={ANIMALS_TOPIC_LABEL} words={animalsWords} />;
}
