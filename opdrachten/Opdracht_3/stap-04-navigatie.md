# Stap 4 — Navigatie tussen vragen

De speler kan nu een antwoord geven en feedback zien. Maar hoe gaat hij naar de volgende vraag?

## De navigatie-logica

Bedenk eerst de regels:

1. "Volgende" knop verschijnt pas **na** het geven van een antwoord
2. Bij de laatste vraag staat er "Bekijk resultaat" in plaats van "Volgende"
3. Optioneel: "Vorige" knop om terug te gaan

## Opdracht 1: Volgende vraag functie

Schrijf een `handleNextQuestion` functie die:

1. De `currentQuestionIndex` verhoogt met 1
2. Bij de laatste vraag: `isFinished` op `true` zet

<details>
<summary>💡 Hint: next question logica</summary>

```tsx
const handleNextQuestion = () => {
  const isLastQuestion =
    quizState.currentQuestionIndex === QUESTIONS.length - 1;

  if (isLastQuestion) {
    setQuizState((prev) => ({ ...prev, isFinished: true }));
  } else {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  }
};
```
</details>

## Opdracht 2: Navigatie knoppen

Voeg navigatieknoppen toe onder de `QuestionCard`:

```tsx
{showFeedback && (
  <div className="mt-6 flex justify-between">
    {/* Vorige knop (optioneel) */}
    
    {/* Volgende / Resultaat knop */}
  </div>
)}
```

**Eisen:**
- De "Volgende" knop is alleen zichtbaar na het beantwoorden
- Bij de laatste vraag: toon "Bekijk resultaat" 
- Style de knoppen met Tailwind (`rounded-full`, `px-6`, `py-3`, etc.)

<details>
<summary>💡 Hint: conditionele knoptekst</summary>

```tsx
const isLastQuestion = quizState.currentQuestionIndex === QUESTIONS.length - 1;

<button onClick={handleNextQuestion}>
  {isLastQuestion ? "Bekijk resultaat" : "Volgende vraag →"}
</button>
```
</details>

## Opdracht 3: Vorige vraag (optioneel)

Voeg een "Vorige" knop toe waarmee de speler terug kan naar eerdere vragen.

**Gedrag:**
- Alleen zichtbaar als je niet op de eerste vraag bent
- Gaat terug naar de vorige vraag
- Het eerder gegeven antwoord blijft zichtbaar (het zit al in `answers`)

<details>
<summary>💡 Hint: previous question</summary>

```tsx
const handlePreviousQuestion = () => {
  setQuizState((prev) => ({
    ...prev,
    currentQuestionIndex: prev.currentQuestionIndex - 1,
  }));
};

// In de JSX:
{quizState.currentQuestionIndex > 0 && (
  <button onClick={handlePreviousQuestion}>
    ← Vorige
  </button>
)}
```
</details>

## Opdracht 4: Vraag-indicator dots

Voeg een visuele indicator toe die toont welke vragen beantwoord zijn:

```
● ● ○ ○ ○
```

- Gevulde dot (●) = beantwoord
- Lege dot (○) = nog niet beantwoord
- Huidige vraag = grotere dot of andere kleur

<details>
<summary>💡 Hint: dots renderen</summary>

```tsx
<div className="flex justify-center gap-2 mt-4">
  {QUESTIONS.map((_, index) => (
    <div
      key={index}
      className={`w-3 h-3 rounded-full ${
        index === quizState.currentQuestionIndex
          ? "bg-emerald-600 scale-125"
          : quizState.answers[index] !== null
          ? "bg-emerald-400"
          : "bg-gray-300"
      }`}
    />
  ))}
</div>
```
</details>

## Testen

- ✅ "Volgende" knop verschijnt na het beantwoorden
- ✅ Klikken op "Volgende" gaat naar de volgende vraag
- ✅ Bij de laatste vraag staat "Bekijk resultaat"
- ✅ De vraag-indicator toont de voortgang correct
- ✅ (Optioneel) "Vorige" knop werkt en toont het eerder gegeven antwoord

> **Test-tip:** Loop door alle vragen heen en check dat de navigatie soepel werkt.

✅ **Klaar?** Door naar stap 5 — score en resultaat!
