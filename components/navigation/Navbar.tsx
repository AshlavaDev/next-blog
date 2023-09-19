import NavLink from "./NavLink"

const links = [
  {
    href: '/',
    text: 'Home'
  },
  {
    href: '/register',
    text: 'Register'
  }
]
export default function Navbar() {
  return (
    <nav className="flex justify-between px-4 md:px-8 py-4 border-b-2 border-black w-full">
      <span className="font-bold text-xl">
        Next Blog
      </span>
      <ul className="flex space-x-4">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.href} text={link.text} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
