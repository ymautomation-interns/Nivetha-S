import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeModal from "../components/EmployeeModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import "../styles/EmployeeCRUD.css";

function EmployeeCRUD() {
  const [employees, setEmployees] = useState([
    {
      id: 101,
      name: "John",
      department: "IT",
      salary: 50000,
    },
    {
      id: 102,
      name: "Alice",
      department: "HR",
      salary: 45000,
    },
  ]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete Confirmation States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Add Employee
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
    setIsModalOpen(false);
  };

  // Open Delete Confirmation
  const deleteEmployee = (id) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    setEmployees(
      employees.filter((emp) => emp.id !== selectedEmployeeId)
    );

    setShowDeleteModal(false);
    setSelectedEmployeeId(null);
  };

  // Cancel Delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedEmployeeId(null);
  };

  // Edit Employee
  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Update Employee
  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );

    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  return (
    <div className="crud-container">

      <h1>Employee CRUD using Local State</h1>

      <button
        onClick={() => {
          setEditingEmployee(null);
          setIsModalOpen(true);
        }}
      >
        Add Employee
      </button>

      {/* Add / Edit Employee Modal */}
      <EmployeeModal isOpen={isModalOpen}>
        <EmployeeForm
          addEmployee={addEmployee}
          editingEmployee={editingEmployee}
          updateEmployee={updateEmployee}
        />
      </EmployeeModal>

      <br />
      <br />

      <EmployeeTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onCancel={cancelDelete}
        onDelete={confirmDelete}
      />

    </div>
  );
}

export default EmployeeCRUD;