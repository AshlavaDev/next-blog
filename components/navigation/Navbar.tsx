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

//Change logged in home label to Profile

export default function Navbar({ currentUser }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <nav className="flex w-full items-center justify-between border-b-2 border-gray-950 px-4 py-4 dark:border-gray-200 md:px-8">
        {currentUser ? (
          <span className="flex items-center gap-2 font-heading text-lg font-bold md:text-xl">
            <div className="h-12 w-12 rounded-full border border-gray-950 dark:border-gray-200">
              {currentUser.imageSrc && (
                <Image
                  src={currentUser.imageSrc}
                  alt={currentUser.altText ?? ""}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              )}
            </div>
            {currentUser.name}
          </span>
        ) : (
          <span className="font-heading text-lg font-bold md:text-xl">
            Next Blogging
          </span>
        )}
        {currentUser ? (
          <ul className="hidden items-center space-x-4 md:flex">
            <li>
              <NavLink href="/" text="Profile" />
            </li>
            <li>
              <NavLink href="/create" text="Create Post" />
            </li>
            <li>
              <NavLink href="/all_blogs" text="Recent Blogs" />
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-1 text-lg hover:bg-gray-950 hover:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-950"
              >
                Sign Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="hidden items-center space-x-4 md:flex">
            <li>
              <NavLink href="/" text="Home" />
            </li>
            <li>
              <NavLink href="/all_blogs" text="Recent Blogs" />
            </li>
            <li>
              <NavLink href="/login" text="Sign In" />
            </li>
          </ul>
        )}
        <button className="pr-4 text-xl md:hidden" onClick={toggleMenu}>
          <AiOutlineMenu />
        </button>
      </nav>
      {currentUser ? (
        <ul
          className={`${
            menuOpen
              ? "absolute right-0 z-20 flex w-fit flex-col border-b-2 border-l-2 border-gray-950 bg-gray-200 pr-2 dark:border-gray-200 dark:bg-gray-950"
              : "hidden"
          }`}
        >
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink href="/" text="Profile" optionalStyles="w-full" />
          </li>
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink
              href="/create"
              text="Create Post"
              optionalStyles="w-full"
            />
          </li>
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink
              href="/all_blogs"
              text="Recent Blogs"
              optionalStyles="w-full"
            />
          </li>
          <li className="flex w-full justify-start">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="nav-link w-full text-start"
            >
              Sign Out
            </button>
          </li>
        </ul>
      ) : (
        <ul
          className={`${
            menuOpen
              ? "absolute right-0 z-20 flex w-fit flex-col border-b-2 border-l-2 border-black bg-white pr-2"
              : "hidden"
          }`}
        >
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink href="/" text="Home" optionalStyles="w-full" />
          </li>
          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink
              href="/all_blogs"
              text="Recent Blogs"
              optionalStyles="w-full"
            />
          </li>

          <li className="flex w-full" onClick={toggleMenu}>
            <NavLink href="/login" text="Sign In" optionalStyles="w-full" />
          </li>
        </ul>
      )}
    </>
  );
}
