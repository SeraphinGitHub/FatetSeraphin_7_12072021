
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-ctrl");
const auth = require("../middleware/auth");

router.post("/signin", userCtrl.signin);
router.post("/login", userCtrl.login);
router.post("/logout", auth, userCtrl.logout);
router.get("/wall", auth, userCtrl.userWall);
router.get("/profile", auth, userCtrl.getUserProfile);
router.put("/profile/updateUser", auth, userCtrl.modifyProfile);
router.put("/profile/updateEmail", auth, userCtrl.modifyEmail);
router.put("/profile/updatePsw", auth, userCtrl.modifyPassword);
router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;