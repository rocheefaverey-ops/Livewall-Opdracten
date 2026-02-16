// frontend/app/(pages)/memory/layout.tsx

export default function MemoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-indigo-800">🧠 Memory</h1>
      </header>
      <main className="px-4 pb-8">{children}</main>
    </div>
  );
}