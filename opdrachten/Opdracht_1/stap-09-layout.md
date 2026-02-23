# Stap 9 — Layout voor je sectie

Next.js ondersteunt geneste layouts. Maak een layout die alleen geldt voor jouw stagiair-pagina's:

1. Maak het bestand:
   ```
   frontend/app/(pages)/stagiair/layout.tsx
   ```

2. Voeg een layout toe met je navigatie:
   ```tsx
   import Navigation from "./components/Navigation";

   export default function StagiairLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <div className="min-h-screen bg-gray-50">
         <Navigation />
         <main className="p-8">{children}</main>
         <footer className="text-center text-gray-400 text-sm py-8">
           Gemaakt door [jouw naam] — Eerste dag stage 🚀
         </footer>
       </div>
     );
   }
   ```

3. Verwijder nu de `Navigation` import uit je individuele pagina's — de layout regelt dat nu automatisch

> **Wat je leert:** Hoe layouts werken in Next.js, en hoe je gedeelde UI (navigatie, footer) op één plek beheert.

✅ **Klaar?** Staat de navigatie en footer automatisch op beide pagina's? Laatste stap!
