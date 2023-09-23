import prisma from "@/app/lib/prismadb";

export default async function findAuthor(authorId: string) {
  try {
    const author = await prisma.user.findUnique({
      where : {
        id: authorId
      }
    })

    return author;
  } catch (error: any) {
    throw new Error(error);
  }


}