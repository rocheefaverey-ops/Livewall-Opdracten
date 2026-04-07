// frontend/app/(pages)/quiz/page.tsx
"use client";

import { useState, useEffect } from "react";
import { QUESTIONS } from "./data";
import { QuizState } from "./types";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import Leaderboard from "./components/Leaderboard";

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  isFinished: false,
};
  
  


export default function QuizPage() {
  let sec = 15;
  const [quizState, setQuizState] = useState<QuizState>(initialState);
  const [showFeedBack, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(sec);
  const [isActive, setIsActive] = useState(false);
  const isFinished = quizState.isFinished;

  const getDots = (s: number) => {
    if (s <= 0) return "● ○ ○ ○ ○";
    if (s <= 1) return "● ● ○ ○ ○";
    if (s <= 2) return "● ● ● ○ ○";
    if (s <= 3) return "● ● ● ● ○";
    return "● ● ● ● ●";
  };

  const isLastQuestion = quizState.currentQuestionIndex + 1 === QUESTIONS.length; 
  const currentQuestion = QUESTIONS[quizState.currentQuestionIndex];
  
  
  const handleSelectAnswer = (selectedIndex: number) => {
    console.log(selectedIndex);
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = selectedIndex;
    setQuizState({ ...quizState, answers: newAnswers });
  };

  //timer starts instantly 
  useEffect(() => {
    setIsActive(true);
  }, []);
  
  useEffect(() => {
  if (isFinished){
    return;
  }
  let interval: any;
  console.log(seconds);
  //Als tijd Op is next question
  if (seconds === 0 && !showFeedBack){
    next() //Overgang naar next met timer goed
    return;
  }
  //Timer down dus het aftellen
  if (isActive &&!showFeedBack&& seconds > 0) {
    interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
  }, [isActive,seconds,showFeedBack]);
  
  //Next button
  const next = () => 
    {
      const nextIndex = quizState.currentQuestionIndex + 1;
      const hasSelectedAnswer = quizState.answers[quizState.currentQuestionIndex] !== null;
      const isLastQuestion = nextIndex === QUESTIONS.length ;
      //Timer reset
      setSeconds(sec);

      //Als quiz klaar is restart logic
      if(quizState.isFinished){
        setQuizState(initialState);
        setShowFeedback(false);
        setScore(0);
        setIsActive(true);
        return;
      }
      const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
      if (currentAnswer === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }

      if(isLastQuestion){
        setQuizState({
          ...quizState,
          isFinished: true,
        });
        setIsActive(false)
        console.log("Quiz finished!Naar leaderboard.");
      }else{
      setShowFeedback(true);
      setIsActive(false);

      const timeout = setTimeout(() => {
            setQuizState(prev => ({
              ...prev,
              currentQuestionIndex: nextIndex,
            }));
            setShowFeedback(false);
            setSeconds(sec); // Reset tijd voor de nieuwe vraag
            setIsActive(true); // Start timer weer
          }, 1500);

        return () => clearTimeout(timeout);
      }
    };

    let buttonText = "Next";

    if (quizState.isFinished) {
      buttonText = "Restart";
    }else if (showFeedBack) {
      buttonText = "Checken...";
    }else if (isLastQuestion){
      buttonText = "Submit";
    }

  return (
    
    <div>
                
        {/* Time Card */}
      <div className="mx-auto max-w-2xl bg-white px-4 py-2 rounded-2xl shadow-sm border border-indigo-50 text-center min-w-[100px]">
        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Time</p>
        <p className="text-2xl font-black text-emerald-600">{seconds}s</p>
      </div>
                
      <div className="mt-6">
        <ProgressBar
        currentQuestionIndex={quizState.currentQuestionIndex}
        totalQuestions={QUESTIONS.length}
        isFinished={quizState.isFinished}
        />
      </div>
            <h2 className="flex justify-center mt-8">
          {
      <div className="flex justify-center gap-3 mt-4">
        {QUESTIONS.map((q, i) => {
          const isActive = i === quizState.currentQuestionIndex && !quizState.isFinished;
          const isCorrect = quizState.answers[i] === q.correctAnswer;

          return (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isActive ? "bg-indigo-500 scale-150 shadow-sm" : 
                isCorrect ? "bg-emerald-500" : 
                i < quizState.currentQuestionIndex || quizState.isFinished ? "bg-red-500" : "bg-gray-300"
              }`}
            />
          );
        })}
      </div>
          }
      </h2>
      
      <div className="max-w-2xl mx-auto py-10 px-4">
        {!quizState.isFinished ?(
        <QuestionCard
          question={currentQuestion}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={QUESTIONS.length}
          selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
          onSelectAnswer={handleSelectAnswer}
          isFinished={quizState.isFinished}
          showFeedback = {showFeedBack}
      />)
      :
      (
            /* --- HIER HET LEADERBOARD (Als hij WEL klaar is) --- */
      <Leaderboard 
      score={score} 
      totalQuestions={QUESTIONS.length} 
      />
      )}
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
              : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-md" // Aan-stand
            }
          `}
        >
          {buttonText}        
        </button>
      </div>
    </div>
    
  );
}