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
