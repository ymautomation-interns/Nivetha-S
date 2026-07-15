import Field from "./Field.jsx";

export default function SelectField({
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
  required,
  disabled,
  mono,
  touched,
  valid,
  message,
}) {
  return (
    <Field name={name} label={label} required={required} touched={touched} valid={valid} message={message}>
      <select
        id={name}
        className={mono ? "mono" : ""}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(name, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
