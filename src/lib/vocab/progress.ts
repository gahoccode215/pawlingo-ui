import type { Topic } from "@/types/vocab";
import { loadStoredSession } from "./storage";

export interface TopicProgress {
  masteredCount: number;
  totalCount: number;
}

// Client-side only, no backend Progress API yet — reads the same per-topic
// Leitner session data VocabSession persists to localStorage.
export function getTopicProgress(topic: Topic): TopicProgress {
  const wordIds = topic.words.map((word) => word.id);
  const stored = loadStoredSession(topic.id, wordIds);
  const masteredCount = stored ? topic.words.length - new Set(stored.session.queue).size : 0;

  return { masteredCount, totalCount: topic.words.length };
}
