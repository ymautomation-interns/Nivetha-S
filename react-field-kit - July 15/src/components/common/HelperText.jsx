function HelperText({ text }) {
  if (!text) return null;

  return (
    <small style={{ color: "gray" }}>
      {text}
    </small>
  );
}

export default HelperText;