# Stap 7 — Props en TypeScript

Maak een herbruikbaar `Card` component met TypeScript types:

1. Maak het bestand:
   ```
   frontend/app/(pages)/stagiair/components/Card.tsx
   ```

2. Definieer een interface en bouw het component:
   ```tsx
   interface CardProps {
     title: string;
     description: string;
     emoji: string;
   }

   export default function Card({ title, description, emoji }: CardProps) {
     return (
       <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
         <span className="text-4xl">{emoji}</span>
         <h3 className="text-xl font-bold mt-3">{title}</h3>
         <p className="text-gray-600 mt-1">{description}</p>
       </div>
     );
   }
   ```

3. Gebruik dit component op je hobby pagina in plaats van de inline JSX uit stap 6:
   ```tsx
   import Card from "./components/Card";

   // In je JSX:
   {hobbies.map((hobby) => (
     <Card key={hobby.id} title={hobby.name} description={hobby.description} emoji={hobby.emoji} />
   ))}
   ```

**Extra uitdaging:**
- Voeg een optionele `imageUrl` prop toe aan de Card
- Voeg een optionele `link` prop toe die de card klikbaar maakt

✅ **Klaar?** Werkt je Card component met de juiste types? Netjes, door naar de volgende!
