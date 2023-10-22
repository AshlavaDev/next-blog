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
  blogs = allBlogs.map((blog) => ({
    ...blog,
    updatedAt: blog.updatedAt.toISOString(),
  }));

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-5xl font-bold text-center">Most Recent Posts</h1>
      <section className="pt-8">
        <h2 className="text-center text-2xl">Recent Posts</h2>

        <div className="flex flex-col items-center gap-4 py-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
