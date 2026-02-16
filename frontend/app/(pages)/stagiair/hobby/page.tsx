import Card from "../components/Card";
import HeaderCard from "../components/HeaderPage";
const box_hover = "hover:scale-105 transition-transform duration-60";
const box_box = "bg-secondary shadow-xl md:rounded-none rounded-full flex items-center  justify-center h-32 md:h-36 px-8";
const H1_css = "text-4xl font-bold tracking-wide text-center gap-4";
const P_css = "text-lg text-mono text-center";

const hobbies = [
  { id: 1, name: "Gamen", emoji: "🎮", description: "Story-driven RPG's en Soulslikes voor de uitdaging.", image: "/Fromsoftwaregames (1).jpg", link: "https://rocheefaverey.com/" },
  { id: 2, name: "Koken", emoji: "🍳", description: "Comfort food en Aziatische gerechten uitproberen.", image: "/Cooking.jpg", link: "https://rocheefaverey.com/" },
  { id: 3, name: "Manga lezen", emoji: "📚", description: "Shonen en seinen lezen tijdens de treinrit of voor het slapen.", image: "/Manga.jpg", link: "https://rocheefaverey.com/" },
  { id: 4, name: "Boeken", emoji: "📖", description: "Light novels en sci-fi voor worldbuilding inspiratie.", image: "/reading.jpg", link: "https://rocheefaverey.com/" },
  { id: 5, name: "3D modelleren", emoji: "🛠️", description: "Modellen bouwen in Blender die ik later kan printen.", image: "/3D_Printing.jpg", link: "https://rocheefaverey.com/" },
  { id: 6, name: "3D games maken", emoji: "🕹️", description: "Experimenteren met kleine 3D game-prototypes en mechanics.", image: "/unitygameeditor.jpg", link: "https://rocheefaverey.com/" },
];

export default function HobbyPage() {
  return (
    
    

      <div className="w-full flex-wrap justify-center bg-tertiary text-center min-h-screen">
        <div className="bg-tertiary flex justify-center">
          <main className="bg-primary flex flex-col full  min-h-screen gap-8 p-8">
          <HeaderCard title = "Mijn Hobby's" description= "Wat mij bezig houdt buiten de stage om." image1 = "/avatar.png" image2 = "/avatar.png" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl">
              {hobbies.map((hobby) => (<Card title = {hobby.name} emoji={hobby.emoji} description={hobby.description} image={hobby.image} key={hobby.id} link={hobby.link} />
                
              ))}
            </div>
          </main>
        </div>
      </div>


);
}
