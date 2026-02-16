# Stap 6 — Een lijst renderen met data

Op je hobby pagina, maak een array met data en render die als een lijst:

```tsx
const hobbies = [
  { id: 1, name: "Gamen", emoji: "🎮", description: "Vooral RPG games" },
  { id: 2, name: "Koken", emoji: "🍳", description: "Italiaans is mijn favoriet" },
  { id: 3, name: "Fietsen", emoji: "🚴", description: "Elke zondag een rondje" },
];

// In je JSX:
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
  {hobbies.map((hobby) => (
    <div key={hobby.id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
      <span className="text-3xl">{hobby.emoji}</span>
      <h3 className="text-lg font-bold mt-2">{hobby.name}</h3>
      <p className="text-gray-600 text-sm">{hobby.description}</p>
    </div>
  ))}
</div>
```

**Extra uitdaging:**
- Voeg minstens 5 hobby's toe met je eigen hobby's
- Maak de cards responsive: 1 kolom op mobiel, 2 op tablet, 3 op desktop (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)
- Voeg een afbeelding toe aan elke hobby card

✅ **Klaar?** Staan je hobby's er netjes in? Lekker bezig, volgende stap!
