"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import Label from "@/components/form/Label";
import Input from "@/components/form/Input";
import ImageUpload from "@/components/form/ImageUpload";

interface InitialStateProps {
  name?: string;
  imageSrc: string;
  description: string;
}

const initialState: InitialStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

export default function Create() {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    <div className="flex flex-col items-center justify-center pt-6">
      <form
        className="flex w-1/2 flex-col space-y-4 px-2 py-4"
        onSubmit={onSubmit}
      >
        <ImageUpload
          value={state.imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Label inputName="name" labelText="Blog Title" />
            <Input
              placeholder="Blog Title"
              id="name"
              name="name"
              type="text"
              value={state.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label inputName="description" labelText="Blog Content" />
            <Input
              placeholder="Blog Content"
              id="description"
              name="description"
              type="text"
              value={state.description}
              onChange={handleChange}
              big={true}
            />
          </div>
          <button type="submit" className="btn-primary self-end">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
