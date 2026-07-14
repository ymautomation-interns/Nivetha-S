import UserProfile from "../components/common/UserProfile/UserProfile";
const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select",
  disabled = false,
}) => {
  return (
    <div className="dropdown-container">
      {label && <label className="dropdown-label">{label}</label>}

      <select
        className="dropdown-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;