# Stap 2 — Je eerste pagina

Maak een nieuw bestand aan:

```
frontend/app/(pages)/stagiair/page.tsx
```

> **Tip:** In Next.js App Router geldt: map = route. Door een map `stagiair` aan te maken met een `page.tsx` erin, heb je automatisch een pagina op `/stagiair`.

Plak deze startcode:

```tsx
export default function StagiairPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-4xl font-bold">Hallo, ik ben [jouw naam]!</h1>
      <p className="text-lg text-gray-600">Mijn eerste dag 🎉</p>
    </div>
  );
}
```

Ga naar [http://localhost:3000/stagiair](http://localhost:3000/stagiair) en check dat je pagina werkt.

✅ **Klaar?** Zie je jouw naam in de browser? Top, door naar de volgende!
