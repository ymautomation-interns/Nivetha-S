import { FaUserCircle } from "react-icons/fa";
import "./UserProfile.css";

function UserProfile() {
  return (
    <div className="profile">

      <FaUserCircle
        size={42}
        color="#2563eb"
      />

      <span>Nivetha</span>

    </div>
  );
}

export default UserProfile;