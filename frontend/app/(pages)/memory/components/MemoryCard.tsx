"use client";

import { Card } from '../types';

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
  
 
}

export default function MemoryCard({ card, onClick ,}: MemoryCardProps) {
  const isVisible= card.isFlipped || card.isMatched;


  return (
    <button
      key={card.id}
      onClick={() => !isVisible && onClick(card.id)}
      aria-label={`Memory card. ${isVisible ? `Showing ${card.emoji}` : 'Hidden'}. ${card.isMatched ? 'Matched.' : ''}`}
      
      className={`
        aspect-square rounded-xl shadow flex items-center justify-center text-3xl 
        transition-all duration-300 transform active:scale-95
        ${card.isFlipped 
          ? "bg-white border-2 border-transparent" 
          : "bg-indigo-600 text-white hover:bg-indigo-500"}
        ${card.isMatched ? "border-green-500 ring-4 ring-green-100" : ""}
      `}
    >
      {isVisible ? card.emoji : "❓"}
    </button>
  );
}