# Stap 1 — Project setup en data

## De route aanmaken

Maak de volgende bestanden aan:

```
frontend/app/(pages)/memory/page.tsx
frontend/app/(pages)/memory/layout.tsx
```

## Layout

Begin met een simpele layout voor de memory pagina's:

```tsx
// frontend/app/(pages)/memory/layout.tsx

export default function MemoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-indigo-800">🧠 Memory</h1>
      </header>
      <main className="px-4 pb-8">{children}</main>
    </div>
  );
}
```

## De kaart-data

Nu gaan we nadenken over onze data. Elk kaartje in memory heeft:
- Een **id** (uniek per kaart)
- Een **emoji** (het plaatje — elk plaatje komt 2x voor)
- Een **pairId** (welk paar hoort het bij)
- Een **isFlipped** status (is de kaart omgedraaid?)
- Een **isMatched** status (is het paar gevonden?)

Maak een nieuw bestand voor je types:

```
frontend/app/(pages)/memory/types.ts
```

```tsx
// frontend/app/(pages)/memory/types.ts

export interface Card {
  id: number;
  emoji: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}
```

## De startpagina

Maak nu een eerste versie van je `page.tsx`:

```tsx
// frontend/app/(pages)/memory/page.tsx
"use client";

import { useState } from "react";
import { Card } from "./types";

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

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-gray-600 mb-4">
        {cards.length} kaarten geladen
      </p>

      {/* Hier komt straks het grid */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="aspect-square bg-white rounded-xl shadow flex items-center justify-center text-3xl"
          >
            {card.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
```

Ga naar [http://localhost:3000/memory](http://localhost:3000/memory) en check dat je 16 kaarten ziet met emoji's.

> **Vraag om over na te denken:** Waarom gebruiken we `"use client"` hier? (Hint: we gaan straks `useState` nodig hebben voor de game state)

> **Tip:** De emoji's staan nu nog zichtbaar — dat is prima voor nu. In de volgende stap gaan we ze verbergen.

✅ **Klaar?** Zie je 16 emoji kaarten in een grid? Mooi, door naar stap 2!
