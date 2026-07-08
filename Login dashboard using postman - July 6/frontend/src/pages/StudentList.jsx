import React, { useEffect, useState } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("table");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">

      <UserSidebar />

      <div className="container-fluid p-4">

        <h2 className="mb-4">Student List</h2>

        {/* Toggle Buttons */}
        <div className="mb-4">
          <button
            className={`btn me-2 ${
              view === "table" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setView("table")}
          >
            📋 Table View
          </button>

          <button
            className={`btn ${
              view === "card" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setView("card")}
          >
            🪪 Card View
          </button>
        </div>

        {/* Table View */}
        {view === "table" && (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.department}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Card View */}
        {view === "card" && (
          <div className="row">
            {students.map((student) => (
              <div className="col-md-4 mb-3" key={student.id}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h4>{student.name}</h4>
                    <hr />
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>Department:</strong> {student.department}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Phone:</strong> {student.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default StudentList;