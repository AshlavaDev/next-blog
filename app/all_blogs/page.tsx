// Make about page or move functionality to logged out home page
import getBlogs from "@/app/actions/getBlogs";
import { SafeBlog } from "@/types/type";
import BlogCard from "@/components/blogs/BlogCard";

interface HomePageProps {
  blogs: SafeBlog[];
}

export default async function About() {
  const allBlogs = await getBlogs();
  let blogs: SafeBlog[] = [];

  if (allBlogs.length > 20) {
    allBlogs.slice(0, 20);
  }
  blogs = allBlogs.map((blog: any) => ({
    ...blog,
    updatedAt: blog.updatedAt.toString(),
  }));

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4">
      <h1 className="text-center text-5xl font-bold font-heading">Most Recent Posts</h1>
      <section className="w-full pt-8">

        <div className="flex w-full flex-col items-center gap-4 py-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
