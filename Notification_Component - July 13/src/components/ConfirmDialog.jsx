// Small reusable confirmation modal, styled to match the app instead of
// relying on the browser's native confirm() popup.
function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn confirm-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn primary confirm-ok-btn" onClick={onConfirm}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;