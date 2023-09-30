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
    <Link
      href={"/blogs/" + data.id}
      className="h-30 flex max-w-prose items-center gap-4 border-2 p-2 hover:border-black"
    >
      <Image src={data.imageSrc} alt="" width={100} height={100} />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold md:text-4xl">{data.title}</h1>
        <p className="text-lg">{author?.name ?? "Unknown Author"}</p>
        <p className="text-lg">{data.description}</p>
      </div>
    </Link>
  );
}
