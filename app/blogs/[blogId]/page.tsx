//TODO: Finish page and make an edit mode and have logged in edit and delete buttons and logged out/ not user author link

import Image from "next/image";
import Link from "next/link";

import findAuthor from "@/app/actions/findAuthor";
import getBlogById from "@/app/actions/getBlogById";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  blogId: string;
}

export default async function Blog({params}: {params: IParams}) {
  const data = await getBlogById(params);
  let blogAuthor;
  if (data) {
    blogAuthor = await findAuthor(data.userId);
  }

  const currentUser = await getCurrentUser();

  function authorSectionRender(blogAuthor: any, currentUser: any) {
    if (blogAuthor) {
      let section;

      if(blogAuthor === null) {
        section = 
          <h2 className="text-xl md:text-2xl font-semibold text-center">{"Unknown Author"}</h2>
      }
      else if (blogAuthor.id === currentUser?.id) {
        section =
          <h2 className="text-xl md:text-2xl font-semibold text-center">{blogAuthor?.name}</h2>
        
      } else {
        section =
          <Link href="/authors/[authorId]" as={`/authors/${blogAuthor?.id}`} className="text-xl md:text-2xl font-semibold text-center">{blogAuthor?.name}</Link>
        
      }

      return section;
    }
  }

  const authorSection = authorSectionRender(blogAuthor, currentUser);

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 gap-6">
      {data ? (
      <>
        <section className="flex flex-col gap-4 max-w-prose">
          <Image src={data.imageSrc} alt="" width={200} height={200} />
          <h1 className="text-2xl md:text-4xl font-bold text-center">{data?.title}</h1>
          {authorSection}
        </section>
        <section className="flex flex-col gap-6 max-w-prose">
          <p className="md:text-lg">{data?.description}</p>
          <p className="md:text-lg">{data?.content}</p>
        </section>
      </>
      ) : (
        <h1 className="text-4xl md:text-6xl font-bold">Blog not found!</h1>
      )}
    </main>

     
  );
}