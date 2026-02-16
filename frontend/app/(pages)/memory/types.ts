// frontend/app/(pages)/memory/types.ts

export interface Card {
  id: number;
  emoji: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}