import Navigation from "./components/Navigation";

export default function StagiairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="">{children}</main>
      <footer className="bg-tertiary text-center text-gray-400 text-sm ">
        Gemaakt door Rochee Faverey — Eerste dag stage ?🚀
      </footer>
    </div>
  );
}