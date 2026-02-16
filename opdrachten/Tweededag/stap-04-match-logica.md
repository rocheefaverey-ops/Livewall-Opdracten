# Stap 4 — Match logica

Het hart van het spel: controleren of twee omgedraaide kaarten een paar vormen.

## Het probleem

Je hebt nu een situatie waarbij `flippedCards` 2 id's bevat. Je moet:

1. **Detecteren** wanneer er precies 2 kaarten omgedraaid zijn
2. **Vergelijken** of ze hetzelfde paar zijn (check de `pairId`)
3. **Match:** beide kaarten markeren als `isMatched: true`
4. **Geen match:** na een korte pauze beide kaarten terugdraaien (`isFlipped: false`)
5. **Opruimen:** `flippedCards` weer leegmaken

## De juiste tool: useEffect

Je hebt een manier nodig om code uit te voeren **als reactie op een state-verandering**. React heeft hier een hook voor: `useEffect`.

```tsx
import { useState, useEffect } from "react";
```

`useEffect` werkt zo:

```tsx
useEffect(() => {
  // Deze code draait elke keer als 'flippedCards' verandert
}, [flippedCards]);
```

De array `[flippedCards]` aan het einde is de **dependency array** — het vertelt React: "draai deze code opnieuw als `flippedCards` verandert."

## Jouw beurt

Schrijf de `useEffect` zelf. Hier is de structuur, maar de implementatie is aan jou:

```tsx
useEffect(() => {
  // 1. Early return als er niet precies 2 kaarten omgedraaid zijn

  // 2. Zoek de twee kaarten op basis van de id's in flippedCards

  // 3. Vergelijk hun pairId

  // 4a. Match? → update cards state (isMatched: true), reset flippedCards

  // 4b. Geen match? → wacht even, dan cards terugdraaien, reset flippedCards

}, [flippedCards]);
```

<details>
<summary>💡 Hint: hoe wacht je even voordat je iets doet?</summary>

`setTimeout` voert code uit na een vertraging:

```tsx
setTimeout(() => {
  // dit draait na 1000ms (1 seconde)
}, 1000);
```

Waarom wachten? Zodat de speler de tweede kaart kan zien voordat ze terugdraaien.
</details>

<details>
<summary>💡 Hint: kaarten opzoeken op id</summary>

```tsx
const firstCard = cards.find((c) => c.id === flippedCards[0]);
```
</details>

<details>
<summary>💡 Hint: functionele state update</summary>

Als je state update op basis van de vorige state, gebruik dan de functionele vorm:

```tsx
setCards((prev) => prev.map((c) => 
  // jouw logica hier
));
```

Dit voorkomt problemen met stale state in `setTimeout`.
</details>

## Testen

- ✅ Twee dezelfde emoji's → kaarten blijven open met groene rand
- ✅ Twee verschillende emoji's → kaarten draaien na ~1 seconde terug
- ✅ Tijdens het wachten kun je niet op andere kaarten klikken (dankzij je check in stap 3)

> **Denk na:** Wat zou er gebeuren als je de kaarten direct terugdraait zonder `setTimeout`? Probeer het eens!

✅ **Klaar?** Werkt het matchen? Je hebt nu een werkend memory spel!
