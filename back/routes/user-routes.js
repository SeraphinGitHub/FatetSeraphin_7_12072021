
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-ctrl");
const auth = require("../middleware/auth");

router.post("/signin", userCtrl.signin);
router.post("/login", userCtrl.login);
router.get("/wall", auth, userCtrl.userWall);
router.get("/profile", auth, userCtrl.userProfile);
router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;