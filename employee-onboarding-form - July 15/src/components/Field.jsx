export default function Field({ name, label, required, optional, full, children, touched, valid, message }) {
  const stateClass = touched ? (valid ? "valid" : "error") : "";
  const msgClass = !touched ? "hint" : valid ? "success" : "error";
  return (
    <div className={"field" + (full ? " full" : "") + (stateClass ? " " + stateClass : "")} data-field={name}>
      <label htmlFor={name}>
        {label}
        {required && <span className="req">*</span>}
        {optional && <span className="opt"> (optional)</span>}
      </label>
      {children}
      <p className={"msg " + msgClass}>{message}</p>
    </div>
  );
}
