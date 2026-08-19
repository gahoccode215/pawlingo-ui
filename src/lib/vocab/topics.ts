import type { Topic } from "@/types/vocab";
import { animalsTopic } from "@/data/vocab/animals";
import { foodTopic } from "@/data/vocab/food";

// Mock data source for MVP UI testing. Once the Spring Boot backend exists,
// swap the bodies of these functions for calls through src/lib/api.ts (e.g.
// GET /vocab/topics, GET /vocab/topics/:id) — signatures stay the same so
// callers (pages/components) don't need to change.
const MOCK_TOPICS: Topic[] = [animalsTopic, foodTopic];

export function getTopics(): Topic[] {
  return MOCK_TOPICS;
}

export function getTopicById(topicId: string): Topic | undefined {
  return MOCK_TOPICS.find((topic) => topic.id === topicId);
}
