
"use client"

import { useState } from "react";
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
  isFinished: boolean;
  showFeedback: boolean;
}


export default function QuestionCard({ question, questionNumber, totalQuestions, selectedAnswer, onSelectAnswer,isFinished,showFeedback}: QuestionCardProps) 
{
    const hasAnswered = selectedAnswer !== null;
    
    return(
      <div key = {questionNumber} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Voortgang */}
              <p className="text-sm text-gray-500 mb-4">
              Vraag {questionNumber} van {totalQuestions}
              </p>

              {/* Vraag */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {question.question}
              </h2>

              {/* Antwoorden */}
              <div className="space-y-3">
              {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              
              let buttonClasses = "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
              
              if (showFeedback) {
              // 1. Als we de feedback tonen (na klik op Next/Check)
              if (isCorrect) {
                // Het juiste antwoord (altijd groen)
                buttonClasses = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm";
              } else if (isSelected && !isCorrect) {
                // Fout gekozen antwoord (rood)
                buttonClasses = "border-red-500 bg-red-50 text-red-700";
              } else {
                // Niet gekozen en niet goed (grey out)
                buttonClasses = "border-gray-100 text-gray-400 opacity-50 grayscale";
              }
              } else if (isSelected) {
              // 2. Feedback staat nog UIT, maar dit is wel de huidige selectie
              buttonClasses = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200";
              }
              return(
                      <button
                      key={index}
                      onClick={() => !showFeedback && onSelectAnswer(index)}
                      disabled ={showFeedback}
                      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                      className={`animate-shrink-in opacity-0 w-full text-left p-4 rounded-xl border-2 transition-all ${buttonClasses}`}
    >
                      {option}
                      </button>
                    );
              })}
              </div>
          </div>
      </div>
    );




}