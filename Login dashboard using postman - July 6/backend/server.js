const argon2 = require("argon2");
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

// =============================
// Home Route
// =============================
app.get("/", (req, res) => {
    res.send("Server is Running Successfully");
});

// =============================
// Database Test Route
// =============================
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.status(200).json({
            success: true,
            database: "Connected",
            currentTime: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Database Connection Failed"
        });
    }
});

// =============================
// Login API
// =============================
app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    // DEBUGGING
    console.log("--------------------------------");
    console.log("Username Received :", username);
    console.log("Password Received :", password);
    console.log("--------------------------------");

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and Password are required"
        });
    }

    try {

        const result = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        if (result.rows.length === 0) {

            console.log("User Not Found");

            return res.status(401).json({
                success: false,
                message: "Invalid Username"
            });
        }

        const user = result.rows[0];

        console.log("Database Username :", user.username);
        console.log("Database Role :", user.role);

        const isPasswordValid = await argon2.verify(
            user.password,
            password
        );

        console.log("Password Match :", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        console.log("Login Successful");

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            role: user.role,
            username: user.username
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

});

// =============================
// Create Student
// =============================
app.post("/students", async (req, res) => {

    const { name, age, department, email, phone } = req.body;

    if (!name || !age || !department || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {

        const result = await pool.query(
            `INSERT INTO students(name, age, department, email, phone)
             VALUES($1,$2,$3,$4,$5)
             RETURNING *`,
            [name, age, department, email, phone]
        );

        res.status(201).json({
            success: true,
            message: "Student Added Successfully",
            student: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to Add Student"
        });

    }

});

// =============================
// Get All Students
// =============================
app.get("/students", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM students ORDER BY id ASC"
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to Fetch Students"
        });

    }

});

// =============================
// Total Students Count
// =============================
app.get("/students/count", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT COUNT(*) FROM students"
        );

        res.status(200).json({
            totalStudents: result.rows[0].count
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to Fetch Student Count"
        });

    }

});

// =============================
// Update Student
// =============================
app.put("/students/:id", async (req, res) => {

    const { id } = req.params;
    const { name, age, department, email, phone } = req.body;

    try {

        const result = await pool.query(
            `UPDATE students
             SET name=$1,
                 age=$2,
                 department=$3,
                 email=$4,
                 phone=$5
             WHERE id=$6
             RETURNING *`,
            [name, age, department, email, phone, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            student: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to Update Student"
        });

    }

});

// =============================
// Delete Student
// =============================
app.delete("/students/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await pool.query(
            "DELETE FROM students WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to Delete Student"
        });

    }

});

// =============================
// Invalid Route
// =============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// =============================
// Start Server
// =============================
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});