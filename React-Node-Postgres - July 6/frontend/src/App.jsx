import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Header from "./components/Header";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";
import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Toast
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  // Delete Modal
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Show Notification
  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({
        message: "",
        type: "",
      });
    }, 2500);
  };

  // Add Student
  const addStudent = async () => {
    if (!name || !department) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      await axios.post("http://localhost:5000/students", {
        name,
        department,
      });

      setName("");
      setDepartment("");

      fetchStudents();

      showToast("Student Added", "success");
    } catch (err) {
      console.log(err);
    }
  };

  // Edit
  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setDepartment(student.department);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Update
  const updateStudent = async () => {
    try {
      await axios.put(
        `http://localhost:5000/students/${editId}`,
        {
          name,
          department,
        }
      );

      setEditId(null);
      setName("");
      setDepartment("");

      fetchStudents();

      showToast("Student Updated", "success");
    } catch (err) {
      console.log(err);
    }
  };

  // Open Delete Popup
  const deleteStudent = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/students/${deleteId}`
      );

      fetchStudents();

      showToast("Student Deleted", "success");
    } catch (err) {
      console.log(err);
      showToast("Unable to delete", "error");
    }

    setShowModal(false);
  };

  // Search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <Toast
        message={toast.message}
        type={toast.type}
      />

      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />

      <Header totalStudents={students.length} />

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <StudentForm
        name={name}
        setName={setName}
        department={department}
        setDepartment={setDepartment}
        editId={editId}
        addStudent={addStudent}
        updateStudent={updateStudent}
      />

      <div className="student-list">

        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            editStudent={editStudent}
            deleteStudent={deleteStudent}
          />
        ))}

      </div>

    </div>
  );
}

export default App;