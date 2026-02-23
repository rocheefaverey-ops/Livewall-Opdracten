# Stap 1 — Project setup en data

## De route aanmaken

Maak de volgende bestanden aan:

```
frontend/app/(pages)/quiz/page.tsx
frontend/app/(pages)/quiz/layout.tsx
```

## Layout

Begin met een simpele layout voor de quiz pagina's:

```tsx
// frontend/app/(pages)/quiz/layout.tsx

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-teal-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-emerald-800">🎯 Quiz</h1>
      </header>
      <main className="px-4 pb-8">{children}</main>
    </div>
  );
}
```

## De vraag-data

Nu gaan we nadenken over onze data. Elke vraag in de quiz heeft:
- Een **id** (uniek per vraag)
- Een **question** (de vraagtekst)
- Een **options** array (de antwoordmogelijkheden)
- Een **correctAnswer** (index van het juiste antwoord)
- Een **category** (optioneel, voor later)

Maak een nieuw bestand voor je types:

```
frontend/app/(pages)/quiz/types.ts
```

```tsx
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
```

## De quiz data

Maak een bestand met vragen:

```
frontend/app/(pages)/quiz/data.ts
```

```tsx
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
```

> **Let op:** `correctAnswer` is de **index** van het juiste antwoord in de `options` array (0-based).

## De startpagina

Maak nu een eerste versie van je `page.tsx`:

```tsx
// frontend/app/(pages)/quiz/page.tsx
"use client";

import { useState } from "react";
import { QUESTIONS } from "./data";
import { QuizState } from "./types";

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  isFinished: false,
};

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>(initialState);

  const currentQuestion = QUESTIONS[quizState.currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Voortgang */}
        <p className="text-sm text-gray-500 mb-4">
          Vraag {quizState.currentQuestionIndex + 1} van {QUESTIONS.length}
        </p>

        {/* Vraag */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        {/* Antwoorden */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

Ga naar [http://localhost:3000/quiz](http://localhost:3000/quiz) en check dat je de eerste vraag ziet met 4 antwoordopties.

> **Vraag om over na te denken:** Waarom slaan we `answers` op als een array met `null` waarden? Wat is het voordeel hiervan?

> **Tip:** De knoppen doen nog niks — dat komt in stap 3.

✅ **Klaar?** Zie je de eerste vraag met antwoorden? Mooi, door naar stap 2!
