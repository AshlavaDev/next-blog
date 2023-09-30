import getBlogs from "@/app/actions/getBlogs";
import getCurrentUser from "@/app/actions/getCurrentUser";
import LoggedInHomePage from "@/components/home/LoggedInHomePage";
import HomePage from "@/components/home/HomePage";
import { SafeBlog } from "@/types/type";

//TODO: App list of todos: Author select from other users that lists their blogs, ways to look at all blogs when logged in, search functionality, code documentation, mobile style

export default async function Home() {
  const allBlogs = await getBlogs();
  let blogs: SafeBlog[] = [];

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    if (allBlogs.length > 20) {
      allBlogs.slice(0, 20);
    }
    blogs = allBlogs.map((blog) => ({
      ...blog,
      updatedAt: blog.updatedAt.toISOString(),
    }));
  } else {
    blogs = allBlogs
      .filter((blog) => blog.userId === currentUser.id)
      .map((blog) => ({
        ...blog,
        updatedAt: blog.updatedAt.toISOString(),
      }));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {currentUser ? (
        <LoggedInHomePage blogs={blogs} currentUser={currentUser} />
      ) : (
        <HomePage blogs={blogs} />
      )}
    </main>
  );
}
