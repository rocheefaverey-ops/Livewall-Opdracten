// frontend/app/(pages)/memory/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "./types";
import MemoryCard from "./components/MemoryCard";
import { idText } from "typescript";

//const EMOJIS = ["🐶", "🐱", "🐸", "🦊", "🐻", "🐼", "🐨", "🦁"];
const EMOJIS = ["🐶","🐱","🐸"];

function shuffle(array: Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

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

  return shuffle(cards);
}

export default function MemoryPage() {
  const [cards, setCards] = useState<Card[]>(createDeck());
  const [prevCardId, setPrevCardId] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [turns, setTurns] = useState(0);
  
  
  //const [numMatched, setMatched] = useState(0);
  //const [isWon, setIsWon] = useState(false);
  const numMatched = cards.filter(card => card.isMatched).length / 2;
  const isWon = numMatched === cards.length/2;
  
  //timer states
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval: any;

    if (isActive && !isWon) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // This stops the timer when the component closes or the game ends
    return () => clearInterval(interval);
  }, [isActive, isWon]);
  
  function checkMatch(firstId: number, secondId: number) {
    setTurns(prevTurns => prevTurns + 1);
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard?.pairId === secondCard?.pairId) {
      // MATCH?
      setCards(prev => prev.map(card => 
        (card.id === firstId || card.id === secondId) 
          ? { ...card, isMatched: true } 
          : card
      ));
      setPrevCardId(null);

      //setMatched(prevnumMatched => prevnumMatched + 1);
      //setIsWon(numMatched === cards.length / 2);
    
    } else {
      // NO MATCH?
      setIsLocked(true);
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          (card.id === firstId || card.id === secondId) 
            ? { ...card, isFlipped: false } 
            : card
        ));
        setPrevCardId(null);
        setIsLocked(false);
      }, 500); // 0.5 second delay
    }
  }
  
  
  function flipCard(clickedId: number) {

    // Kan niet clicken tijden animatie.
    if (isLocked) return;
    
    // Start voor de timer
    if(!isActive && !isWon){
      setIsActive(true);
      }

    // Check als card al geclicked is.
    const clickedCard = cards.find((c) => c.id === clickedId);
    if (clickedCard?.isMatched) return;

    // Eerste click op card
    if (prevCardId === null) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === clickedId ? { ...card, isFlipped: true } : card
        )
      );
      setPrevCardId(clickedId);
      return;
    }

    // Niet op dezelfde card clicken
    if (prevCardId === clickedId) return;

    // Tweede card checken if matched or not
    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedId ? { ...card, isFlipped: true } : card
      )
    );
    checkMatch(prevCardId, clickedId);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-gray-600 mb-4">
        {cards.length} kaarten geladen
      </p>
        <p className="text-center text-gray-600 mb-4">
        {turns}
      </p>
      <p className="text-center text-gray-600 mb-4">
        {numMatched} / {cards.length / 2}
      </p>
            <p className="text-center text-gray-600 mb-4">
        {isWon ? "You Won!" : "Keep going"}
      </p>
      
      
      <p> 
        Time: {seconds}
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
