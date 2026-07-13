import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
    <h1>Employee</h1>
    <p>Management</p>
</div>

      <ul>
        <li><NavLink to="/crud">Employee CRUD</NavLink></li>
        <li><NavLink to="/react-query">React Query</NavLink></li>
        <li><NavLink to="/pagination">Pagination</NavLink></li>
        <li><NavLink to="/search">Search & Filter</NavLink></li>
        <li><NavLink to="/modal">Modal</NavLink></li>
        <li><NavLink to="/localstorage">Local Storage</NavLink></li>
        <li><NavLink to="/usememo">useMemo</NavLink></li>
        <li><NavLink to="/optimization">Optimization</NavLink></li>
        <li><NavLink to="/theme">Theme</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      </ul>

    </div>
  );
}

export default Sidebar;