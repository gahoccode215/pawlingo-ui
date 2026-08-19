"use client";

import { useEffect, useMemo, useState } from "react";
import type { VocabSessionPhase, VocabWord } from "@/types/vocab";
import { createSession, recordAnswer, type VocabSessionState } from "@/lib/vocab/leitner";
import { getQuizOptions } from "@/lib/vocab/quiz";
import { clearStoredSession, loadStoredSession, saveStoredSession } from "@/lib/vocab/storage";
import TopicIntro from "./TopicIntro";
import Flashcard from "./Flashcard";
import QuizCard from "./QuizCard";
import SessionSummary from "./SessionSummary";

interface VocabSessionProps {
  topicId: string;
  topicLabel: string;
  words: VocabWord[];
}

export default function VocabSession({ topicId, topicLabel, words }: VocabSessionProps) {
  const wordIds = useMemo(() => words.map((word) => word.id), [words]);

  const [phase, setPhase] = useState<VocabSessionPhase>(
    () => loadStoredSession(topicId, wordIds)?.phase ?? "intro"
  );
  const [session, setSession] = useState<VocabSessionState>(
    () => loadStoredSession(topicId, wordIds)?.session ?? createSession(words)
  );

  // Persist so an in-progress session survives a page reload; a fresh
  // "intro" phase means there's nothing worth restoring, so clear instead.
  useEffect(() => {
    if (phase === "intro") {
      clearStoredSession(topicId);
      return;
    }
    saveStoredSession(topicId, { phase, session });
  }, [topicId, phase, session]);

  const wordsById = useMemo(() => {
    const map = new Map<string, VocabWord>();
    words.forEach((word) => map.set(word.id, word));
    return map;
  }, [words]);

  const currentWordId = session.queue[0] as string | undefined;
  const currentWord = currentWordId ? wordsById.get(currentWordId) : undefined;

  const quizOptions = useMemo(() => {
    if (!currentWord) return [];
    return getQuizOptions(currentWord, words);
  }, [currentWord, words]);

  const masteredCount = words.length - new Set(session.queue).size;

  function handleStart() {
    setSession(createSession(words));
    setPhase("flashcard");
  }

  function handleFlashcardContinue() {
    setPhase("quiz");
  }

  function handleAnswer(isCorrect: boolean) {
    if (!currentWordId) return;
    const nextSession = recordAnswer(session, currentWordId, isCorrect);
    setSession(nextSession);
    setPhase(nextSession.queue.length === 0 ? "summary" : "flashcard");
  }

  function handleRestart() {
    setSession(createSession(words));
    setPhase("intro");
  }

  if (phase === "intro") {
    return (
      <TopicIntro topicLabel={topicLabel} wordCount={words.length} onStart={handleStart} />
    );
  }

  if (phase === "flashcard" && currentWord) {
    return (
      <Flashcard
        word={currentWord}
        masteredCount={masteredCount}
        totalWords={words.length}
        onContinue={handleFlashcardContinue}
      />
    );
  }

  if (phase === "quiz" && currentWord) {
    return (
      <QuizCard
        word={currentWord}
        options={quizOptions}
        masteredCount={masteredCount}
        totalWords={words.length}
        onAnswer={handleAnswer}
      />
    );
  }

  return <SessionSummary words={words} attempts={session.attempts} onRestart={handleRestart} />;
}
