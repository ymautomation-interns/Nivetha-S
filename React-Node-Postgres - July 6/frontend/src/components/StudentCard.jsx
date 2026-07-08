function StudentCard({
  student,
  editStudent,
  deleteStudent,
}) {
  return (
    <div className="student-card">

      <div className="card-header">
        <h3>{student.name}</h3>
      </div>

      <div className="details-grid">

        <div className="detail-box">
          <span>Student ID</span>
          <h4>{student.id}</h4>
        </div>

        <div className="detail-box">
          <span>Department</span>
          <h4>{student.department}</h4>
        </div>

      </div>

      <div className="card-buttons">

        <button
          className="edit-btn"
          onClick={() => editStudent(student)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteStudent(student.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default StudentCard;