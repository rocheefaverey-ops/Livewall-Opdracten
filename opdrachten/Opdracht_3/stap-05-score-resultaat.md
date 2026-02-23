# Stap 5 — Score en resultaat

Het moment van de waarheid — laten we de score berekenen en een mooi resultaatscherm bouwen.

## Opdracht 1: Score berekenen

Schrijf een functie die de score berekent op basis van de gegeven antwoorden.

**Logica:**
- Loop door alle vragen
- Vergelijk het gegeven antwoord met `correctAnswer`
- Tel het aantal juiste antwoorden

<details>
<summary>💡 Hint: score berekenen</summary>

```tsx
const calculateScore = (): number => {
  return quizState.answers.reduce((score, answer, index) => {
    if (answer === QUESTIONS[index].correctAnswer) {
      return score + 1;
    }
    return score;
  }, 0);
};
```

Of met `filter`:

```tsx
const score = quizState.answers.filter(
  (answer, index) => answer === QUESTIONS[index].correctAnswer
).length;
```
</details>

## Opdracht 2: ResultScreen component

Maak een nieuw component:

```
frontend/app/(pages)/quiz/components/ResultScreen.tsx
```

**Props:**
- `score` — aantal juiste antwoorden
- `totalQuestions` — totaal aantal vragen
- `answers` — array met gegeven antwoorden
- `questions` — array met alle vragen
- `onRestart` — functie om opnieuw te beginnen

**Wat het toont:**
- De eindscore (bijv. "4 van 5 goed!")
- Een percentage of visuele indicator
- Een bericht gebaseerd op de score
- Een overzicht van alle vragen met gegeven antwoorden
- Een "Opnieuw spelen" knop

## Opdracht 3: Score-gebaseerd bericht

Toon een bericht dat past bij de score:

| Score | Bericht |
|-------|---------|
| 100% | "Perfect! 🏆" |
| 80%+ | "Uitstekend! 🌟" |
| 60%+ | "Goed gedaan! 👍" |
| 40%+ | "Kan beter! 📚" |
| <40% | "Blijf oefenen! 💪" |

<details>
<summary>💡 Hint: bericht bepalen</summary>

```tsx
const getMessage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) return "Perfect! 🏆";
  if (percentage >= 80) return "Uitstekend! 🌟";
  if (percentage >= 60) return "Goed gedaan! 👍";
  if (percentage >= 40) return "Kan beter! 📚";
  return "Blijf oefenen! 💪";
};
```
</details>

## Opdracht 4: Antwoorden overzicht

Toon een lijst van alle vragen met:
- De vraagtekst
- Het gegeven antwoord
- Of het goed of fout was
- Het juiste antwoord (als het fout was)

<details>
<summary>💡 Hint: overzicht structuur</summary>

```tsx
<div className="space-y-4 mt-6">
  {questions.map((question, index) => {
    const givenAnswer = answers[index];
    const isCorrect = givenAnswer === question.correctAnswer;
    
    return (
      <div
        key={question.id}
        className={`p-4 rounded-xl ${
          isCorrect ? "bg-green-50" : "bg-red-50"
        }`}
      >
        <p className="font-medium">{question.question}</p>
        <p className="text-sm mt-1">
          Jouw antwoord: {question.options[givenAnswer!]}
          {isCorrect ? " ✓" : ` ✗ (Juist: ${question.options[question.correctAnswer]})`}
        </p>
      </div>
    );
  })}
</div>
```
</details>

## Opdracht 5: Conditioneel renderen in page.tsx

Update je `page.tsx` om het resultaatscherm te tonen wanneer de quiz klaar is:

```tsx
if (quizState.isFinished) {
  return (
    <ResultScreen
      score={calculateScore()}
      totalQuestions={QUESTIONS.length}
      answers={quizState.answers}
      questions={QUESTIONS}
      onRestart={handleRestart}
    />
  );
}
```

## Opdracht 6: Opnieuw spelen

Schrijf een `handleRestart` functie die de quiz reset naar de beginstaat.

<details>
<summary>💡 Hint: restart functie</summary>

```tsx
const handleRestart = () => {
  setQuizState(initialState);
};
```
</details>

## Testen

- ✅ Na de laatste vraag verschijnt het resultaatscherm
- ✅ De score wordt correct berekend
- ✅ Het bericht past bij de behaalde score
- ✅ Het overzicht toont alle vragen met antwoorden
- ✅ "Opnieuw spelen" reset de quiz volledig

> **Test-tip:** Beantwoord expres een paar vragen fout om te checken of de feedback klopt.

**Extra uitdaging:**
- Voeg een circulaire progress indicator toe voor de score
- Toon hoelang de speler erover deed (je hebt hier een timer voor nodig — komt in stap 6)
- Voeg een "Deel je score" knop toe

✅ **Klaar?** Door naar stap 6 — timer toevoegen!
