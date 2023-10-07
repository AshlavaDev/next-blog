import Image from "next/image";
import Link from "next/link";

import findAuthor from "@/app/actions/findAuthor";
import { SafeBlog } from "@/types/type";

interface BlogCardProps {
  data: SafeBlog;
}

//TODO: Make uniform size

export default async function BlogCard({ data }: BlogCardProps) {
  const author = await findAuthor(data.userId);

  return (
    <div className="w-5/6 md:w-2/5 h-96 md:h-64 lg:h-96 border-2 border-black flex flex-col items-center justify-center px-2 gap-2">
      <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4">
        <div className="w-1/2 md:w-full aspect-h-1 flex items-center justify-center">
          {data.imageSrc === "" ? (
            <div className="w-full h-full flex items-center justify-center aspect-w-1 aspect-h-1">
              <div className="text-lg flex items-center justify-center">No Image</div>
            </div>
          ) : (
            <Image
              src={data.imageSrc}
              alt=""
              width={300}
              height={300}
              className="w-full h-full"
            />
          )}
        </div>
        <div className="flex flex-col grow md:col-span-2 md:max-w-prose">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <Link
            href={"authors/" + author?.id}
            className="text-lg hover:text-red-800 md:text-xl"
          >
            {author?.name ?? "Unknown Author"}
          </Link>
          <p className="flex-grow text-lg">{data.description.slice(0, 100)}</p>
        </div>
      </div>
      <Link href={"/blogs/" + data.id} className="btn-primary">
          Read More
        </Link>
    </div>
  );
}
