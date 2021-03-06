
require("dotenv").config();

// ========== API init ==========
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const initDB = require("./init_DB");
const path = require("path");
const db = require("./models");


// ========== Routes Files ==========
const userRoutes = require("./routes/user-routes.js");
const publishRoutes = require("./routes/publish-routes.js");
const commentRoutes = require("./routes/comment-routes.js");


// =================================================================================
// Disable CORS errors
// =================================================================================
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});


db.sequelize.sync().then((req, res, next) => {
    
    initDB;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use("/pictures", express.static(path.join(__dirname, "pictures")));
    app.use("/api/auth", userRoutes);
    app.use("/api/publish", publishRoutes);
    app.use("/api/comment", commentRoutes);
});


module.exports = app;