import "./Tooltip.css";

function Tooltip({ name, role, children }) {
  return (
    <div className="tooltip-container">

      {children}

      <div className="tooltip-box">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>

    </div>
  );
}

export default Tooltip;