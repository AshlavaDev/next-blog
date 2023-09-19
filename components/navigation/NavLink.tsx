import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link href={href} className="p-2 text-lg hover:bg-black hover:text-white">
      {text}
    </Link>
  );
}
