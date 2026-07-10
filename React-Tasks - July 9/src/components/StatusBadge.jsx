import "./StatusBadge.css";


function StatusBadge() {


    const employees = [

        {
            id: 101,
            name: "Nivetha",
            department: "Software",
            status: "Active"
        },

        {
            id: 102,
            name: "Priya",
            department: "Testing",
            status: "Inactive"
        },

        {
            id: 103,
            name: "Karthik",
            department: "Developer",
            status: "Active"
        },

        {
            id: 104,
            name: "Rahul",
            department: "HR",
            status: "Inactive"
        }

    ];


    return (

        <div className="status-container">


            <h2>Employee Status</h2>


            {
                employees.map((employee) => (

                    <div className="status-card" key={employee.id}>


                        <h3>{employee.name}</h3>

                        <p>
                            Department: {employee.department}
                        </p>


                        <span 
                        className={
                            employee.status === "Active"
                            ? "active-badge"
                            : "inactive-badge"
                        }
                        >

                            {employee.status}

                        </span>


                    </div>

                ))
            }


        </div>

    );

}


export default StatusBadge;