import { useState, useMemo } from "react";
import "../styles/UseMemo.css";

function UseMemoComponent() {
  const employees = [
    { id: 101, name: "John", department: "IT", salary: 50000 },
    { id: 102, name: "Alice", department: "HR", salary: 45000 },
    { id: 103, name: "David", department: "Finance", salary: 55000 },
    { id: 104, name: "Sophia", department: "IT", salary: 62000 },
    { id: 105, name: "Kevin", department: "Marketing", salary: 47000 },
    { id: 106, name: "Emma", department: "HR", salary: 52000 },
    { id: 107, name: "William", department: "IT", salary: 65000 },
    { id: 108, name: "Olivia", department: "Finance", salary: 59000 },
  ];

  const [search, setSearch] = useState("");

  // useMemo Optimization
  const filteredEmployees = useMemo(() => {
    console.log("Filtering Employees...");
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="memo-container">

      <h1>Optimize Search using useMemo</h1>

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="memo-input"
      />

      <table className="memo-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>₹ {employee.salary}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default UseMemoComponent;