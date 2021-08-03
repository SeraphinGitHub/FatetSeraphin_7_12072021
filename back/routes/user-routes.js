
const express = require("express");
const bodyParser = require("body-parser");  
const router = express.Router();
const userCtrl = require("../controllers/user-ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const pJson = bodyParser.json();
const pEnco = bodyParser.urlencoded({extended: false});

router.post("/signin", pJson, pEnco, userCtrl.signin);
router.post("/login", pJson, pEnco, userCtrl.login);
router.post("/logout", auth, pJson, pEnco, userCtrl.logout);
router.post("/postUser", auth, pJson, pEnco, userCtrl.getPostUserInfos);

router.get("/user", auth, pJson, pEnco, userCtrl.getUserCaption);
router.get("/wall", auth, pJson, pEnco, userCtrl.userWall);
router.get("/profile", auth, pJson, pEnco, userCtrl.getUserProfile);

router.put("/updateUser", auth, multer, userCtrl.modifyProfile);
router.put("/updateUser/email", auth, pJson, pEnco, userCtrl.modifyEmail);
router.put("/updateUser/password", auth, pJson, pEnco, userCtrl.modifyPassword);

router.delete("/delete", auth, pJson, pEnco, userCtrl.deleteUser);

module.exports = router;