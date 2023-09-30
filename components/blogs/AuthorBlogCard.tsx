"use client"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { SafeBlog } from "../../types/type"

interface AuthorBlogCardProps {
  data: SafeBlog
}
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
    <div className="flex items-center max-w-prose gap-4 h-30">
      <Image src={data.imageSrc} alt="" width={100} height={100} />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>
        <p className="text-lg">{data.content}</p>
      </div>
    </div>
  )
}
