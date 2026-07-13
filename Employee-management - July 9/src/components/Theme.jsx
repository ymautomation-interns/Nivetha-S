import { useTheme } from "../context/ThemeContext";
import "../styles/Theme.css";

function Theme() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-container">
      <h1>Theme using Context API</h1>

      <h2>
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </h2>

      <p>
        Click the button below to switch the entire application theme.
      </p>

      <button onClick={toggleTheme}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default Theme;