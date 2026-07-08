const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// CREATE - Add Student
router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const student = new Student(req.body);
    console.log("Student object before save:", student);
    await student.save();
    console.log("Student saved:", student);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update Student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete Student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;