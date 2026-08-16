export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  imageUrl: string;
  exampleSentence: string;
  topic: string;
}

export interface WordAttempt {
  wordId: string;
  correctCount: number;
  wrongCount: number;
  box: number;
}
