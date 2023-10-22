"use client";

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
  return (
    <nav className="flex w-full items-center justify-between border-b-2 border-black px-4 py-4 md:px-8">
      <span className="text-xl font-bold">Next Blog</span>
      <ul className="flex items-center space-x-4">
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
    </nav>
  );
}
