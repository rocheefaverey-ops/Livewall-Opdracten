# Stap 7 — Polish: animaties en extra features ✨

De quiz werkt, nu gaan we hem professioneel maken. Net als bij Memory is deze stap open — je krijgt doelen, geen kant-en-klare oplossingen.

## Opdracht 1: Vraag-transitie animatie

Momenteel "springt" de volgende vraag gewoon in beeld. Maak er een vloeiende transitie van.

**Ideeën:**
- Slide-in van rechts, slide-out naar links
- Fade out / fade in
- Scale animatie

**Wat je nodig hebt:**
- CSS transitions of `@keyframes` animaties
- Een manier om te detecteren wanneer de vraag verandert
- Mogelijk een korte delay voordat de nieuwe vraag verschijnt

<details>
<summary>💡 Hint: animatie met state</summary>

```tsx
const [isAnimating, setIsAnimating] = useState(false);

const handleNextQuestion = () => {
  setIsAnimating(true);
  
  setTimeout(() => {
    // Update de vraag
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
    setIsAnimating(false);
  }, 300); // Wacht op exit animatie
};
```

```tsx
<div className={`transition-all duration-300 ${
  isAnimating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
}`}>
  <QuestionCard ... />
</div>
```
</details>

## Opdracht 2: Antwoord-selectie animatie

Voeg een visueel effect toe wanneer een antwoord geselecteerd wordt:
- Een korte "pop" of scale animatie
- Een ripple effect vanuit het klikpunt
- Een check/cross icoon dat inschuift

## Opdracht 3: Resultaat animaties

Maak het resultaatscherm feestelijk:
- Score telt op van 0 naar het eindgetal
- Confetti bij een goede score (zoek naar `canvas-confetti`)
- Staggered animatie voor het vraag-overzicht

<details>
<summary>💡 Hint: score optellen animatie</summary>

```tsx
const [displayScore, setDisplayScore] = useState(0);

useEffect(() => {
  if (displayScore < score) {
    const timer = setTimeout(() => {
      setDisplayScore((prev) => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }
}, [displayScore, score]);
```
</details>

## Opdracht 4: Responsive design

Zorg dat de quiz er goed uitziet op alle schermformaten:
- Mobiel: volledig scherm, grotere touch targets
- Tablet: gecentreerd met max-width
- Desktop: eventueel sidebar met voortgang

Test met browser DevTools (F12 → mobiel icoon).

## Opdracht 5: Keyboard navigatie

Maak de quiz volledig bruikbaar met het toetsenbord:
- `1`, `2`, `3`, `4` om een antwoord te selecteren
- `Enter` of `→` voor volgende vraag
- `←` voor vorige vraag

<details>
<summary>💡 Hint: keyboard events</summary>

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Antwoord selecteren met cijfertoetsen
    if (["1", "2", "3", "4"].includes(e.key)) {
      const answerIndex = parseInt(e.key) - 1;
      if (answerIndex < currentQuestion.options.length) {
        handleSelectAnswer(answerIndex);
      }
    }
    
    // Navigatie
    if (e.key === "ArrowRight" || e.key === "Enter") {
      if (showFeedback) handleNextQuestion();
    }
    if (e.key === "ArrowLeft") {
      if (quizState.currentQuestionIndex > 0) handlePreviousQuestion();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [/* dependencies */]);
```
</details>

## Opdracht 6: Eigen features (kies er minstens 2)

| Feature | Moeilijkheid | Hint |
|---------|-------------|------|
| Categorie filter | ⭐⭐ | Filter `QUESTIONS` op category |
| Moeilijkheidsgraad | ⭐⭐ | Voeg `difficulty` toe aan vragen |
| Highscore opslaan | ⭐⭐ | `localStorage` |
| Meer vragen laden | ⭐⭐⭐ | Fetch van een API (bijv. Open Trivia DB) |
| Multiplayer mode | ⭐⭐⭐⭐ | Twee spelers om de beurt |
| Streak bonus | ⭐⭐ | Extra punten voor opeenvolgende goede antwoorden |
| Hints systeem | ⭐⭐⭐ | Verwijder 2 foute antwoorden |
| Sound effects | ⭐⭐ | `new Audio().play()` |
| Dark mode | ⭐⭐ | Tailwind `dark:` classes |
| Deel resultaat | ⭐⭐ | Web Share API of clipboard |

## Testen

- ✅ Vraag-transities zijn vloeiend
- ✅ Antwoord-selectie heeft visuele feedback
- ✅ Resultaatscherm heeft animaties
- ✅ Quiz werkt goed op mobiel én desktop
- ✅ Keyboard navigatie werkt
- ✅ Minstens 2 eigen features zijn geïmplementeerd

---

## Wat je hebt geleerd

| Onderwerp | Waar |
|-----------|------|
| Data modelleren met TypeScript interfaces | Stap 1 |
| Component compositie en props | Stap 2 |
| State management met useState | Stap 3 |
| Conditioneel renderen | Stap 3-5 |
| Event handling | Stap 3-4 |
| Array methodes (map, filter, reduce) | Stap 5 |
| Timers met useEffect en setInterval | Stap 6 |
| Cleanup functions in useEffect | Stap 6 |
| CSS animaties en transitions | Stap 7 |
| Keyboard event handling | Stap 7 |
| Responsive design met Tailwind | Stap 7 |

## Vergelijking Memory vs Quiz

| Concept | Memory | Quiz |
|---------|--------|------|
| State structuur | Array van kaarten | Object met index + answers |
| User interaction | Klikken op items | Selecteren van opties |
| Timing | setTimeout voor mismatch | setInterval voor countdown |
| Win conditie | Alle kaarten gematcht | Alle vragen beantwoord |
| Feedback | Visueel (kaart draait) | Visueel + tekstueel |

Je hebt nu twee complete interactieve applicaties gebouwd! 🚀

Laat je quiz zien aan je begeleider!
