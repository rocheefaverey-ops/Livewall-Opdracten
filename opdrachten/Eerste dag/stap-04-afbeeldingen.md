# Stap 4 — Afbeeldingen toevoegen

1. Zoek een leuke afbeelding of avatar online (of gebruik een eigen foto)
2. Zet het bestand in `frontend/public/` (bijv. `frontend/public/avatar.png`)
3. Gebruik de Next.js `Image` component om het te tonen:

```tsx
import Image from "next/image";

// In je component:
<Image
  src="/avatar.png"
  alt="Mijn avatar"
  width={120}
  height={120}
  className="rounded-full"
/>
```

4. Voeg ook een van de bestaande SVG's toe uit de `public/` map (bijv. `globe.svg` of `file.svg`)

> **Vraag om over na te denken:** Waarom gebruiken we `Image` van Next.js in plaats van een gewone `<img>` tag? (Hint: kijk in de [Next.js docs over Image](https://nextjs.org/docs/app/api-reference/components/image))

✅ **Klaar?** Staat je avatar op de pagina? Mooi, volgende stap!
