# Stap 8 — Client Component met interactie

Tot nu toe heb je alleen Server Components gemaakt. Nu ga je een Client Component maken met interactie.

1. Maak een nieuw bestand:
   ```
   frontend/app/(pages)/stagiair/components/LikeButton.tsx
   ```

2. Let op de `"use client"` directive bovenaan:
   ```tsx
   "use client";

   import { useState } from "react";

   export default function LikeButton() {
     const [likes, setLikes] = useState(0);
     const [liked, setLiked] = useState(false);

     function handleClick() {
       if (liked) {
         setLikes(likes - 1);
       } else {
         setLikes(likes + 1);
       }
       setLiked(!liked);
     }

     return (
       <button
         onClick={handleClick}
         className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
           liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
         } hover:scale-105 transition-transform`}
       >
         {liked ? "❤️" : "🤍"} {likes} {likes === 1 ? "like" : "likes"}
       </button>
     );
   }
   ```

3. Voeg de `LikeButton` toe aan elke hobby card

> **Vraag om over na te denken:** Waarom moet je `"use client"` toevoegen? Wat is het verschil tussen een Server Component en een Client Component? (Hint: probeer `useState` te gebruiken zonder `"use client"` en kijk wat er gebeurt)

✅ **Klaar?** Werkt de like button? Bijna klaar voor vandaag!
