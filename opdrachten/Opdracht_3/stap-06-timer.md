# Stap 6 — Timer toevoegen

Een quiz zonder tijdsdruk is wel erg relaxed. Laten we een timer toevoegen!

## Twee soorten timers

Je kunt kiezen (of beide implementeren):

| Type | Beschrijving |
|------|--------------|
| **Per vraag** | Elke vraag heeft een tijdslimiet (bijv. 15 sec) |
| **Totale tijd** | De hele quiz heeft een tijdslimiet |

We beginnen met een timer per vraag — die is uitdagender om te bouwen.

## Opdracht 1: Timer state

Voeg timer state toe aan je quiz:

```tsx
const [timeLeft, setTimeLeft] = useState<number>(15); // 15 seconden per vraag
```

## Opdracht 2: useEffect voor de countdown

Gebruik `useEffect` met `setInterval` om de timer te laten aftellen.

**Belangrijk:** Je moet de interval opruimen (cleanup) wanneer:
- De component unmount
- De vraag verandert
- De tijd op is

<details>
<summary>💡 Hint: timer met useEffect</summary>

```tsx
useEffect(() => {
  // Reset timer bij nieuwe vraag
  setTimeLeft(15);

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  // Cleanup functie
  return () => clearInterval(timer);
}, [quizState.currentQuestionIndex]);
```
</details>

## Opdracht 3: Tijd op = automatisch door

Als de tijd op is en er is geen antwoord gegeven:
- Markeer de vraag als "niet beantwoord" (of automatisch fout)
- Ga automatisch naar de volgende vraag

<details>
<summary>💡 Hint: tijd op afhandelen</summary>

```tsx
useEffect(() => {
  if (timeLeft === 0 && quizState.answers[quizState.currentQuestionIndex] === null) {
    // Optie 1: Markeer als niet beantwoord en ga door
    handleNextQuestion();
    
    // Optie 2: Markeer als fout antwoord (-1 of een speciale waarde)
    // handleSelectAnswer(-1);
  }
}, [timeLeft]);
```
</details>

## Opdracht 4: Timer component

Maak een visueel aantrekkelijke timer:

```
frontend/app/(pages)/quiz/components/Timer.tsx
```

**Props:**
- `timeLeft` — resterende seconden
- `totalTime` — totale tijd (voor percentage berekening)

**Ideeën voor visualisatie:**
- Circulaire progress bar
- Horizontale balk die krimpt
- Grote cijfers die van kleur veranderen

<details>
<summary>💡 Hint: circulaire timer met SVG</summary>

```tsx
interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function Timer({ timeLeft, totalTime }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (timeLeft <= 3) return "text-red-500";
    if (timeLeft <= 7) return "text-yellow-500";
    return "text-emerald-500";
  };

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${getColor()} transition-all duration-1000`}
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getColor()}`}>
        {timeLeft}
      </span>
    </div>
  );
}
```
</details>

## Opdracht 5: Timer pauzeren na antwoord

De timer moet stoppen zodra de speler een antwoord geeft.

**Aanpak:**
- Check in je interval of er al een antwoord is gegeven
- Zo ja, stop de countdown

<details>
<summary>💡 Hint: timer pauzeren</summary>

Voeg een dependency toe aan je useEffect:

```tsx
useEffect(() => {
  const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
  
  // Stop timer als er al een antwoord is
  if (currentAnswer !== null) {
    return;
  }

  // ... rest van de timer logica
}, [quizState.currentQuestionIndex, quizState.answers]);
```
</details>

## Opdracht 6: Visuele urgentie

Maak de timer visueel dringender als de tijd bijna op is:
- Laatste 5 seconden: oranje/geel
- Laatste 3 seconden: rood + eventueel pulserende animatie

```css
/* In globals.css of als Tailwind animation */
@keyframes pulse-urgent {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

## Testen

- ✅ Timer telt af van 15 naar 0
- ✅ Timer reset bij elke nieuwe vraag
- ✅ Timer stopt na het geven van een antwoord
- ✅ Bij tijd = 0 gaat de quiz automatisch door
- ✅ Visuele feedback bij weinig tijd

**Extra uitdaging:**
- Voeg een "totale tijd" timer toe die de hele quiz bijhoudt
- Toon de totale tijd op het resultaatscherm
- Geef bonuspunten voor snelle antwoorden

✅ **Klaar?** Door naar de laatste stap — polish!
