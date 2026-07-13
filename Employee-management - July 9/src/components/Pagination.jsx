import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "../styles/Pagination.css";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 5;

  const fetchEmployees = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  };

  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  if (isLoading) {
    return <h2>Loading Employees...</h2>;
  }

  if (error) {
    return <h2>Error Fetching Employees</h2>;
  }

  // Pagination Logic
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <div className="pagination-container">

      <h1>Employee Pagination</h1>

      <table className="employee-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>

        <tbody>

          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.company.name}</td>
            </tr>
          ))}

        </tbody>

      </table>

      <div className="pagination-buttons">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Previous
        </button>

        <span>
          Page <b>{currentPage}</b> of <b>{totalPages}</b>
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>

      </div>

    </div>
  );
}

export default Pagination;