# Stap 3 — Kaarten omdraaien

Nu wordt het spannend — we gaan kaarten omdraaien met state. Maar deze keer ga je meer zelf uitzoeken.

## De regels

Denk eerst na over de logica voordat je gaat coderen:

1. Speler klikt op een kaart → die draait om
2. Speler klikt op een tweede kaart → die draait ook om
3. Je mag **niet** meer dan 2 kaarten tegelijk omdraaien
4. Klikken op een kaart die al open staat doet niks

## Wat heb je nodig?

Je hebt een extra stukje state nodig om bij te houden welke kaarten **op dit moment** omgedraaid zijn. Denk na:

- Wat voor type data is dit? Een array? Een enkel getal? Twee losse variabelen?
- Hoeveel items zitten er maximaal in?

<details>
<summary>💡 Hint: state structuur</summary>

Een array van kaart-id's werkt goed hier. Maximaal 2 items.

```tsx
const [flippedCards, setFlippedCards] = useState<number[]>([]);
```
</details>

## De klik-functie

Schrijf zelf een `handleCardClick` functie. Deze moet:

1. Checken of de klik geldig is (niet te veel kaarten open, kaart niet al omgedraaid/gematcht)
2. De kaart omdraaien door `isFlipped` op `true` te zetten
3. De kaart-id toevoegen aan je `flippedCards` state

> **Belangrijk:** In React kun je state niet direct muteren. `card.isFlipped = true` werkt **niet**. Je moet een nieuw array maken. Welke array-methode is hier handig voor?

<details>
<summary>💡 Hint: state updaten zonder mutatie</summary>

Gebruik `.map()` om een nieuw array te maken waar alleen de geklikte kaart veranderd is:

```tsx
const updatedCards = cards.map((c) =>
  c.id === card.id ? { ...c, isFlipped: true } : c
);
```

De spread operator `{ ...c, isFlipped: true }` maakt een kopie van het object met één property overschreven.
</details>

## Aansluiten op het component

Vervang de `console.log` in je grid door je nieuwe functie:

```tsx
<MemoryCard
  key={card.id}
  card={card}
  onClick={() => handleCardClick(card)}
/>
```

## Testen

- ✅ Klikken op een kaart draait hem om (emoji wordt zichtbaar)
- ✅ Je kunt maximaal 2 kaarten omdraaien
- ✅ Klikken op een al omgedraaide kaart doet niks

> **Let op:** De kaarten draaien nog niet terug bij een mismatch — dat komt in stap 4.

✅ **Klaar?** Kun je kaarten omdraaien? Door naar de match logica!
