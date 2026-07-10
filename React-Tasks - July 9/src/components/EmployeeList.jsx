import "./EmployeeList.css";

function EmployeeList() {


    const employees = [
        {
            id: 101,
            name: "Nivetha",
            age: 22,
            department: "Software",
            salary: 50000
        },

        {
            id: 102,
            name: "Priya",
            age: 23,
            department: "Testing",
            salary: 40000
        },

        {
            id: 103,
            name: "Karthik",
            age: 24,
            department: "Developer",
            salary: 60000
        }
    ];


    return (

        <div className="employee-list-container">

            <h2>Employee List</h2>


            {
                employees.map((employee) => (

                    <div key={employee.id}>

                        <h3>{employee.name}</h3>

                        <p>ID: {employee.id}</p>

                        <p>Age: {employee.age}</p>

                        <p>Department: {employee.department}</p>

                        <p>Salary: ₹{employee.salary}</p>

                        <hr />

                    </div>

                ))
            }


        </div>

    );

}


export default EmployeeList;