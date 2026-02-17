// frontend/app/(pages)/memory/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "./types";
import MemoryCard from "./components/MemoryCard";
import { idText } from "typescript";

const EASY = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"]; //easy
const MEDIUM = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];//Medium
const HARD = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐷"]; //Hard

function shuffle(array: Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}


function createDeck(emojiSet: string[]): Card[] {
  const cards: Card[] = [];

  emojiSet.forEach((emoji, index) => {
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
  const [cards, setCards] = useState<Card[]>(createDeck(EASY));
  const [prevCardId, setPrevCardId] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [turns, setTurns] = useState(0);
  
  const handleDifficulty = (emojiSet: string[]) => {
  setCards(createDeck(emojiSet)); // Create a new board with the chosen set
  setTurns(0);                   // Reset the moves
  setSeconds(0);                 // Reset the clock
  setIsActive(false);            // Stop the timer
  };

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
  
  
  const resetGame = () => {
  setCards(createDeck(EASY)); 
  
  setTurns(0);
  setSeconds(0);
  
  setPrevCardId(null);
  setIsActive(false); // This stops the timer
  setIsLocked(false);  // In case the board was locked during a match check
  };

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
    // diffuclty selector
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-4 mb-10 justify-center">
        <button 
          onClick={() => handleDifficulty(EASY)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
        >
          Makkelijk (12 kaarten)
        </button>

        <button 
          onClick={() => handleDifficulty(MEDIUM)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors"
        >
          Gemiddeld (16 kaarten)
        </button>

        <button 
          onClick={() => handleDifficulty(HARD)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
        >
          Moeilijk (24 kaarten)
        </button>
      </div>
      
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
      {/* Reset Button*/}
      <button
        onClick={resetGame}
        className="mb-10 mx-auto block bg-indigo-600 text-white py-3 px-10 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
      >
        Restart Game
      </button>
    
      {/* WIN OVERLAY */}
      {isWon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 transform animate-in zoom-in duration-300">
            {/* Score Performance Steren*/}
            <h2 className="text-4xl mb-2">
                  {turns <= 10 
                  ? "⭐⭐⭐" 
                  : turns <= 18 
                  ? "⭐⭐" 
                  : "⭐"
                }
            </h2>
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              {turns <= 10 
                  ? "Perfecte score!" 
                  : turns <= 18 
                  ? "Netjes hoor! " 
                  : "Goed geprobeerd! "
                }
            </h2>
            <p className="text-gray-600 mb-6">
              Alle paren gevonden in <span className="font-bold text-indigo-600">{turns}</span> beurten!
            </p>
            {/* Reset Button Overlay*/}
            <button 
              onClick={resetGame}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Hier komt straks het grid */}
      <div className={`grid gap-3 ${cards.length > 16 ? 'grid-cols-6' : 'grid-cols-4'}`}>
        {cards.map((card) => (
          <MemoryCard key={card.id} card={card} onClick={flipCard} />
        ))}
      </div>
    </div>
  );
}
