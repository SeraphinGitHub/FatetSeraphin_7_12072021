
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment-ctrl");
const auth = require("../middleware/auth");

router.get("/:id/comment", auth, commentCtrl.showAllComment);
router.post("/:id/comment/create", auth, commentCtrl.createComment);
router.put("/:id/comment/modify", auth, commentCtrl.modifyComment)
router.delete("/:id/comment/delete", auth, commentCtrl.deleteComment)

module.exports = router;