import NavLink from "./NavLink";

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/register",
    text: "Register",
  },
];
export default function Navbar() {
  return (
    <nav className="flex w-full justify-between border-b-2 border-black px-4 py-4 md:px-8">
      <span className="text-xl font-bold">Next Blog</span>
      <ul className="flex space-x-4">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.href} text={link.text} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
