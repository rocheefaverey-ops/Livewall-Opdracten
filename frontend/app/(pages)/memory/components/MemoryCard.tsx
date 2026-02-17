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
    // 1. THE PERSPECTIVE CONTAINER
    className="group aspect-square [perspective:1000px] bg-transparent border-none p-0"
  >
    {/* 2. THE INNER CARD (This handles the rotation) */}
    <div
      className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] 
        ${card.isFlipped ? "[transform:rotateY(180deg)]" : ""}
      `}
    >
      
      {/* 3. FRONT SIDE (The "❓" - Hidden when flipped) */}
      <div className={`absolute inset-0 backface-hidden flex items-center justify-center text-3xl rounded-xl shadow bg-indigo-600 text-white [backface-visibility:hidden] 
        ${card.isMatched ? "opacity-50" : ""}
      `}>
        ❓
      </div>

      {/* 4. BACK SIDE (The Emoji - Shown when flipped) */}
      <div className={`absolute inset-0 flex items-center justify-center text-3xl rounded-xl shadow bg-white border-2 [transform:rotateY(180deg)] [backface-visibility:hidden]
        ${card.isMatched ? "animate-pulse border-green-500 ring-4 ring-green-100" : "border-gray-200"}
      `}>
        {card.emoji}
      </div>

    </div>
  </button>
);
}