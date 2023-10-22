"use client";

interface InputProps {
  type: any;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  placeholder?: string;
}

export default function Input({
  type,
  value,
  onChange,
  name,
  id,
  placeholder,
}: InputProps) {
  return (
    <input
      required
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className="input"
    ></input>
  );
}
