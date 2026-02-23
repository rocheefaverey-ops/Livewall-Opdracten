// frontend/app/(pages)/quiz/page.tsx
"use client";

import { useState, useEffect } from "react";
import { QUESTIONS } from "./data";
import { QuizState } from "./types";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import { set } from "lodash";

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  isFinished: false,
};
  
  


export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>(initialState);
  const [showFeedBack, setShowFeedback] = useState(false);
  const getDots = (s: number) => {
    if (s <= 0) return "● ○ ○ ○ ○";
    if (s <= 1) return "● ● ○ ○ ○";
    if (s <= 2) return "● ● ● ○ ○";
    if (s <= 3) return "● ● ● ● ○";
    return "● ● ● ● ●";
  };
  

  const currentQuestion = QUESTIONS[quizState.currentQuestionIndex];
  
  const handleSelectAnswer = (selectedIndex: number) => {
    console.log(selectedIndex);
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = selectedIndex;

    setQuizState({ ...quizState, answers: newAnswers });
  };
  const next = () => 
    {
      const nextIndex = quizState.currentQuestionIndex + 1;
      const hasSelectedAnswer = quizState.answers[quizState.currentQuestionIndex] !== null;
      
      if (!hasSelectedAnswer) {
              console.log("No answer selected");
              return;
          }
      
      setShowFeedback(true);
      
      const timeout = setTimeout(() => {
                if (nextIndex < QUESTIONS.length && hasSelectedAnswer ) {
        setQuizState({
          ...quizState,
          currentQuestionIndex: nextIndex,})
          setShowFeedback(false);
        }
        else if (nextIndex === QUESTIONS.length && hasSelectedAnswer){
          setQuizState({
            ...quizState,
            isFinished: true,
          })
        }
        }, 1500);
        return () => clearTimeout(timeout);
    };

  return (
    
    <div>
                <h2 className="flex justify-center mt-8">
                  {
                    getDots(quizState.currentQuestionIndex)
                  }
            </h2>
      <div className="mt-6">
        <ProgressBar
        currentQuestionIndex={quizState.currentQuestionIndex}
        totalQuestions={QUESTIONS.length}
        isFinished={quizState.isFinished}
        />
      </div>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <QuestionCard 
          question={currentQuestion}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={QUESTIONS.length}
          selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
          onSelectAnswer={handleSelectAnswer}
          isFinished={quizState.isFinished}
          showFeedback = {showFeedBack}
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={next}
          // De knop staat uit als er geen antwoord is of als de timer loopt
          disabled={showFeedBack || quizState.answers[quizState.currentQuestionIndex] === null}
          className={`
            px-10 py-4 rounded-xl font-bold text-lg transition-all
            ${(showFeedBack || quizState.answers[quizState.currentQuestionIndex] === null)
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" // Uit-stand
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md" // Aan-stand
            }
          `}
        >
          {showFeedBack ? "Checken..." : "Volgende vraag"}
        </button>
      </div>
    </div>
    
  );
}