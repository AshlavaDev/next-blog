import prisma from "@/app/lib/prismadb";
import { SafeBlog } from "@/types/type";

export default async function getAllBlogs(): Promise<SafeBlog[]> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeBlogs = blogs.map((blog: any) => ({
      ...blog,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    }));

    return safeBlogs;
  } catch (error: any) {
    throw new Error(error);
  }
}
