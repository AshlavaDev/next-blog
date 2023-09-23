import getBlogs from "@/app/actions/getBlogs";
import getCurrentUser from "@/app/actions/getCurrentUser";
import HomePage from "@/components/home/HomePage";

export default async function Home() {
  const blogs = await getBlogs();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    if (blogs.length > 20) {
      blogs.slice(0, 20);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {currentUser ? (
        <div>
          {currentUser.name}
        </div>
      ) :
      (
        <HomePage blogs={blogs} />
      )}
    </main>
  );
}
