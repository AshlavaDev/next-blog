// The card for when the author is logged in

"use client"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { SafeBlog } from "../../types/type"

interface AuthorBlogCardProps {
  data: SafeBlog
}

//TODO: Make uniform size, add modal confirmation for delete

export default function AuthorBlogCard({ data }: AuthorBlogCardProps) {
  const router = useRouter();

  const onDelete = () => {
    axios.delete(`/api/blogs/${data.id}`)
    .then(() => {
      router.refresh()
    })
    .catch((error) => {
      throw new Error(error);
    })
    .finally(() => {
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/blogs/${data.id}`} className="flex items-center max-w-prose gap-4 h-30 border-2 hover:border-black p-2">
        <Image src={data.imageSrc} alt="" width={100} height={100} />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>
          <p className="text-lg">{data.description}</p>
        </div>
      </Link>
      <div className="flex gap-2 justify-end">
        <button onClick={onDelete} className="btn-secondary">Delete</button>
        <button className="btn-primary">Edit</button>
      </div>
    </div>
  )
}
