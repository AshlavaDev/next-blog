/*
  This modal pops up when a user wishes to update one of their blogs.
  It currently only updates the title, description, and content.
*/

import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { SafeBlog } from "@/types/type";
import ImageUpload from "@/components/form/ImageUpload";

interface IProps {
  onClose: () => void;
  blogData: SafeBlog | null;
}

export default function UpdateBlogModal({ onClose, blogData }: IProps) {
  const [state, setState] = useState({
    title: blogData?.title ?? "",
    description: blogData?.description ?? "",
    content: blogData?.content ?? "",
    imageSrc: blogData?.imageSrc ?? "",
    altText: blogData?.altText ?? "",
  });
  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function setCustomValue(id: any, value: any) {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (blogData) {
      axios
        .put(`/api/blogs/${blogData.id}`, state)
        .then(() => {
          toast.success("Blog updated!");
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error updating blog");
        });
    }

    onClose();
  }

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50 px-2"
      style={{ zIndex: 9999 }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-950 md:w-1/2"
      >
        <h2 className="mb-4 font-heading text-lg font-medium">Update Blog</h2>
        <div className="mb-4">
          <label className="mb-2 block font-medium">Title</label>
          <textarea
            className="w-full rounded-lg border border-gray-400 p-2 text-gray-800"
            id="title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            className="w-full rounded-lg border border-gray-400 p-2 text-gray-800"
            id="description"
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium">Content</label>
          <textarea
            className="w-full rounded-lg border border-gray-400 p-2 text-gray-800"
            id="content"
            value={state.content}
            onChange={handleChange}
          />
        </div>
        <div className="flex h-32 w-32 flex-col items-center justify-center self-center border border-gray-950 dark:border-gray-200">
          <ImageUpload
            value={state.imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium">
            Your Profile Image Alt Text
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2 text-gray-800"
            type="text"
            id="altText"
            value={state.altText}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
