
require("dotenv").config();
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const db = require("./models");
const User = db.User;
const db_Name = process.env.DB_Name;


const database = mysql.createConnection({
    user: process.env.DB_Username,
    password: process.env.DB_Password,
    host: process.env.DB_Host,
    port: process.env.DB_Port,
});


database.connect((err) => {
    
    if(err) throw err;
    
    // Create Database
    database.query(`CREATE DATABASE IF NOT EXISTS ${db_Name}`, (err, result) => {
        if(err) throw err;

        // Search for Admin in DB ==> if not then create one
        User.findOrCreate({ where: { isAdmin: 1 } })
        .then(() => console.log("-Admin- already exists !"))
        .catch(() => {
            bcrypt.hash(process.env.Admin_Email, 12)
            .then(emailHashed => {
                bcrypt.hash(process.env.Admin_Password, 12)
                .then(pswHashed => {
        
                    const admin = new User({
                        email: emailHashed,
                        password: pswHashed,
                        userName: process.env.Admin_UserName,
                        position: process.env.Admin_Position,
                        department: process.env.Admin_Department,
                        imageUrl: process.env.Admin_ImageUrl,
                        isAdmin: 1,
                    })
        
                    admin.save()
                    .then(() => console.log("-Admin- created successfully !"))
                    .catch(() => console.log("-Admin- NOT created !"));
        
                }).catch(() => console.log("Invalid -Admin- password !"));
            }).catch(() => console.log("Invalid -Admin- e-mail !"));
        }).catch(() => console.log("-Admin- could NOT be created !"));
    });

    console.log(`Connected to ${db_Name} !`);
});