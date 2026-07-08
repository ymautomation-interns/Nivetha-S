import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Settings() {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="container-fluid"
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "30px",
          }}
        >
          Student Registration
        </h2>

        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "18px",
            padding: "40px",
            maxWidth: "900px",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "15px",
            }}
          >
            Register New Student
          </h3>

          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              lineHeight: "28px",
              marginBottom: "35px",
            }}
          >
            Add a new student to the Student Management System. Click the
            button below to open the registration form and enter the student's
            academic and personal information.
          </p>

          <button
            onClick={() => navigate("/student-management")}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "14px 30px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
              width: "220px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2563eb";
            }}
          >
            Register Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;