import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserSidebar from "../components/UserSidebar";
import API from "../services/api";

function StudentView() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("table");

  // Get logged-in role
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex">

      {role === "admin" ? <Sidebar /> : <UserSidebar />}

      <div className="container-fluid p-4">

<h2 className="page-title mb-1">
Student Records
</h2>

<p className="text-secondary mb-4">
Browse student information in table or card view.
</p>
        <div className="mb-4">

          <button
            className={`btn me-2 ${
              view === "table"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setView("table")}
          >
            Table View
          </button>

          <button
            className={`btn ${
              view === "card"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setView("card")}
          >
            Card View
          </button>

        </div>

        {view === "table" ? (

          <div className="card shadow">

            <div className="card-header">
              <h4>Student List</h4>
            </div>

            <div className="card-body table-responsive">

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

                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.department}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Students Found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        ) : (

          <div className="row">

            {students.length > 0 ? (
              students.map((student) => (
                <div className="col-md-4 mb-4" key={student.id}>

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
              ))
            ) : (
              <h5>No Students Found</h5>
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default StudentView;