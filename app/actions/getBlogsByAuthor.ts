import prisma from "@/app/lib/prismadb";

interface IParams {
  authorId: string;
}

export default async function getBlogsByAuthor(params: IParams) {
  try {
    const { authorId } = params;

    const blogs = await prisma.blog.findMany({
      where: {
        userId: authorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!blogs) {
      return null;
    }

    return blogs.map((blog: any) => ({
      ...blog,
      createAt: blog.createdAt.toISOString(),
      user: {
        ...blog,
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
      },
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
