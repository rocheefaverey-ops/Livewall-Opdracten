# Stap 3 — Antwoord selecteren en feedback

Nu wordt het interessant — we gaan antwoorden opslaan en feedback tonen.

## De flow

Denk eerst na over wat er moet gebeuren:

1. Speler klikt op een antwoord
2. Het antwoord wordt opgeslagen in state
3. Feedback wordt getoond (goed/fout)
4. Na feedback kan de speler naar de volgende vraag

## Opdracht 1: Antwoord opslaan

Schrijf een `handleSelectAnswer` functie in `page.tsx` die:

1. De gekozen antwoord-index opslaat in `quizState.answers`
2. Alleen werkt als er nog geen antwoord is gegeven voor deze vraag

> **Belangrijk:** Net als bij Memory kun je state niet direct muteren. Je moet een nieuw object maken.

<details>
<summary>💡 Hint: answers array updaten</summary>

```tsx
const handleSelectAnswer = (answerIndex: number) => {
  // Check of er al een antwoord is
  if (quizState.answers[quizState.currentQuestionIndex] !== null) {
    return;
  }

  setQuizState((prev) => ({
    ...prev,
    answers: prev.answers.map((answer, index) =>
      index === prev.currentQuestionIndex ? answerIndex : answer
    ),
  }));
};
```
</details>

## Opdracht 2: Feedback tonen

Na het selecteren van een antwoord moet de speler zien of het goed of fout was.

**Update je `QuestionCard` component:**

Voeg een nieuwe prop toe:
- `showFeedback` — boolean die aangeeft of feedback getoond moet worden

**Gedrag wanneer `showFeedback` true is:**
- Het juiste antwoord krijgt een groene achtergrond/rand
- Een fout gekozen antwoord krijgt een rode achtergrond/rand
- Alle knoppen worden disabled

<details>
<summary>💡 Hint: feedback styling logica</summary>

```tsx
const getButtonStyle = (index: number) => {
  if (!showFeedback) {
    // Normale styling
    return selectedAnswer === index
      ? "border-emerald-500 bg-emerald-50"
      : "border-gray-200 hover:border-emerald-400";
  }

  // Feedback styling
  if (index === question.correctAnswer) {
    return "border-green-500 bg-green-100"; // Juiste antwoord
  }
  if (index === selectedAnswer) {
    return "border-red-500 bg-red-100"; // Fout gekozen
  }
  return "border-gray-200 opacity-50"; // Andere opties
};
```
</details>

## Opdracht 3: Feedback iconen

Voeg iconen toe aan de antwoorden wanneer feedback getoond wordt:
- ✓ bij het juiste antwoord
- ✗ bij een fout gekozen antwoord

<details>
<summary>💡 Hint: conditioneel icoon tonen</summary>

```tsx
<button className={...}>
  <span className="flex items-center justify-between">
    <span>{option}</span>
    {showFeedback && index === question.correctAnswer && (
      <span className="text-green-600">✓</span>
    )}
    {showFeedback && index === selectedAnswer && index !== question.correctAnswer && (
      <span className="text-red-600">✗</span>
    )}
  </span>
</button>
```
</details>

## Opdracht 4: Bepalen wanneer feedback te tonen

In `page.tsx`, bepaal wanneer `showFeedback` true moet zijn:

```tsx
const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
const showFeedback = currentAnswer !== null;
```

Geef dit door aan je `QuestionCard`.

## Testen

- ✅ Klikken op een antwoord slaat het op
- ✅ Na selectie wordt feedback getoond
- ✅ Het juiste antwoord is groen gemarkeerd
- ✅ Een fout antwoord is rood gemarkeerd
- ✅ Je kunt niet opnieuw klikken na het geven van een antwoord

> **Denk na:** Wat zou er gebeuren als je `showFeedback` in het component zelf zou berekenen in plaats van als prop door te geven?

✅ **Klaar?** Door naar stap 4 — navigatie tussen vragen!
