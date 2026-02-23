# Stap 5 — Score, beurten en winnen

Een spel zonder score is geen spel. Tijd om dat zelf te bouwen.

## Opdracht

Voeg de volgende features toe aan je memory game. Je krijgt geen kant-en-klare code meer — gebruik wat je geleerd hebt in de vorige stappen.

### 1. Beurten-teller

- Voeg een `turns` state toe (begint op 0)
- Verhoog de teller elke keer als een speler 2 kaarten heeft omgedraaid (= 1 beurt)
- Bedenk: waar in je bestaande code is het logische moment om de teller te verhogen?

### 2. Scorebord UI

Maak een scorebord boven het grid dat toont:
- Het aantal **beurten**
- Het aantal **gevonden paren** (bijv. `3 / 8`)

> **Tip:** Hoeveel gematchte kaarten heb je? Deel door 2 voor het aantal paren. Welke array-methode filter items op een conditie?

<details>
<summary>💡 Hint: gevonden paren berekenen</summary>

```tsx
cards.filter((c) => c.isMatched).length / 2
```
</details>

Style het scorebord met Tailwind. Denk aan: `flex`, `gap`, `bg-white`, `rounded-xl`, `shadow`, `text-center`.

### 3. Win-conditie

Het spel is gewonnen als **alle** kaarten gematcht zijn.

- Welke array-methode checkt of **elk** item aan een conditie voldoet?
- Toon een felicitatie-bericht als het spel gewonnen is
- Toon daarin hoeveel beurten de speler nodig had

<details>
<summary>💡 Hint: win check</summary>

`Array.every()` returned `true` als alle items aan de conditie voldoen:

```tsx
const isGameWon = cards.every((card) => card.isMatched);
```
</details>

### 4. Conditioneel renderen

Toon het win-bericht alleen als `isGameWon` true is. In React doe je dat zo:

```tsx
{conditie && (
  <div>Dit wordt alleen getoond als conditie true is</div>
)}
```

## Testen

- ✅ Beurten-teller gaat omhoog bij elke poging
- ✅ Gevonden paren worden correct geteld
- ✅ Win-bericht verschijnt als alle paren gevonden zijn
- ✅ Win-bericht toont het aantal beurten

> **Test-tip:** Verklein tijdelijk je `EMOJIS` array naar 2 items zodat je snel kunt winnen.

**Extra uitdaging:**
- Voeg een timer toe die bijhoudt hoe lang de speler erover doet (kijk naar `setInterval`)
- Toon een ster-rating: ⭐⭐⭐ bij < 12 beurten, ⭐⭐ bij < 18, ⭐ bij de rest

✅ **Klaar?** Door naar shuffle en reset!
