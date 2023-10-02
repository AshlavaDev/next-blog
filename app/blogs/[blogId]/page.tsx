//TODO: Finish page and make an edit mode and have logged in edit and delete buttons and logged out/ not user author link

import Image from "next/image";
import Link from "next/link";

import findAuthor from "@/app/actions/findAuthor";
import getBlogById from "@/app/actions/getBlogById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeBlog } from "@/types/type";

interface IParams {
  blogId: string;
}

interface BlogProps {
  isEditing: boolean;
}

export default async function Blog({ params }: { params: IParams }, {isEditing}: BlogProps) {
  const data = await getBlogById(params);
  let blogAuthor;
  if (data) {
    blogAuthor = await findAuthor(data.userId);
  }

  const currentUser = await getCurrentUser();

  /**
   * Renders the author section of a blog post.
   * @param blogAuthor - The author of the blog post.
   * @param currentUser - The current user viewing the blog post.
   * @returns The author section of the blog post.
   */
  function authorSectionRender(blogAuthor: any, currentUser: any) {
    let section;

    if (blogAuthor === null) {
      section = (
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          {"Unknown Author"}
        </h2>
      );
    } else if (blogAuthor.id === currentUser?.id) {
      section = (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            {blogAuthor?.name}
          </h2>
          <div className="flex gap-4">
            {/* TODO: Add delete and edit functionality */}
            <button className="btn-secondary">Delete</button>
            <button className="btn-primary">Edit</button>
          </div>
        </div>
      );
    } else {
      section = (
        <Link
          href="/authors/[authorId]"
          as={`/authors/${blogAuthor?.id}`}
          className="text-center text-xl font-semibold md:text-2xl"
        >
          {blogAuthor?.name}
        </Link>
      );
    }

    return section;
  }

  const authorSection = authorSectionRender(blogAuthor, currentUser);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 pt-8">
      {data ? (
        <>
        <section className="flex max-w-prose flex-col gap-4">
          <Image src={data.imageSrc} alt="" width={200} height={200} />
          <h1 className="text-center text-2xl font-bold md:text-4xl">
            {data?.title}
          </h1>
          {authorSection}
        </section>
        <section className="flex max-w-prose flex-col gap-6">
          <p className="md:text-lg">{data?.description}</p>
          <p className="md:text-lg">{data?.content}</p>
        </section>
      </>
      ) : (
        <h1 className="text-4xl font-bold md:text-6xl">Blog not found!</h1>
      )}
    </main>
  );
}
