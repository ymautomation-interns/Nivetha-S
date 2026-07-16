function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <p style={{ color: "red", marginTop: "5px" }}>
      {error}
    </p>
  );
}

export default ErrorMessage;