const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

pool.connect((err) => {
  if (err) {
    console.log(" Database Connection Failed");
    console.log(err.message);
  } else {
    console.log(" Database Connected Successfully");
  }
});


app.get("/", (req, res) => {
  res.send("Backend Connected Successfully!");
});


app.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});


app.post("/students", async (req, res) => {
  try {
    const { name, department } = req.body;

    const result = await pool.query(
      "INSERT INTO students(name, department) VALUES($1,$2) RETURNING *",
      [name, department]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});


app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department } = req.body;

    const result = await pool.query(
      "UPDATE students SET name=$1, department=$2 WHERE id=$3 RETURNING *",
      [name, department, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});


app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting Student ID:", id);

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    console.log("Deleted Row:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
      student: result.rows[0],
    });
  } catch (err) {
    console.error("Delete Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});