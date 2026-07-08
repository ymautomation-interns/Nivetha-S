import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Settings from "./pages/Settings";
import StudentView from "./pages/StudentView";
import StudentManagement from "./pages/StudentManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* User */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Student Registration */}
        <Route
          path="/student-management"
          element={<StudentManagement />}
        />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />

        {/* Student Records */}
        <Route path="/student-view" element={<StudentView />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;