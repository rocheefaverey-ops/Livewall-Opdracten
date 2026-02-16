# Stap 2 — Het grid en kaart-component

De emoji's staan nu nog gewoon zichtbaar in simpele witte blokken. Dat is geen memory — we moeten de kaarten verbergen en er een apart component van maken.

## Opdracht 1: MemoryCard component

Maak een nieuw bestand:

```
frontend/app/(pages)/memory/components/MemoryCard.tsx
```

Bouw een `MemoryCard` component dat het volgende doet:

**Props die het nodig heeft:**
- `card` — een `Card` object (importeer je type uit `../types`)
- `onClick` — een functie die aangeroepen wordt als je op de kaart klikt

**Gedrag:**
- Als de kaart **niet** omgedraaid en **niet** gematcht is → toon een `❓` op een gekleurde achtergrond
- Als de kaart **wel** omgedraaid of gematcht is → toon de emoji op een witte achtergrond
- Gematchte kaarten moeten visueel anders zijn (bijv. groene rand)

**Eisen:**
- Gebruik een `<button>` element, geen `<div>` — waarom denk je?
- Voeg een `aria-label` toe zodat screenreaders weten wat er op de kaart staat
- De kaart moet vierkant zijn (hint: `aspect-square`)

<details>
<summary>💡 Hint: hoe bepaal je of de kaart zichtbaar is?</summary>

```tsx
const isVisible = card.isFlipped || card.isMatched;
```

Gebruik dit om te kiezen wat je toont en welke styling je toepast.
</details>

<details>
<summary>💡 Hint: TypeScript interface voor de props</summary>

Denk terug aan stap 7 van de basis-opdrachten (Props en TypeScript):

```tsx
interface MemoryCardProps {
  card: Card;
  onClick: () => void;
}
```
</details>

<details>
<summary>💡 Hint: conditionele styling met Tailwind</summary>

Je kunt template literals gebruiken om classes dynamisch te maken:

```tsx
className={`basis-classes ${conditie ? "class-a" : "class-b"}`}
```
</details>

## Opdracht 2: Component gebruiken in page.tsx

Vervang de simpele `<div>` kaarten in je grid door je nieuwe `MemoryCard` component.

- Importeer het component
- Geef de juiste props mee
- Voor nu: laat `onClick` een `console.log` doen met het kaart-id

Check je browser — je zou nu 16 gekleurde kaarten met vraagtekens moeten zien.

## Opdracht 3: Testen of het werkt

Hoe kun je controleren of de "zichtbare" staat goed werkt, zonder dat je al klik-logica hebt?

Bedenk zelf een manier om tijdelijk één kaart als `isFlipped: true` te markeren in `createDeck()`. Check dat die ene kaart de emoji toont en de rest vraagtekens.

> **Vergeet niet** om je test-aanpassing weer te verwijderen!

## Testen

- ✅ 16 kaarten met vraagtekens in een 4×4 grid
- ✅ Eén handmatig omgedraaide kaart toont de emoji
- ✅ Het component gebruikt een `<button>` met `aria-label`

✅ **Klaar?** Door naar stap 3 — kaarten omdraaien met state!
