import { useState } from "react";
import users from "./users";
import "./UserDropdown.css";
import Tooltip from "../Tooltip";

function UserDropdown() {
  const [open, setOpen] = useState(false);
const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSelect = (user) => {
    const exists = selectedUsers.find((u) => u.id === user.id);

    if (exists) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <div className="user-dropdown">

      <button
        className="dropdown-btn"
        onClick={() => setOpen(!open)}
      >
        Select Users ▼
      </button>

      {open && (
        <div className="dropdown-menu">

          {users.map((user) => (

            <label
              key={user.id}
              className="dropdown-item"
            >

              <input
                type="checkbox"
                checked={selectedUsers.some(
                  (u) => u.id === user.id
                )}
                onChange={() => handleSelect(user)}
              />

              {user.name}

            </label>

          ))}

        </div>
      )}

      <div className="selected-users">

  {selectedUsers.map((user) => (

    <Tooltip
      key={user.id}
      name={user.name}
      role={user.role}
    >

     <div className="avatar">
        <img
          src={user.image}
          alt={user.name}
        />
      </div>

    </Tooltip>

  ))}

</div>

    </div>
  );
}

export default UserDropdown;