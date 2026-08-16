import type { VocabWord } from "@/types/vocab";

const OPTION_COUNT = 4;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Distractors are random words from the same topic set, shuffled alongside
// the correct answer so its position in the option list isn't predictable.
export function getQuizOptions(word: VocabWord, topicWords: VocabWord[]): VocabWord[] {
  const distractors = shuffle(
    topicWords.filter((candidate) => candidate.id !== word.id)
  ).slice(0, OPTION_COUNT - 1);

  return shuffle([word, ...distractors]);
}
