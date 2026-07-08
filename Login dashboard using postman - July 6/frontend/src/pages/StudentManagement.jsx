import { useState, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import StudentForm from "./StudentForm";
import Swal from "sweetalert2";

function StudentManagement() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Student
  const addStudent = async () => {
    if (!name || !age || !department || !email || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Please fill in all fields.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      await API.post("/students", {
        name,
        age,
        department,
        email,
        phone,
      });

      Swal.fire({
        icon: "success",
        title: "Student Added",
        text: "Student has been added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setName("");
      setAge("");
      setDepartment("");
      setEmail("");
      setPhone("");

      fetchStudents();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to add student.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // Update Student
  const updateStudent = async () => {
    try {
      await API.put(`/students/${editId}`, {
        name,
        age,
        department,
        email,
        phone,
      });

      Swal.fire({
        icon: "success",
        title: "Student Updated",
        text: "Student details updated successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setEditId(null);

      setName("");
      setAge("");
      setDepartment("");
      setEmail("");
      setPhone("");

      fetchStudents();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to update student.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  // Edit Student
  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setAge(student.age);
    setDepartment(student.department);
    setEmail(student.email);
    setPhone(student.phone);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Student
  const deleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Delete Student?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/students/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Student deleted successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchStudents();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to delete student.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="container-fluid px-5 py-4"
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        <h2 className="page-title mb-4">
          Student Management
        </h2>

        <StudentForm
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          department={department}
          setDepartment={setDepartment}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          editId={editId}
          addStudent={addStudent}
          updateStudent={updateStudent}
        />

        <hr className="my-5" />

        <h3 className="mb-4 fw-bold">
          Student List
        </h3>

        <div className="table-responsive shadow rounded-4 overflow-hidden">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th
                  style={{
                    width: "220px",
                    textAlign: "center",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>

                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.department}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>

                    <td style={{ textAlign: "center" }}>
                      <div className="action-buttons">

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
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No Students Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default StudentManagement;