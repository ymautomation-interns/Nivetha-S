import React from "react";
import { NavLink } from "react-router-dom";

function UserSidebar() {
  return (
    <div className="sidebar">

      <h3 className="sidebar-title">USER</h3>

      <NavLink
        to="/user-dashboard"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
  to="/student-view"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  Student Directory
</NavLink>

      <NavLink
        to="/"
        className="nav-link logout"
      >
        Logout
      </NavLink>

    </div>
  );
}

export default UserSidebar;