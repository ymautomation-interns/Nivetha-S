import "./EmployeeCard.css"


function EmployeeCard(props){
    return(
        <div className="card">
            <h2>Employee Card</h2>
            <p><strong>ID:</strong>{props.id}</p>
            <p><strong>Name:</strong>{props.name}</p>
            <p><strong>Age:</strong>{props.age}</p>
            <p><strong>Department:</strong>{props.department}</p>
        </div>

    );
}

export default EmployeeCard;