import { Blog, SafeUser } from "@/types/type";
import Link from "next/link";
import AuthorBlogCard from "../blogs/AuthorBlogCard";

interface LoggedInHomePageProps {
  blogs: Blog[];
  currentUser: SafeUser | null; 
}

export default function LoggedInHomePage({ blogs, currentUser }: LoggedInHomePageProps) {
  return (
    <div className="flex flex-col w-full">
      <section className="flex flex-col items-center py-12">
        <h1 className="text-4xl py-6">Welcome, {currentUser?.name}</h1>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg">Do you want to write a post?</p>
          <Link href="/create" className="btn-primary">Create Post</Link>
        </div>
      </section>
      <section className="pt-8 border-t-2 border-black w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Your Posts</h2>
        <div className="flex flex-col gap-4 pt-8">
          {blogs.map((blog, index) => (
            <AuthorBlogCard key={index} title={blog.name} content={blog.description} imageSrc={blog.imageSrc} />
          ))}
        </div>
      </section>
    </div>
  )
}
