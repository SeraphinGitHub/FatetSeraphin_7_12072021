
require("dotenv").config();
const mysql = require("mysql2");
const db_Name = process.env.DB_Name;

const database = mysql.createConnection({
    user: process.env.DB_Username,
    password: process.env.DB_Password,
    host: process.env.DB_Host,
    port: process.env.DB_Port,
});


database.connect((err) => {
    
    if(err) throw err;
    
    database.query(`CREATE DATABASE IF NOT EXISTS ${db_Name}`, (err, result) => {
        if(err) throw err;
    });

    console.log(`Connected to ${db_Name} !`);
});