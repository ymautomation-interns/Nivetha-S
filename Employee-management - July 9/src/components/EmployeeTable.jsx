function EmployeeTable({
  employees,
  deleteEmployee,
  editEmployee,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No Employees Found
            </td>
          </tr>
        ) : (
          employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>₹ {employee.salary}</td>

              <td>
                <button onClick={() => editEmployee(employee)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default EmployeeTable;