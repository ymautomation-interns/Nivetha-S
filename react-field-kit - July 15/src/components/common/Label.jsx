function Label({ htmlFor, text, required = false }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {text}
      {required && <span className="required"> *</span>}
    </label>
  );
}

export default Label;