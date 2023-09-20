"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import NavLink from "@/components/navigation/NavLink";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

const initialState: RegisterProps = {
  name: "",
  email: "",
  password: "",
};

const formElements = [
  {
    name: "name",
    placeholder: "Name",
    id: "name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    id: "email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    id: "password",
    type: "password",
  },
];

export default function Register() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {})
      .finally(() => {});
  }

  function setValue(element: any) {
    let value = "";

    if (element.type === "email") {
      value = state.email;
    } else if (element.type === "password") {
      value = state.password;
    } else {
      value = state.name;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <h1 className="my-4 text-4xl font-bold">Register</h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-xl">Already have an account?</p>
        <NavLink href="/login" text="Login" />
      </div>
      <form
        className="flex w-1/2 flex-col space-y-4 px-2 py-4"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4">
          {formElements.map((element, index) => (
            <div key={index} className="flex flex-col">
              <Label inputName={element.id} labelText={element.placeholder} />
              <Input
                name={element.name}
                id={element.id}
                type={element.type}
                placeholder={element.placeholder}
                value={setValue(element)}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn-primary self-end">
          Submit
        </button>
      </form>
    </div>
  );
}
