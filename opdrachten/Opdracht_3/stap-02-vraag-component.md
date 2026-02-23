# Stap 2 — Het vraag-component

De vraag en antwoorden staan nu direct in `page.tsx`. Laten we daar een apart component van maken.

## Opdracht 1: QuestionCard component

Maak een nieuw bestand:

```
frontend/app/(pages)/quiz/components/QuestionCard.tsx
```

Bouw een `QuestionCard` component dat het volgende doet:

**Props die het nodig heeft:**
- `question` — een `Question` object
- `questionNumber` — het huidige vraagnummer (voor weergave)
- `totalQuestions` — totaal aantal vragen
- `selectedAnswer` — de index van het geselecteerde antwoord (of `null`)
- `onSelectAnswer` — functie die aangeroepen wordt bij het selecteren van een antwoord

**Wat het toont:**
- De voortgangsindicator ("Vraag 1 van 5")
- De categorie badge (als die er is)
- De vraagtekst
- De antwoordopties als knoppen

**Eisen:**
- Gebruik `<button>` elementen voor de antwoorden
- Het geselecteerde antwoord moet visueel anders zijn (bijv. groene rand)
- Voeg een `aria-label` toe aan elke knop

<details>
<summary>💡 Hint: TypeScript interface voor de props</summary>

```tsx
interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
}
```
</details>

<details>
<summary>💡 Hint: conditionele styling voor geselecteerd antwoord</summary>

```tsx
className={`base-classes ${
  selectedAnswer === index
    ? "border-emerald-500 bg-emerald-50"
    : "border-gray-200 hover:border-emerald-400"
}`}
```
</details>

## Opdracht 2: ProgressBar component

Maak nog een component:

```
frontend/app/(pages)/quiz/components/ProgressBar.tsx
```

Een visuele voortgangsbalk die toont hoever de speler is.

**Props:**
- `current` — huidige vraagnummer (1-based)
- `total` — totaal aantal vragen

**Gedrag:**
- Toon een balk die gevuld is op basis van de voortgang
- Bereken het percentage: `(current / total) * 100`

<details>
<summary>💡 Hint: progress bar met Tailwind</summary>

```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div
    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
    style={{ width: `${percentage}%` }}
  />
</div>
```
</details>

## Opdracht 3: Components gebruiken in page.tsx

Vervang de inline code in je `page.tsx` door je nieuwe components.

- Importeer beide components
- Geef de juiste props mee
- Voor nu: laat `onSelectAnswer` een `console.log` doen

## Testen

- ✅ De vraag wordt getoond via het `QuestionCard` component
- ✅ De voortgangsbalk toont de juiste voortgang
- ✅ Klikken op een antwoord logt de index naar de console
- ✅ Het geselecteerde antwoord krijgt een andere styling

> **Denk na:** Waarom is het handig om `selectedAnswer` als prop door te geven in plaats van state in het component zelf te houden?

✅ **Klaar?** Door naar stap 3 — antwoord selecteren en feedback!
