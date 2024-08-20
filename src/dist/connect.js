const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "meu_banco",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    process.exit(1);
  }
  if (connection) {
    console.log("Database connection established successfully!");
    connection.release();
  }
});

module.exports = pool;
