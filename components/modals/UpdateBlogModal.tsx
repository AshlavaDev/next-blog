//TODO: Get text area to accept standard line breaks and formatting
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { SafeBlog } from "@/types/type";

interface IProps {
  onClose: () => void;
  blogData: SafeBlog | null;
}

export default function UpdateBlogModal({ onClose, blogData }: IProps) {
  const [title, setTitle] = useState(blogData?.title);
  const [description, setDescription] = useState(blogData?.description);
  const [content, setContent] = useState(blogData?.content);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>, name: string) {
    const { value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "content":
        setContent(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const updatedBlogData = {
      title,
      description,
      content,
    };

    console.log(typeof updatedBlogData);

    if (blogData) {
      axios
        .put(`/api/blogs/${blogData.id}`, updatedBlogData)
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
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 9999 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-1/2 rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-lg font-medium">Update Blog</h2>
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">Title</label>
          <textarea
            className="w-full rounded-lg border border-gray-400 p-2"
            value={title}
            onChange={(e) => handleChange(e, "title")}
          />
        </div>
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-400 p-2"
            value={description}
            onChange={(e) => handleChange(e, "description")}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">
            Content
          </label>
          <textarea
            className="min-h-[240px] w-full rounded-lg border border-gray-400 p-2"
            value={content}
            onChange={(e) => handleChange(e, "content")}
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
