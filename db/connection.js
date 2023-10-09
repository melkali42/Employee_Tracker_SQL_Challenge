//Connecting to the database
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Linus@Clark6^#",
    database: 'employee_tracker_db'
});


module.exports = db;