import Label from "../common/Label";
import HelperText from "../common/HelperText";
import ErrorMessage from "../common/ErrorMessage";

function InputField({
  id,
  type = "text",
  inputMode,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  error,
  disabled = false,
  readOnly = false,
  minLength,
  maxLength,
  min,
  max,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Label
        htmlFor={id}
        text={label}
        required={required}
      />

      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginTop: "6px",
          boxSizing: "border-box",
        }}
      />

      <HelperText text={helperText} />
      <ErrorMessage error={error} />
    </div>
  );
}

export default InputField;