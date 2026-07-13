import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/LocalStorage.css";

function LocalStorageComponent() {
  const [name, setName] = useLocalStorage("employeeName", "");

  return (
    <div className="local-container">

      <h1>useLocalStorage Custom Hook</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>Welcome, {name || "Employee"} 👋</h2>

      <p>
        Refresh the page. Your name will still be there because it is stored in
        Local Storage.
      </p>

    </div>
  );
}

export default LocalStorageComponent;