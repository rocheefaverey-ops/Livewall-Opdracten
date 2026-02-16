// frontend/app/(pages)/memory/page.tsx
"use client";

import { useState } from "react";
import { Card } from "./types";
import MemoryCard from "./components/MemoryCard";
import { idText } from "typescript";

const EMOJIS = ["🐶", "🐱", "🐸", "🦊", "🐻", "🐼", "🐨", "🦁"];

function createDeck(): Card[] {
  const cards: Card[] = [];

  EMOJIS.forEach((emoji, index) => {
    // Elk emoji komt 2x voor (een paar)
    cards.push({
      id: index * 2,
      emoji,
      pairId: index,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: index * 2 + 1,
      emoji,
      pairId: index,
      isFlipped: false,
      isMatched: false,
    });
  });

  return cards;
}

export default function MemoryPage() {
  const [cards, setCards] = useState<Card[]>(createDeck());
  const [prevCardId, setPrevCardId] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  
  
  
  function checkMatch(firstId: number, secondId: number) {
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard?.pairId === secondCard?.pairId) {
      // MATCH!
      setCards(prev => prev.map(card => 
        (card.id === firstId || card.id === secondId) 
          ? { ...card, isMatched: true } 
          : card
      ));
      setPrevCardId(null);
    } else {
      // NO MATCH: Flip them back after a delay
      setIsLocked(true);
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          (card.id === firstId || card.id === secondId) 
            ? { ...card, isFlipped: false } 
            : card
        ));
        setPrevCardId(null);
        setIsLocked(false);
      }, 1000); // 1 second delay
    }
  }
  
  
  function flipCard(clickedid: number)
  {
    setCards(prev => prev.map((card) =>
      {
        if (card.id === clickedid) 
          {
          return { ...card, isFlipped: !card.isFlipped };
          }
        if (prevCardId === null){
          setPrevCardId(clickedid);
          return card;
        }else {
      
        if (prevCardId === clickedid) return;
      
        checkMatch(prevCardId, clickedid);
      }
        
          return card;
      }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-gray-600 mb-4">
        {cards.length} kaarten geladen
      </p>

      {/* Hier komt straks het grid */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={(cardID) => flipCard(cardID)}
        />
        ))}
      </div>
    </div>
  );
}