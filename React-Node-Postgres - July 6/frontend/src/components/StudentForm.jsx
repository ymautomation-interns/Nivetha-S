function StudentForm({
  name,
  setName,
  department,
  setDepartment,
  editId,
  addStudent,
  updateStudent,
}) {
  return (
    <div className="form-container">

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      {editId ? (
        <button className="update-btn" onClick={updateStudent}>
          Update
        </button>
      ) : (
        <button className="add-btn" onClick={addStudent}>
          Add Student
        </button>
      )}

    </div>
  );
}

export default StudentForm;