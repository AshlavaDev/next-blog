// A separate component for the blog page so it can be use client without breaking prisma
"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { SafeBlog, SafeUser } from "@/types/type";
import DeleteModal from "@/components/modals/DeleteModal";
import UpdateBlogModal from "@/components/modals/UpdateBlogModal";

interface BlogPageProps {
  blogData: SafeBlog | null;
  blogAuthor: SafeUser | null;
  currentUser: SafeUser | null;
}

export default function BlogPage({
  blogData,
  blogAuthor,
  currentUser,
}: BlogPageProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const router = useRouter();

  const onDelete = () => {
    if (blogData) {
      axios
        .delete(`/api/blogs/${blogData.id}`)
        .then(() => {
          toast.success("Blog deleted!");
          router.refresh();
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error deleting blog");
        });
    }
  };

  /**
   * Renders the author section of a blog post.
   * @param blogAuthor - The author of the blog post.
   * @param currentUser - The current user viewing the blog post.
   * @returns The author section of the blog post.
   */
  function authorSectionRender(blogAuthor: any, currentUser: any) {
    let section;

    if (blogAuthor === null) {
      section = (
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          {"Unknown Author"}
        </h2>
      );
    } else if (blogAuthor.id === currentUser?.id) {
      section = (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            {blogAuthor?.name}
          </h2>
          <div className="flex gap-4">
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
              blogData={blogData}
              onClose={() => setShowUpdateModal(false)}
            />
          )}
        </div>
      );
    } else {
      section = (
        <Link
          href="/authors/[authorId]"
          as={`/authors/${blogAuthor?.id}`}
          className="text-center text-xl font-semibold md:text-2xl"
        >
          {blogAuthor?.name}
        </Link>
      );
    }

    return section;
  }

  const authorSection = authorSectionRender(blogAuthor, currentUser);

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-6 px-2 pt-8">
      {blogData ? (
        <>
          <section className="flex max-w-prose flex-col items-center gap-4">
            <Image src={blogData.imageSrc} alt="" width={200} height={200} />
            <h1 className="text-center text-2xl font-bold md:text-4xl">
              {blogData?.title}
            </h1>
            {authorSection}
          </section>
          <section className="flex max-w-prose flex-col gap-6">
            <p className="md:text-lg">{blogData?.description}</p>
            <p className="md:text-lg">{blogData?.content}</p>
          </section>
        </>
      ) : (
        <h1 className="text-4xl font-bold md:text-6xl">Blog not found!</h1>
      )}
    </main>
  );
}
