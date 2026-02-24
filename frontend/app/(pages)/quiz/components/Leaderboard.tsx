interface LeaderboardProps {
  score: number;          // De score van de huidige speler
  totalQuestions: number; // Totaal aantal vragen voor de display
}

export default function Leaderboard({ score, totalQuestions }: LeaderboardProps) {
  // We maken een nep-lijstje van andere spelers om het leaderboard te vullen
  const otherScores = [
    { name: "Annelies", pts: totalQuestions - 1 },
    { name: "Casper", pts: totalQuestions - 2 },
    { name: "Sarah", pts: Math.floor(totalQuestions / 2) },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in duration-500">
      {/* 1. Leaderboard Kaart */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-3xl">🏆</span>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Leaderboard</h2>
        </div>
        
        <div className="space-y-3">
          {/* Jouw Score (Bovenaan en opvallend) */}
          <div className="flex justify-between items-center p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-100 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 bg-emerald-500 text-white rounded-full font-bold text-sm">1</span>
              <span className="font-bold text-emerald-900 text-lg">Jij (Huidige score)</span>
            </div>
            <span className="font-black text-emerald-600 text-xl">{score} <span className="text-sm font-medium">ptn</span></span>
          </div>

          {/* Andere Spelers (De rest van de lijst) */}
          {otherScores.map((player, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-80">
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-bold text-gray-400">{index + 2}</span>
                <span className="font-medium text-gray-700">{player.name}</span>
              </div>
              <span className="font-bold text-gray-500">{player.pts} ptn</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Grote Score Indicator onder de kaart */}
      <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-md rounded-3xl border border-white shadow-sm">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Jouw Eindresultaat</span>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-black text-emerald-600">{score}</span>
          <span className="text-2xl font-bold text-gray-300">/ {totalQuestions}</span>
        </div>
        <p className="mt-3 text-sm font-medium text-gray-500 italic">
          {score === totalQuestions ? "Perfecte score! Jij bent een meester! 🌟" : "Goed gedaan! Kun je het nog beter?"}
        </p>
      </div>
    </div>
  );
}