import Image from "next/image";
const box_hover = "hover:scale-105 transition-transform duration-60";
const box_box =
  "bg-secondary shadow-xl md:rounded-none rounded-full flex flex-col items-center justify-center gap-2 h-32 md:h-36 px-8";
const H1_css = "text-3xl md:text-4xl font-bold tracking-wide text-center leading-tight";
const P_css = "text-base md:text-lg text-mono text-center leading-snug";
interface HeaderCardProps {
  title: string;
  description: string;
  image1: string;
  image2: string;
}

export default function HeaderCard({ title, description,image1,image2 }: HeaderCardProps) {
  return (

            <div className={`flex md:flex-row flex-col items-center justify-center ${box_hover}`}>
              <Image
                src={image1}
                alt="Mijn avatar"
                width={120}
                height={120}
                className="h-32 md:h-36 w-32 md:w-36 object-cover md:rounded-l-full md:rounded-r-none rounded-full flex-shrink-0 overflow-hidden"
              />
              <div className={`${box_box}`}>
                <h1 className={`${H1_css}`}>{title}</h1>
                <p className= {`${P_css}`}>{description}</p>
              </div>
              <Image
                src={image1}
                alt="Mijn avatar"
                width={120}
                height={120}
                className="h-32 md:h-36 w-32 md:w-36 object-cover md:rounded-r-full md:rounded-l-none rounded-full flex-shrink-0 overflow-hidden"
              />
            </div>
  );
}
