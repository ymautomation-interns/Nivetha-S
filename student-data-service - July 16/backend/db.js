const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "student_data_service_db",
    password: "Nivetha1907",
    port: 5432,
});

module.exports = pool;