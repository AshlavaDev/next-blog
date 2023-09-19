interface LabelProps {
  inputName: string;
  labelText: string;
}

export default function Label({ inputName, labelText }: LabelProps) {
  return (
    <label htmlFor={inputName} className="font-semibold text-black md:text-lg">
      {labelText}
    </label>
  );
}
