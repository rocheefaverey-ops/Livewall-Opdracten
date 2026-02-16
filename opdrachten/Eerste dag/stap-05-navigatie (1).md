# Stap 5 — Een tweede pagina + navigatie

1. Maak een tweede pagina aan:
   ```
   frontend/app/(pages)/stagiair/hobby/page.tsx
   ```

2. Maak hier een pagina over je hobby's of interesses:
   ```tsx
   export default function HobbyPage() {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
         <h1 className="text-3xl font-bold">Mijn Hobby's</h1>
         {/* Voeg hier je hobby's toe */}
       </div>
     );
   }
   ```

3. Maak nu een **navigatie component** die je op beide pagina's kunt gebruiken. Maak een nieuw bestand:
   ```
   frontend/app/(pages)/stagiair/components/Navigation.tsx
   ```

   ```tsx
   import Link from "next/link";

   export default function Navigation() {
     return (
       <nav className="flex gap-4 p-4 bg-white shadow-sm w-full justify-center">
         <Link href="/stagiair" className="text-primary hover:underline">
           Home
         </Link>
         <Link href="/stagiair/hobby" className="text-primary hover:underline">
           Hobby's
         </Link>
       </nav>
     );
   }
   ```

4. Importeer en gebruik `Navigation` bovenaan beide pagina's:
   ```tsx
   import Navigation from "./components/Navigation";
   ```

> **Wat je leert:** Het verschil tussen `<a>` en Next.js `<Link>`, hoe je componenten hergebruikt, en hoe geneste routes werken.

✅ **Klaar?** Kun je heen en weer klikken tussen de twee pagina's? Door naar de volgende!
