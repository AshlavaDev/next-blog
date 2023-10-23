/*
  This modal allows a user to update their profile, infomration rendered on their author page with the image also going in their own navbar
*/

import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/types/type";
import ImageUpload from "@/components/form/ImageUpload";

interface IProps {
  onClose: () => void;
  user: SafeUser | null;
}

interface InitialStateProps {
  name: string;
  imageSrc: string;
  altText: string;
  userDescription: string;
}

const initialState: InitialStateProps = {
  name: "",
  imageSrc: "",
  altText: "",
  userDescription: "",
};

export default function UpdateProfile({ onClose, user }: IProps) {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if(user) {
      setState({
        name: user?.name ?? "",
        imageSrc: user?.imageSrc ?? "",
        altText: user?.altText ?? "",
        userDescription: user?.userDescription ?? "",
      })
    }
  }, [user]);


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

    axios
    .put(`/api`, state)
    .then(() => {
      toast.success("Blog updated!");
      router.refresh();
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error updating blog");
    });

    onClose();
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 px-2"
    style={{ zIndex: 9999 }}>
      <form onSubmit={handleSubmit}
        className="w-full rounded-lg bg-white p-6 shadow-lg md:w-1/2 flex flex-col">
        <h2 className="mb-4 text-lg font-medium">Update Profile</h2>
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">Name</label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            type="text"
            id="name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">
            Tell Us About Yourself
          </label>
          <textarea
            className="min-h-[240px] w-full rounded-lg border border-gray-400 p-2"
            id="userDescription"
            value={state.userDescription}
            onChange={handleChange}
          />
        </div>
        <div className="flex h-32 w-32 flex-col items-center justify-center self-center border border-black">
          <ImageUpload
            value={state.imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium text-gray-700">
            Your Profile Image Alt Text
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
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
  )
}
