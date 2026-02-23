// frontend/app/(pages)/quiz/data.ts

import { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Wat is de hoofdstad van Nederland?",
    options: ["Rotterdam", "Amsterdam", "Den Haag", "Utrecht"],
    correctAnswer: 1,
    category: "Aardrijkskunde",
  },
  {
    id: 2,
    question: "Hoeveel planeten heeft ons zonnestelsel?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    category: "Wetenschap",
  },
  {
    id: 3,
    question: "Welk jaar begon de Tweede Wereldoorlog?",
    options: ["1935", "1939", "1941", "1945"],
    correctAnswer: 1,
    category: "Geschiedenis",
  },
  {
    id: 4,
    question: "Wat is de chemische formule voor water?",
    options: ["CO2", "H2O", "NaCl", "O2"],
    correctAnswer: 1,
    category: "Wetenschap",
  },
  {
    id: 5,
    question: "Wie schilderde de Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Rembrandt"],
    correctAnswer: 2,
    category: "Kunst",
  },
];