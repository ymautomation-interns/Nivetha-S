import "../styles/DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onCancel, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">

        <div className="delete-icon">🗑️</div>

        <h2>Delete Employee</h2>

        <p>
          Are you sure you want to delete this employee?
        </p>

        <div className="delete-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="delete-confirm-btn" onClick={onDelete}>
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmModal;