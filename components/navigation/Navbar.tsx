"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

import { SafeUser } from "@/types/type";
import NavLink from "./NavLink";
import { signOut } from "next-auth/react";

interface NavProps {
  currentUser: SafeUser | null;
}

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/all_blogs",
    text: "Recent Blogs",
  },
];

//TODO: MAKE MOBILE NAV and UPDATE TITLE BASED ON USE LOGIN
export default function Navbar({ currentUser }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
  <>
    <nav className="flex w-full items-center justify-between border-b-2 border-black px-4 py-4 md:px-8">
      {currentUser ? (
        <span className="text-lg font-bold md:text-xl">{currentUser.name}</span>
      ) : (
        <span className="text-lg font-bold md:text-xl">Next Blog</span>
      )}
      <ul className="hidden items-center space-x-4 md:flex">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.href} text={link.text} />
          </li>
        ))}
        {currentUser && (
          <li>
            <NavLink href="/create" text="Create Post" />
          </li>
        )}
        {currentUser ? (
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="p-2 text-lg hover:bg-black hover:text-white"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <NavLink href="/login" text="Sign In" />
          </li>
        )}
      </ul>
      <button className="pr-4 text-xl md:hidden" onClick={toggleMenu}>
        <AiOutlineMenu />
      </button>
    </nav>
    <ul className={`${menuOpen ? "flex flex-col z-20 bg-white w-fit absolute right-0 pr-2 pt-1" : "hidden"}`}>
        {links.map((link, index) => (
          <li key={index} className="w-full flex" onClick={toggleMenu}>
            <NavLink href={link.href} text={link.text} optionalStyles="w-full" />
          </li>
        ))}
        {currentUser && (
          <li className="w-full flex" onClick={toggleMenu}>
            <NavLink href="/create" text="Create Post" optionalStyles="w-full" />
          </li>
        )}
        {currentUser ? (
          <li className="w-full flex justify-start">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="nav-link w-full text-start"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <li className="w-full flex" onClick={toggleMenu}>
            <NavLink href="/login" text="Sign In" optionalStyles="w-full" />
          </li>
        )}
      </ul>
  </>
  );
}
