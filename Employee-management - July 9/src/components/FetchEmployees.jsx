import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function FetchEmployees() {

  const fetchEmployees = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  };

  const {
    data: employees,
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
    return <h2>Error fetching employees.</h2>;
  }

  return (
    <div>

      <h1>Employees using React Query</h1>

      <table border="1" cellPadding="10" width="100%">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr key={employee.id}>

              <td>{employee.id}</td>

              <td>{employee.name}</td>

              <td>{employee.username}</td>

              <td>{employee.email}</td>

              <td>{employee.company.name}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default FetchEmployees;