
export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-teal-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-emerald-800">🎯 Quiz</h1>
      </header>
      <main className="px-4 pb-8">{children}</main>
    </div>
  );
}