"use client";

import { useMemo, useState } from "react";
import type { VocabWord } from "@/types/vocab";
import { createSession, recordAnswer, type VocabSessionState } from "@/lib/vocab/leitner";
import { getQuizOptions } from "@/lib/vocab/quiz";
import TopicIntro from "./TopicIntro";
import Flashcard from "./Flashcard";
import QuizCard from "./QuizCard";
import SessionSummary from "./SessionSummary";

type Phase = "intro" | "flashcard" | "quiz" | "summary";

interface VocabSessionProps {
  topicLabel: string;
  words: VocabWord[];
}

export default function VocabSession({ topicLabel, words }: VocabSessionProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [session, setSession] = useState<VocabSessionState>(() => createSession(words));

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
