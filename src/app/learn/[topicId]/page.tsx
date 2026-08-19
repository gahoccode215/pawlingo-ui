import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VocabSession from "@/components/vocab/VocabSession";
import { getTopicById } from "@/lib/vocab/topics";

export async function generateMetadata(
  props: PageProps<"/learn/[topicId]">
): Promise<Metadata> {
  const { topicId } = await props.params;
  const topic = getTopicById(topicId);

  return {
    title: topic ? `${topic.label} — PawLingo` : "Học — PawLingo",
    description: "Luyện từ vựng với flashcard và một câu hỏi nhanh sau mỗi từ.",
  };
}

export default async function LearnTopicPage(props: PageProps<"/learn/[topicId]">) {
  const { topicId } = await props.params;
  const topic = getTopicById(topicId);

  if (!topic) notFound();

  return (
    <VocabSession key={topic.id} topicId={topic.id} topicLabel={topic.label} words={topic.words} />
  );
}
