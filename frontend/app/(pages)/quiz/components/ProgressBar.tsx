import { useState } from "react";
import { Question } from '../types';
import { QuizState } from '../types';

interface ProgressBarProps 
{
  currentQuestionIndex: number;
  totalQuestions: number;
  isFinished: boolean;
}

export default function ProgressBar({ currentQuestionIndex, totalQuestions, isFinished }:ProgressBarProps) {
  // Bereken het percentage
  const percentage = isFinished 
    ? 100 
    : (currentQuestionIndex / totalQuestions) * 100;

  return (
    /* De container matcht nu precies met de QuestionCard */
    <div className="max-w-2xl mx-auto mb-6 px-4 md:px-0">
      
      {/*De achtergrond van de balk */}
      <div className="relative w-full bg-gray-100 rounded-xl h-7 shadow-inner border border-gray-200 overflow-hidden">
        
        {/* De gevulde balk (Emerald) */}
        <div
          className="bg-emerald-500 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          style={{ width: `${percentage}%` }}
        />

        {/* De tekst IN de balk */}
        {/* 'absolute inset-0' zorgt ervoor dat dit laagje over de hele balk ligt */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${percentage > 50 ? 'text-white' : 'text-emerald-700'}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}