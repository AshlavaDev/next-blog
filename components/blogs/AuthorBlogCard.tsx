// The card for when the author is logged in

"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { SafeBlog } from "../../types/type";

interface AuthorBlogCardProps {
  data: SafeBlog;
}

//TODO: Make uniform size, add modal confirmation for delete

export default function AuthorBlogCard({ data }: AuthorBlogCardProps) {
  const router = useRouter();

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {});
  };

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/blogs/${data.id}`}
        className="h-30 flex max-w-prose items-center gap-4 border-2 p-2 hover:border-black"
      >
        <Image src={data.imageSrc} alt="" width={100} height={100} />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">{data.title}</h1>
          <p className="text-lg">{data.description}</p>
        </div>
      </Link>
      <div className="flex justify-end gap-2">
        <button onClick={onDelete} className="btn-secondary">
          Delete
        </button>
        <button className="btn-primary">Edit</button>
      </div>
    </div>
  );
}
