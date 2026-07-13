import { useState, useCallback } from "react";
import ChildButton from "./ChildButton";
import "../styles/Optimization.css";

function Optimization() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  console.log("Parent Rendered");

  const handleClick = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="optimization-container">
      <h1>useCallback + React.memo</h1>

      <div className="card">
        <h2>Parent Component</h2>

        <h3>Count: {count}</h3>

        <button onClick={() => setCount(count + 1)}>
          Increase Count
        </button>

        <br />
        <br />

        <ChildButton onClick={handleClick} />
      </div>

      {showModal && (
        <div className="popup-overlay">
          <div className="popup-box">

            <h2>React.memo + useCallback</h2>

            <p>
              Child button clicked successfully!
            </p>

            <button onClick={() => setShowModal(false)}>
              OK
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Optimization;