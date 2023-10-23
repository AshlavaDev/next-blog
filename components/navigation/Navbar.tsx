/*
  The Navbar component

  It renders the site title when not logged in, or the name of the user and their profile picture when logged in

  The navigation is standard line on larger screen and a drop down menu on smaller screens with a hamburger icon
*/

"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";

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

//TODO: profile picture for user
export default function Navbar({ currentUser }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <nav className="flex w-full items-center justify-between border-b-2 border-black px-4 py-4 md:px-8">
        {currentUser ? (
          <span className="flex items-center gap-2 text-lg font-bold md:text-xl">
            <div className="h-12 w-12 rounded-full border border-black">
              {currentUser.imageSrc && (
                <Image src={currentUser.imageSrc} alt={currentUser.altText ?? ""} width={48} height={48} className="object-cover rounded-full" />
              )}
            </div>
            {currentUser.name}
          </span>
        ) : (
          <span className="text-lg font-bold md:text-xl">Next Blogging</span>
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
      <ul
        className={`${
          menuOpen
            ? "absolute right-0 z-20 flex w-fit flex-col border-b-2 border-l-2 border-black bg-white pr-2"
            : "hidden"
        }`}
      >
        {links.map((link, index) => (
          <li key={index} className="flex w-full" onClick={toggleMenu}>
            <NavLink
              href={link.href}
              text={link.text}
              optionalStyles="w-full"
            />
          </li>
        ))}
        {currentUser && (
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink
              href="/create"
              text="Create Post"
              optionalStyles="w-full"
            />
          </li>
        )}
        {currentUser ? (
          <li className="flex w-full justify-start">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="nav-link w-full text-start"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink href="/login" text="Sign In" optionalStyles="w-full" />
          </li>
        )}
      </ul>
    </>
  );
}
