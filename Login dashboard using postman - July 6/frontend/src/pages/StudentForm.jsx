function StudentForm({
  name,
  setName,
  age,
  setAge,
  department,
  setDepartment,
  email,
  setEmail,
  phone,
  setPhone,
  editId,
  addStudent,
  updateStudent,
}) {
  return (
    <div
      className="card border-0 shadow-lg rounded-4 mx-auto"
      style={{
        width: "100%",
        maxWidth: "1400px",
        borderRadius: "20px",
      }}
    >
      <div className="card-body p-5">

        <h2 className="fw-bold mb-1">
          {editId ? "Update Student" : "Add New Student"}
        </h2>

        <p className="text-muted mb-5">
          Fill in the student details below.
        </p>

        <div className="row g-4">

          {/* Student Name */}
          <div className="col-lg-6">
            <label className="form-label fw-semibold">
              Student Name
            </label>

            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="col-lg-6">
            <label className="form-label fw-semibold">
              Age
            </label>

            <input
              type="number"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="col-lg-6">
            <label className="form-label fw-semibold">
              Department
            </label>

            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="col-lg-6">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              Phone Number
            </label>

            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

        </div>

        <div className="mt-5">

          {editId ? (
            <button
              className="btn btn-warning btn-lg px-5"
              onClick={updateStudent}
            >
              Update Student
            </button>
          ) : (
            <button
              className="btn btn-primary btn-lg px-5"
              onClick={addStudent}
            >
              Add Student
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default StudentForm;