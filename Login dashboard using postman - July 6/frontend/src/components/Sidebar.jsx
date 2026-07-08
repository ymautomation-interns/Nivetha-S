import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">
        ADMIN
      </h2>

      <ul className="nav flex-column mt-5">

        <li>
          <Link
            to="/admin-dashboard"
            className={`nav-link ${
              location.pathname === "/admin-dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className={`nav-link ${
              location.pathname === "/settings" ? "active" : ""
            }`}
          >
Student Registration          </Link>
        </li>

        <li>
          <Link
            to="/student-view"
            className={`nav-link ${
              location.pathname === "/student-view" ? "active" : ""
            }`}
          >
Student Records          </Link>
        </li>

        <li className="mt-auto">
          <Link to="/" className="nav-link logout">
            Logout
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;