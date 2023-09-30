import prisma from "@/app/lib/prismadb";

/**
 * Finds an author by their ID.
 * @param authorId - The ID of the author to find.
 * @returns A Promise that resolves to the author object if found, or null if not found.
 * @throws An error if there was an issue finding the author.
 */

export default async function findAuthor(authorId: string) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    return author;
  } catch (error: any) {
    throw new Error(error);
  }
}
