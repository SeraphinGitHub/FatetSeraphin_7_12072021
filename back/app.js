
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const publishRoutes = require("./routes/publish-routes.js");
const userRoutes = require("./routes/user-routes.js");


// =================================================================================
// Disable CORS errors
// =================================================================================
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/pictures", express.static(path.join(__dirname, "pictures")));
app.use("/api/auth", userRoutes);
app.use("/api/publish", publishRoutes);


module.exports = app;