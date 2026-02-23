// frontend/app/(pages)/quiz/types.ts

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];  // gekozen antwoord per vraag (null = niet beantwoord)
  isFinished: boolean;
}