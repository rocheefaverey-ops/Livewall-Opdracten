// frontend/app/(pages)/memory/page.tsx
"use client";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
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
  const [showOverlay, setShowOverlay] = useState(false);
  
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
    return () => clearInterval(interval);
  }, [isActive, isWon]);

  useEffect(() => {
  if (isWon) {
    new Audio("/Victorysound.mp3").play();
    setTimeout(() => setShowOverlay(true), 1000); // 1 second delay
  } else {
    setShowOverlay(false);
  }
  }, [isWon]);
    
  
  
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
      new Audio("/Flipsound.mp3").play();
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
    new Audio("/Flipsound.mp3").play();
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
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {/* Turns Card */}
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-indigo-50 text-center min-w-[100px]">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Moves</p>
          <p className="text-2xl font-black text-indigo-600">{turns}</p>
        </div>

        {/* Time Card */}
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-indigo-50 text-center min-w-[100px]">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Time</p>
            <p className="text-2xl font-black text-indigo-600">{seconds}s</p>
          </div>

        {/* Progress Card */}
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-indigo-50 text-center min-w-[100px]">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Matches</p>
            <p className="text-2xl font-black text-indigo-600">{numMatched} / {cards.length / 2}</p>
          </div>

        {/* Status Badge */}
          <div className={`px-6 py-2 rounded-2xl flex items-center shadow-sm font-bold transition-all ${
            isWon ? "bg-green-500 text-white animate-bounce" : "bg-indigo-50 text-indigo-400"
          }`}>
            {isWon ? "🏆 Winner!" : "Keep going!"}
          </div>
        </div>

      {/* Reset Button*/}
        <button
          onClick={resetGame}
          className="group relative mb-8 mx-auto flex items-center gap-2 bg-indigo-600 px-8 py-4 rounded-2xl font-black text-white transition-all duration-150 [transform-style:preserve-3d] active:translate-y-1 active:[transform:rotateX(20deg)] shadow-[0_8px_0_0_#4338ca] active:shadow-none"
        >
          <span className="text-xl">↺</span>
          RESTART GAME
        </button>
        
      {/* Difficulty Selector */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit mx-auto mb-10 shadow-inner">
          <button 
            onClick={() => handleDifficulty(EASY)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              cards.length === 12 
                ? "bg-white text-green-600 shadow-sm scale-100" 
                : "text-gray-500 hover:text-gray-700 scale-95"
            }`}
          >
            🌱 Easy
          </button>

          <button 
            onClick={() => handleDifficulty(MEDIUM)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              cards.length === 16 
                ? "bg-white text-yellow-600 shadow-sm scale-100" 
                : "text-gray-500 hover:text-gray-700 scale-95"
            }`}
          >
            ⚡ Medium
          </button>

          <button 
            onClick={() => handleDifficulty(HARD)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              cards.length === 24 
                ? "bg-white text-red-600 shadow-sm scale-100" 
                : "text-gray-500 hover:text-gray-700 scale-95"
            }`}
          >
            🔥 Hard
          </button>
        </div>

      {/* WIN OVERLAY */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="slide-in-from-bottom-10 bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 transform animate-in zoom-in duration-300">
            {/* Score Performance Steren*/}
            <h2 className="animate-bounce text-4xl mb-2">
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
      <div className={`grid gap-3 mx-auto ${cards.length === 12 ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {cards.map((card) => (
          <MemoryCard 
          key={card.id} 
          card={card} 
          onClick={flipCard} 
          />
        ))}
      </div>
    </div>
  );
}
