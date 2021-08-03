
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signin", userCtrl.signin);
router.post("/login", userCtrl.login);
router.post("/logout", auth, userCtrl.logout);
router.post("/postUser", auth, userCtrl.getPostUserInfos);

router.get("/user", auth, userCtrl.getUserCaption);
router.get("/wall", auth, userCtrl.userWall);
router.get("/profile", auth, userCtrl.getUserProfile);

router.put("/updateUser", auth, multer, userCtrl.modifyProfile);
router.put("/updateUser/email", auth, userCtrl.modifyEmail);
router.put("/updateUser/password", auth, userCtrl.modifyPassword);

router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;