import Image from "next/image";
import Likebutton from "./LikeButton";
interface CardProps {
  title: string;
  description: string;
  emoji: string;
  image: string;
  link: string;
}

export default function Card({ title, description, emoji, image, link }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow flex flex-col h-full">
      <a href={link} className="block pb-4">
        <Image
          src={image}
          alt="Mijn hobby"
          width={120}
          height={120}
          className="w-full h-44 object-cover rounded-t-lg"
        />
      </a>

      <span className="text-3xl">{emoji}</span>
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-auto flex justify-center">
        <Likebutton />
      </div>
    </div>
  );
}
