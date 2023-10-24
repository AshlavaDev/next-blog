"use client";

import { useState } from "react";

import { SafeBlog, SafeUser } from "@/types/type";
import Link from "next/link";
import AuthorBlogCard from "../blogs/AuthorBlogCard";
import UpdateProfile from "../modals/UpdateProfile";

interface LoggedInHomePageProps {
  blogs: SafeBlog[];
  currentUser: SafeUser | null;
}

export default function LoggedInHomePage({
  blogs,
  currentUser,
}: LoggedInHomePageProps) {
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  return (
    <main className="flex w-full flex-col pb-8">
      <section className="flex flex-col items-center py-12">
        <h1 className="py-6 text-center font-heading text-4xl">
          Welcome, {currentUser?.name}
        </h1>
        <button
          className="btn-secondary"
          onClick={() => setShowUpdateProfileModal(true)}
        >
          Update Profile
        </button>
        <div className="flex flex-col items-center gap-4 pt-6">
          <p className="text-lg">Do you want to write a post?</p>
          <Link href="/create" className="btn-primary">
            Create Post
          </Link>
        </div>
      </section>
      <section className="flex w-full flex-col items-center border-t-2 border-gray-950 pt-8 dark:border-gray-200">
        <h2 className="font-heading text-2xl font-semibold">Your Posts</h2>
        <div className="flex w-full flex-col items-center gap-4 pt-8">
          {blogs.map((blog, index) => (
            <AuthorBlogCard key={index} data={blog} />
          ))}
        </div>
      </section>
      {showUpdateProfileModal && (
        <UpdateProfile
          onClose={() => setShowUpdateProfileModal(false)}
          user={currentUser}
        />
      )}
    </main>
  );
}
