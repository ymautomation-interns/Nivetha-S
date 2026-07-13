import "../styles/Dashboard.css";

function DashboardComponent() {
  const employees = [
    { id: 101, name: "John", department: "IT", salary: 50000 },
    { id: 102, name: "Alice", department: "HR", salary: 45000 },
    { id: 103, name: "David", department: "Finance", salary: 55000 },
    { id: 104, name: "Sophia", department: "IT", salary: 62000 },
    { id: 105, name: "Kevin", department: "Marketing", salary: 47000 },
    { id: 106, name: "Emma", department: "HR", salary: 52000 }
  ];

  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + emp.salary,
    0
  );

  const averageSalary = Math.round(totalSalary / totalEmployees);

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="dashboard">

      <h1>Employee Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Employees</h3>
          <h2>{totalEmployees}</h2>
        </div>

        <div className="card">
          <h3>Departments</h3>
          <h2>{departments.length}</h2>
        </div>

        <div className="card">
          <h3>Total Salary</h3>
          <h2>₹ {totalSalary}</h2>
        </div>

        <div className="card">
          <h3>Average Salary</h3>
          <h2>₹ {averageSalary}</h2>
        </div>

      </div>

      <br />

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((employee) => (
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

export default DashboardComponent;