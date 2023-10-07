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
    <div className="w-5/6 md:w-1/3 h-96 md:h-64 border-2 border-black flex flex-col md:flex-row items-center space-between p-2">
      <div className="w-1/2 aspect-h-1 flex items-center justify-center">
        {data.imageSrc === "" ? (
          <div className="w-full h-full flex items-center justify-center aspect-w-1 aspect-h-1">
            <div className="text-lg flex items-center justify-center">No Image</div>
          </div>
        ) : (
          <Image
            src={data.imageSrc}
            alt=""
            width={100}
            height={100}
            className="w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <Link
          href={"authors/" + author?.id}
          className="text-lg hover:text-red-800 md:text-xl"
        >
          {author?.name ?? "Unknown Author"}
        </Link>
        <p className="flex-grow text-lg">{data.description.slice(0, 100)}</p>

        <Link href={"/blogs/" + data.id} className="btn-primary self-end">
          Read More
        </Link>
      </div>
    </div>
  );
}
