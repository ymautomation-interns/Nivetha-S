import "../styles/EmployeeModal.css";

function EmployeeModal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {children}
      </div>
    </div>
  );
}

export default EmployeeModal;