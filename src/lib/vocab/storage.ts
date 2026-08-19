import type { VocabSessionPhase } from "@/types/vocab";
import type { VocabSessionState } from "./leitner";

interface StoredSession {
  phase: VocabSessionPhase;
  session: VocabSessionState;
}

function storageKey(topicId: string): string {
  return `pawlingo:vocab-session:${topicId}`;
}

// Guards against stale storage from a previous word set (e.g. topic content
// changed) so a mismatched session never gets restored.
function matchesWordIds(session: VocabSessionState, wordIds: string[]): boolean {
  const attemptIds = Object.keys(session.attempts);
  return (
    attemptIds.length === wordIds.length && wordIds.every((id) => id in session.attempts)
  );
}

export function loadStoredSession(topicId: string, wordIds: string[]): StoredSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey(topicId));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredSession;
    return matchesWordIds(parsed.session, wordIds) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveStoredSession(topicId: string, stored: StoredSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(topicId), JSON.stringify(stored));
}

export function clearStoredSession(topicId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(topicId));
}
