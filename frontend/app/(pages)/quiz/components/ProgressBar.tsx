import { useState } from "react";
import { Question } from '../types';
import { QuizState } from '../types';

interface ProgressBarProps 
{
  currentQuestionIndex: number;
  totalQuestions: number;
  isFinished: boolean;
}

export default function ProgressBar({ currentQuestionIndex,totalQuestions,isFinished}: ProgressBarProps) 
{
  const percentage = isFinished 
    ? 100 
    : (currentQuestionIndex / totalQuestions) * 100;

    return(
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${percentage}%` }}
    />
  </div>
    
    );

}