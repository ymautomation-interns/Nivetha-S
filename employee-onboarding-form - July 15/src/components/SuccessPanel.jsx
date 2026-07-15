export default function SuccessPanel({ show, totalFields }) {
  if (!show) return null;
  return (
    <div className="success-panel show">
      <div className="ink-seal">✓</div>
      <div>
        <h3>File complete &amp; stamped</h3>
        <p>All {totalFields} fields have passed validation. This record is ready to be routed to HR.</p>
      </div>
    </div>
  );
}
