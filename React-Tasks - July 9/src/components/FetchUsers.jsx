import { useEffect, useState } from "react";

function FetchUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));

    }, []);

    return (
        <div>

            <h2>User List</h2>

            {
                users.map((user) => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>City: {user.address.city}</p>
                        <hr />
                    </div>
                ))
            }

        </div>
    );

}

export default FetchUsers;