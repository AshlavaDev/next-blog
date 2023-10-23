// The card for when the author is logged in

"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

import { SafeBlog } from "@/types/type";
import DeleteModal from "@/components/modals/DeleteModal";
import UpdateBlogModal from "@/components/modals/UpdateBlogModal";

interface AuthorBlogCardProps {
  data: SafeBlog;
}

//TODO: Make uniform size

export default function AuthorBlogCard({ data }: AuthorBlogCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const router = useRouter();

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
      .then(() => {
        toast.success("Blog deleted!");
        router.refresh();
        router.push("/");
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {});
  };

  return (
    <div className="flex w-5/6 flex-col gap-2 md:w-1/3">
      <Link
        href={`/blogs/${data.id}`}
        className="flex max-h-96 w-full flex-col items-center justify-center gap-2 border-2 px-2 py-4 hover:border-black md:grid md:max-h-64 md:grid-cols-3"
      >
        <div className="aspect-h-1 flex w-1/2 items-center justify-center md:w-full">
          <Image
            src={data.imageSrc}
            alt=""
            width={300}
            height={300}
            className="h-full w-full"
          />
        </div>
        <div className="flex grow flex-col md:col-span-2 md:max-w-prose">
          <h1 className="text-2xl font-bold md:text-4xl">{data.title}</h1>
          <p className="text-lg">
            {data.description.length > 80
              ? data.description.slice(0, 80) + "..."
              : data.description}
          </p>
        </div>
      </Link>
      <div className="flex justify-end gap-2">
        <button
          className="btn-secondary"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
        <button
          className="btn-primary"
          onClick={() => setShowUpdateModal(true)}
        >
          Edit
        </button>
      </div>
      {showDeleteModal && (
        <DeleteModal
          onDelete={onDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {showUpdateModal && (
        <UpdateBlogModal
          blogData={data}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
}
