import Image from "next/image"

interface BlogCardProps {
  title: string
  content: string
  imageSrc: string
}

export default function BlogCard({ title, content, imageSrc }: BlogCardProps) {
  return (
    <div className="flex items-center max-w-prose gap-4 h-30">
      <Image src={imageSrc} alt="" width={100} height={100} />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
        <p className="text-lg">{content}</p>
      </div>
    </div>
  )
}
