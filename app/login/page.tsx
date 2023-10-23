"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import NavLink from "@/components/navigation/NavLink";

interface LoginProps {
  email: string;
  password: string;
}

const initialState: LoginProps = {
  email: "",
  password: "",
};

const formElements = [
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

export default function Login() {
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

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }

      if (callback?.error) {
        throw new Error("Error signing in");
      }
    });

    router.push("/");
  }

  function setValue(element: any) {
    let value = "";

    if (element.type === "email") {
      value = state.email;
    } else {
      value = state.password;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-6 md:pt-20">
      <h1 className="my-4 text-4xl font-bold">Login</h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-xl">Don&apos;t have an account?</p>
        <NavLink href="/register" text="Register" />
      </div>
      <form
        className="flex w-full flex-col space-y-4 px-2 py-4 md:w-1/4"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-4">
          {formElements.map((element, index) => (
            <div key={index} className="flex w-full flex-col">
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
          Login
        </button>
      </form>
    </main>
  );
}
