
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment-ctrl");
const auth = require("../middleware/auth");

router.get("/:id", auth, commentCtrl.showAllComment);
router.post("/:id/create", auth, commentCtrl.createComment);
router.put("/:id/modify", auth, commentCtrl.modifyComment)
router.delete("/:id/delete", auth, commentCtrl.deleteComment)

module.exports = router;