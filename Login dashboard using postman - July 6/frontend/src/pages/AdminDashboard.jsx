import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
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

      <Sidebar />

      <div className="main-content">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="page-title mb-1">
              Dashboard
            </h2>

            <p className="text-secondary mb-0">
              Welcome back! Here's an overview of your student management system.
            </p>
          </div>

        </div>

        {/* Statistics */}
        <div className="row">

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="dashboard-card">

              <div className="d-flex justify-content-between align-items-center">

                <div>

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

        {/* Information Card */}

        

      </div>

    </div>
  );
}

export default AdminDashboard;