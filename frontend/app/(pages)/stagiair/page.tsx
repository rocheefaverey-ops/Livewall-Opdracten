import Navigation from "./components/Navigation";
import HeaderCard from "./components/HeaderPage";

export default function StagiairPage() {
  return (
    <div className="w-full flex flex-wrap items-center justify-center bg-tertiary text-center min-h-screen">
      <div className="bg-tertiary flex justify-center w-full">
        <main className="bg-primary flex flex-col items-center justify-center min-h-screen gap-8 p-8">
          <HeaderCard title="Mijn naam is rochee faverey!" description="Mijn eerste stage dag!" image1="/avatar.png" image2="/avatar.png" />
        </main>
      </div>
    </div>
  );
}
