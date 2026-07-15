export default function FormFooter({ verifiedCount, totalFields, onReset, onSubmit }) {
  return (
    <div className="footer">
      <span className="count">
        {verifiedCount} / {totalFields} fields verified
      </span>
      <div className="actions">
        <button type="button" className="btn-ghost" onClick={onReset}>
          Reset form
        </button>
        <button type="submit" className="btn-primary" onClick={onSubmit}>
          Submit file
        </button>
      </div>
    </div>
  );
}
