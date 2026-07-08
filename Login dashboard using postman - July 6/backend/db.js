const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "intern_login_db",
    password: "Nivetha1907",
    port: 5432,
});

module.exports = pool;