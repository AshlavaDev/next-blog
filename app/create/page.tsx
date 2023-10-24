"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import Label from "@/components/form/Label";
import Input from "@/components/form/Input";
import ImageUpload from "@/components/form/ImageUpload";

interface InitialStateProps {
  title?: string;
  imageSrc: string;
  altText: string;
  description: string;
  content: string;
}

const initialState: InitialStateProps = {
  title: "",
  imageSrc: "",
  altText: "",
  description: "",
  content: "",
};

export default function Create() {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  }

  function onSubmit(event: FormEvent) {
    setLoading(true);

    event.preventDefault();

    axios
      .post("/api/blogs", state)
      .then(() => {
        toast.success("Blog created!");
        router.refresh();
        router.push("/");
      })
      .catch(() => {
        toast.error("Error creating blog");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function setCustomValue(id: any, value: any) {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-6 md:pt-16">
      <form
        className="flex w-full flex-col space-y-4 px-2 py-4 lg:w-1/2"
        onSubmit={onSubmit}
      >
        <div className="flex h-32 w-32 flex-col items-center justify-center self-center border border-gray-950 dark:border-gray-200 md:h-52 md:w-52">
          <ImageUpload
            value={state.imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label
            inputName="altText"
            labelText="Image Alt Text"
            optionalClasses={"self-center"}
          />
          <Input
            placeholder="Image Alt Text"
            id="altText"
            name="altText"
            type="text"
            value={state.altText}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col">
            <Label
              inputName="title"
              labelText="Blog Title"
              optionalClasses={"self-center"}
            />
            <Input
              placeholder="Blog Title"
              id="title"
              name="title"
              type="text"
              value={state.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label
              inputName="description"
              labelText="Short Blog Description"
              optionalClasses={"self-center"}
            />
            <Input
              placeholder="Short Blog Description"
              id="description"
              name="description"
              type="text"
              value={state.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label
              inputName="content"
              labelText="Blog Content"
              optionalClasses={"self-center"}
            />
            <textarea
              placeholder="Blog Content"
              required
              id="content"
              name="content"
              value={state.content}
              className="input"
              rows={8}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary self-end">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
