import { useState, useEffect } from "react";

function EmployeeForm({
  addEmployee,
  editingEmployee,
  updateEmployee,
}) {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      employee.id === "" ||
      employee.name === "" ||
      employee.department === "" ||
      employee.salary === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee({
      id: "",
      name: "",
      department: "",
      salary: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="number"
        name="id"
        placeholder="Employee ID"
        value={employee.id}
        onChange={handleChange}
      />

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={employee.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={employee.salary}
        onChange={handleChange}
      />

      <button type="submit">
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </button>

    </form>
  );
}

export default EmployeeForm;