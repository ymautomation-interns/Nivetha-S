import { useState } from "react";
import "./SearchFilter.css";


function SearchFilter() {


    const [search, setSearch] = useState("");


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
        },

        {
            id: 104,
            name: "Rahul",
            age: 25,
            department: "HR",
            salary: 45000
        }
    ];


    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase())
    );


    return (

        <div className="search-container">


            <h2>Employee Search</h2>


            <input

                type="text"

                placeholder="Search Employee Name"

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />


            {
                filteredEmployees.map((employee) => (

                    <div className="search-card" key={employee.id}>


                        <h3>{employee.name}</h3>

                        <p>ID: {employee.id}</p>

                        <p>Department: {employee.department}</p>

                        <p>Salary: ₹{employee.salary}</p>


                    </div>

                ))
            }


        </div>

    );

}


export default SearchFilter;