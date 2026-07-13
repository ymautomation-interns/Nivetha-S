import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import EmployeeCRUD from "./pages/EmployeeCRUD";
import ReactQueryPage from "./pages/ReactQueryPage";
import PaginationPage from "./pages/PaginationPage";
import SearchFilterPage from "./pages/SearchFilterPage";
import ModalPage from "./pages/ModalPage";
import LocalStoragePage from "./pages/LocalStoragePage";
import UseMemoPage from "./pages/UseMemoPage";
import OptimizationPage from "./pages/OptimizationPage";
import ThemePage from "./pages/ThemePage";
import Dashboard from "./pages/Dashboard";

import { useTheme } from "./context/ThemeContext";

import "./index.css";

function App() {
  const { darkMode } = useTheme();

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark-mode" : "app light-mode"}>
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<EmployeeCRUD />} />
            <Route path="/crud" element={<EmployeeCRUD />} />
            <Route path="/react-query" element={<ReactQueryPage />} />
            <Route path="/pagination" element={<PaginationPage />} />
            <Route path="/search" element={<SearchFilterPage />} />
            <Route path="/modal" element={<ModalPage />} />
            <Route path="/localstorage" element={<LocalStoragePage />} />
            <Route path="/usememo" element={<UseMemoPage />} />
            <Route path="/optimization" element={<OptimizationPage />} />
            <Route path="/theme" element={<ThemePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;