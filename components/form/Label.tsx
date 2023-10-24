interface LabelProps {
  inputName: string;
  labelText: string;
  optionalClasses?: string;
}

export default function Label({
  inputName,
  labelText,
  optionalClasses,
}: LabelProps) {
  const labelStyles = `font-semibold md:text-lg ${optionalClasses}`;

  return (
    <label htmlFor={inputName} className={labelStyles}>
      {labelText}
    </label>
  );
}
