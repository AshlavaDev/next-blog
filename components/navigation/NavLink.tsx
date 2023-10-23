import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
  optionalStyles?: string;
}

export default function NavLink({ href, text, optionalStyles }: NavLinkProps) {
  return (
    <Link href={href} className={`nav-link ${optionalStyles}`}>
      {text}
    </Link>
  );
}
