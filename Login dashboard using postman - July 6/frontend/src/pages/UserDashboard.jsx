import React, { useEffect, useState } from "react";
import API from "../services/api";
import UserSidebar from "../components/UserSidebar";

function UserDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    getStudentCount();
  }, []);

  const getStudentCount = async () => {
    try {
      const response = await API.get("/students/count");
      setTotalStudents(response.data.totalStudents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <UserSidebar />

<div
  className="main-content"
  style={{
    padding: "25px",
  }}
>
        {/* Header */}

        <div className="mb-3">
          <h2 className="page-title mb-2">
            Dashboard
          </h2>

          <p className="text-secondary">
            Welcome! Here's an overview of the student management system.
          </p>
        </div>

        {/* Statistics Card */}

        <div className="row mt-2">

          <div className="col-lg-4 col-md-6">

            <div className="dashboard-card">

              <h5>Total Students</h5>

              <h1>{totalStudents}</h1>

              <small className="text-muted">
                Registered Students
              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;