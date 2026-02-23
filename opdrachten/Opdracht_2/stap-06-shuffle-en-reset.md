# Stap 6 — Shuffle en nieuw spel

De kaarten staan altijd op dezelfde plek — niet echt een uitdaging. Tijd om dat op te lossen.

## Opdracht 1: Shuffle functie

Schrijf een functie `shuffleDeck` die een array van kaarten accepteert en een **nieuw** geshuffled array teruggeeft.

**Eisen:**
- De originele array mag **niet** gemuteerd worden (maak eerst een kopie)
- Elke mogelijke volgorde moet een gelijke kans hebben
- Return type: `Card[]`

Zoek op: **Fisher-Yates shuffle algorithm**. Dit is het standaard algoritme voor het eerlijk shufflen van een array. Probeer het zelf te implementeren op basis van wat je vindt.

<details>
<summary>💡 Hint: het idee achter Fisher-Yates</summary>

Loop van het laatste element naar het eerste. Bij elke stap:
1. Kies een willekeurige index van 0 tot en met de huidige index
2. Wissel het huidige element met het element op die willekeurige index

```tsx
// Array destructuring swap in JavaScript:
[array[i], array[j]] = [array[j], array[i]];
```
</details>

## Opdracht 2: Shuffle bij het starten

Pas je initiële state aan zodat de kaarten geshuffled beginnen. Je hoeft maar één regel te veranderen.

## Opdracht 3: Nieuw spel knop

Bouw een `startNewGame` functie die:
1. Een nieuw geshuffled deck maakt
2. De omgedraaide kaarten reset
3. De beurten-teller reset

Voeg een "Nieuw spel" knop toe op twee plekken:
- Boven het grid (altijd zichtbaar)
- In het win-bericht (zodat je direct opnieuw kunt spelen)

Style de knoppen zelf met Tailwind. Denk aan: `rounded-full`, `px-6`, `py-2`, `hover:` states, `transition-colors`.

## Testen

- ✅ Kaarten staan in een andere volgorde bij elke page load
- ✅ "Nieuw spel" reset alles en shufflet opnieuw
- ✅ Na winnen kun je direct opnieuw spelen

**Extra uitdaging:**
Voeg een moeilijkheidsgraad-selector toe:

| Level | Paren | Grid |
|-------|-------|------|
| Easy | 6 | 3×4 |
| Medium | 8 | 4×4 |
| Hard | 12 | 4×6 |

Hints:
- Maak `EMOJIS` dynamisch op basis van het gekozen level
- Pas het grid (`grid-cols-*`) aan op basis van het level
- Sla het gekozen level op in state
- Reset het spel als de speler van level wisselt

✅ **Klaar?** Nog één stap voor de finishing touch!
