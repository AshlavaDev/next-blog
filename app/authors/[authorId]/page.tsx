//TODO: Make author page with all posts from author and maybe author description. Maybe make this section editable by the use if they are also the author
import findAuthor from "@/app/actions/findAuthor";
import getBlogsByAuthor from "@/app/actions/getBlogsByAuthor";
import getCurrentUser from "@/app/actions/getCurrentUser";
import AuthorBlogCard from "@/components/blogs/AuthorBlogCard";
import BlogCard from "@/components/blogs/BlogCard";
import { SafeBlog } from "@/types/type";

interface IParams {
  authorId: string;
}

export default async function Author({ params }: { params: IParams }) {
  const authorData = await findAuthor(params.authorId);
  const currentUser = await getCurrentUser();
  let authorBlogs: SafeBlog[] | null = null;

  if (authorData) {
    const blogs = await getBlogsByAuthor(params);
    if (blogs !== null) {
      authorBlogs = blogs.map((blog) => ({
        ...blog,
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
      }));
    }
  }

  function blogListRender() {
    let blogList;

    if (authorBlogs?.length === 0) {
      blogList = (
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          No Blogs Found
        </h2>
      );
    } else {
      if (currentUser?.id === authorData?.id) {
        blogList = authorBlogs?.map((blog: any, index) => (
          <AuthorBlogCard key={index} data={blog} />
        ));
      } else {
        blogList = authorBlogs?.map((blog: any, index) => (
          <BlogCard key={index} data={blog} />
        ));
      }
    }

    return blogList;
  }

  const blogList = blogListRender();

  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <h1 className="py-6 text-2xl font-bold md:text-4xl">
        {authorData?.name}
      </h1>
      <div className="flex w-full flex-col items-center gap-4 py-4">
        {blogList}
      </div>
    </main>
  );
}
