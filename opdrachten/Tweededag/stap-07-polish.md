# Stap 7 — Polish: animaties en finishing touch ✨

Het spel werkt, nu ga je het er professioneel uit laten zien. Deze stap is bewust open — je krijgt doelen, geen oplossingen.

## Opdracht 1: Flip animatie

Momenteel verschijnt de emoji gewoon als je klikt. Maak er een echte 3D flip-animatie van.

**Wat je nodig hebt:**
- CSS `perspective` op de container
- CSS `transform: rotateY(180deg)` voor de flip
- CSS `backface-visibility: hidden` zodat je de achterkant niet ziet door de voorkant heen
- CSS `transform-style: preserve-3d` op het binnenste element
- Een `transition` voor een vloeiende animatie

**Structuur hint:** Je kaart heeft drie lagen nodig:
1. Een buitenste container (met `perspective`)
2. Een binnenste wrapper (die daadwerkelijk roteert)
3. Een voorkant en achterkant (beide absoluut gepositioneerd, met `backface-visibility: hidden`)

Zoek op: **"CSS card flip animation"** als je vastloopt. Pas het toe op je `MemoryCard` component.

> **Let op:** De voorkant moet `transform: rotateY(180deg)` hebben als default, zodat hij pas zichtbaar wordt als de wrapper ook 180° draait.

## Opdracht 2: Match animatie

Voeg een visueel effect toe wanneer kaarten matchen. Ideeën:
- Een bounce/scale animatie met `@keyframes`
- Een glow effect met `box-shadow`
- Een kleurverandering

Bedenk: hoe trigger je een CSS animatie alleen op gematchte kaarten? (Hint: conditionele class names)

## Opdracht 3: Disabled state

Er zit een subtiele bug in het spel: tijdens de 1-seconde wachttijd bij een mismatch kan de speler technisch gezien nog steeds klikken (de check in `handleCardClick` vangt het op, maar visueel is het niet duidelijk).

Los dit op:
- Voeg een `disabled` prop toe aan `MemoryCard`
- Pas de cursor en visuele feedback aan voor disabled kaarten
- Gebruik het `disabled` attribuut op de `<button>` voor accessibility

## Opdracht 4: Responsive design

Zorg dat het spel er goed uitziet op alle schermformaten:
- Mobiel: kleiner grid, kleinere gaps
- Tablet: medium grid
- Desktop: volledig grid

Gebruik Tailwind responsive prefixes: `sm:`, `md:`, `lg:`.

Test met de browser DevTools (F12 → mobiel icoon).

## Opdracht 5: Eigen toevoegingen (kies er minstens 1)

Kies minstens één van deze features en bouw het zelf:

| Feature | Moeilijkheid | Hint |
|---------|-------------|------|
| Beste score opslaan | ⭐⭐ | `localStorage.setItem()` / `localStorage.getItem()` |
| Speeltijd-timer | ⭐⭐ | `useEffect` + `setInterval` + cleanup functie |
| Confetti bij winnen | ⭐⭐⭐ | Zoek naar `canvas-confetti` npm package |
| Dark mode toggle | ⭐⭐ | Tailwind `dark:` prefix + state voor theme |
| Geluidseffecten | ⭐⭐⭐ | `new Audio('/sound.mp3').play()` |
| Multiplayer (2 spelers om de beurt) | ⭐⭐⭐⭐ | Extra state voor huidige speler + score per speler |

## Testen

- ✅ Kaarten draaien met een vloeiende 3D animatie
- ✅ Gematchte kaarten hebben een visueel effect
- ✅ Kaarten zijn duidelijk niet-klikbaar tijdens wachttijd
- ✅ Het spel ziet er goed uit op mobiel én desktop
- ✅ Minstens één eigen feature werkt

---

## Wat je hebt geleerd

| Onderwerp | Waar |
|-----------|------|
| Data modelleren met TypeScript interfaces | Stap 1 |
| Grid layout met Tailwind CSS | Stap 2 |
| Props en component compositie | Stap 2 |
| State management met useState | Stap 3 |
| Side effects met useEffect | Stap 4 |
| Conditioneel renderen | Stap 5 |
| Array methodes (map, filter, every, find) | Stap 3-5 |
| Fisher-Yates shuffle algoritme | Stap 6 |
| CSS 3D transforms en animaties | Stap 7 |
| Responsive design | Stap 7 |
| Accessibility (aria-labels, button vs div) | Stap 2, 7 |
| Zelfstandig problemen oplossen en opzoeken | Stap 3-7 |

Laat je memory game zien aan je begeleider! 🚀
