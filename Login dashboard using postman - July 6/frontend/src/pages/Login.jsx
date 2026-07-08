import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const username = role === "admin" ? "admin" : "user";

      const res = await API.post("/login", {
        username,
        password,
      });

      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server Error");
      }
    }
  };

  return (
    <div className="login-page">

      <form
        className="login-card"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >

       

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue
        </p>

        <div className="role-switch">

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => {
              setRole("admin");
              setPassword("");
              setMessage("");
            }}
          >
            Admin
          </button>

          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => {
              setRole("user");
              setPassword("");
              setMessage("");
            }}
          >
            User
          </button>

        </div>

        <input
          type="password"
          placeholder={`Enter ${role} password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>

        {message && (
          <p
            className={
              message.toLowerCase().includes("success")
                ? "success-msg"
                : "error-msg"
            }
          >
            {message}
          </p>
        )}

      </form>

    </div>
  );
}

export default Login;