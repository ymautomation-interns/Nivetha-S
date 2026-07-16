import Label from "../common/Label";
import HelperText from "../common/HelperText";
import ErrorMessage from "../common/ErrorMessage";

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  helperText,
  error,
  maxLength,
  showCounter = false,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Label
        htmlFor={id}
        text={label}
        required={required}
      />

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        style={{
          width: "300px",
          padding: "10px",
          marginTop: "6px",
          display: "block",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      {showCounter && maxLength && (
        <div
          style={{
            textAlign: "right",
            width: "300px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          {value.length}/{maxLength}
        </div>
      )}

      <HelperText text={helperText} />
      <ErrorMessage error={error} />
    </div>
  );
}

export default TextArea;