
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment-ctrl");
const auth = require("../middleware/auth");

router.post("/", auth, commentCtrl.showAllComment);
router.post("/create", auth, commentCtrl.createComment);
router.put("/modify", auth, commentCtrl.modifyComment)
router.delete("/delete", auth, commentCtrl.deleteComment)

module.exports = router;