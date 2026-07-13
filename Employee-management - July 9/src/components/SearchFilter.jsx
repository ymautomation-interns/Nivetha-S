import { useState } from "react";
import "../styles/SearchFilter.css";

function SearchFilter() {
  const employees = [
    { id: 101, name: "John", department: "IT", salary: 50000 },
    { id: 102, name: "Alice", department: "HR", salary: 45000 },
    { id: 103, name: "David", department: "Finance", salary: 55000 },
    { id: 104, name: "Sophia", department: "IT", salary: 62000 },
    { id: 105, name: "Kevin", department: "Marketing", salary: 47000 },
    { id: 106, name: "Emma", department: "HR", salary: 52000 },
  ];

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  // Search + Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="search-container">

      <h1>Search & Filter Employees</h1>

      <div className="search-controls">

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          className="department-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

      </div>

      <table className="search-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>

          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          ) : (
            filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>₹ {employee.salary}</td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default SearchFilter;