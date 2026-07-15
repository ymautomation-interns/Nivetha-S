import Field from "./Field.jsx";

export default function TextField({
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  mono,
  required,
  full,
  readOnly,
  disabled,
  inputMode,
  type,
  min,
  max,
  touched,
  valid,
  message,
}) {
  return (
    <Field name={name} label={label} required={required} full={full} touched={touched} valid={valid} message={message}>
      <input
        type={type || "text"}
        id={name}
        className={mono ? "mono" : ""}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        readOnly={readOnly}
        disabled={disabled}
        inputMode={inputMode}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
      />
    </Field>
  );
}
