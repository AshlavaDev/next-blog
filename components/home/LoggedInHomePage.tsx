import { SafeBlog, SafeUser } from "@/types/type";
import Link from "next/link";
import AuthorBlogCard from "../blogs/AuthorBlogCard";

interface LoggedInHomePageProps {
  blogs: SafeBlog[];
  currentUser: SafeUser | null;
}

export default function LoggedInHomePage({
  blogs,
  currentUser,
}: LoggedInHomePageProps) {
  return (
    <div className="flex w-full flex-col pb-8">
      <section className="flex flex-col items-center py-12">
        <h1 className="py-6 text-center text-4xl">
          Welcome, {currentUser?.name}
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Do you want to write a post?</p>
          <Link href="/create" className="btn-primary">
            Create Post
          </Link>
        </div>
      </section>
      <section className="flex w-full flex-col items-center border-t-2 border-black pt-8">
        <h2 className="text-2xl font-semibold">Your Posts</h2>
        <div className="flex w-full flex-col items-center gap-4 pt-8">
          {blogs.map((blog, index) => (
            <AuthorBlogCard key={index} data={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
