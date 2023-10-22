import Image from "next/image";
import Link from "next/link";

import findAuthor from "@/app/actions/findAuthor";
import { SafeBlog } from "@/types/type";

interface BlogCardProps {
  data: SafeBlog;
}

export default async function BlogCard({ data }: BlogCardProps) {
  const author = await findAuthor(data.userId);

  return (
    <div className="flex h-96 w-5/6 flex-col items-center justify-between gap-2 border-2 border-black px-2 py-4 md:h-72 md:w-1/3">
      <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-3">
        <div className="aspect-h-1 flex w-1/2 items-center justify-center md:w-full">
          {data.imageSrc === "" ? (
            <div className="aspect-h-1 aspect-w-1 flex h-full w-full items-center justify-center">
              <div className="flex items-center justify-center text-lg">
                No Image
              </div>
            </div>
          ) : (
            <Image
              src={data.imageSrc}
              alt=""
              width={300}
              height={300}
              className="h-full w-full"
            />
          )}
        </div>
        <div className="flex grow flex-col md:col-span-2 md:max-w-prose">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <Link
            href={"authors/" + author?.id}
            className="text-lg hover:text-red-800 md:text-xl"
          >
            {author?.name ?? "Unknown Author"}
          </Link>
          <p className="flex-grow text-lg">{data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description}</p>
        </div>
      </div>
      <Link href={"/blogs/" + data.id} className="btn-primary">
        Read More
      </Link>
    </div>
  );
}
