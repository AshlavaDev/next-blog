//TODO: Finish page and make an edit mode

import Image from "next/image";

import findAuthor from "@/app/actions/findAuthor";
import getBlogById from "@/app/actions/getBlogById";

interface IParams {
  blogId: string;
}

export default async function Blog({params}: {params: IParams}) {
  const data = await getBlogById(params);
  let blogAuthor;
  if (data) {
    blogAuthor = await findAuthor(data.userId);
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-16 gap-6">
      {data ? (
      <>
        <section className="flex flex-col gap-4 max-w-prose">
          <Image src={data.imageSrc} alt="" width={200} height={200} />
          <h1 className="text-2xl md:text-4xl font-bold text-center">{data?.title}</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-center">{blogAuthor?.name ?? "Unknown Author"}</h2>
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