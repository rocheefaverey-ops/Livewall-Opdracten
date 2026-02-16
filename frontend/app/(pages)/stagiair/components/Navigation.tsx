import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex h-fit flex-wrap gap-4 p-4 bg-tertiary shadow-sm w-full justify-center">
      <Link href="/stagiair" className="text-primary hover:underline">
        Home
      </Link>
      <Link href="/stagiair/hobby" className="text-primary hover:underline">
        Hobby's
      </Link>
    </nav>
  );
}