function Header({ totalStudents }) {
  return (
    <div className="header">

      <div>
        <h1>🎓 Student Hub</h1>
        <p>Manage student records with ease</p>
      </div>

      <div className="student-count">
        <h2>{totalStudents}</h2>
        <span>Total Students</span>
      </div>

    </div>
  );
}

export default Header;