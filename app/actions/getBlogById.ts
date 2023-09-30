import prisma from "@/app/lib/prismadb";

interface IParams {
  blogId: string;
}

export default async function getBlogById(params: IParams) {
  try {
    const { blogId } = params;

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        user: true,
      },
    });

    if (!blog) {
      return null;
    }

    return {
      ...blog,
      createAt: blog.createdAt.toISOString(),
      user: {
        ...blog.user,
        createdAt: blog.user.createdAt.toISOString(),
        updatedAt: blog.user.updatedAt.toISOString(),
        emailVerified: blog.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
