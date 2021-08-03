
const express = require("express");
const bodyParser = require("body-parser"); 
const router = express.Router();
const commentCtrl = require("../controllers/comment-ctrl");
const auth = require("../middleware/auth");

const pJson = bodyParser.json();
const pEnco = bodyParser.urlencoded({extended: false});

router.post("/", auth, pJson, pEnco, commentCtrl.showAllComment);
router.post("/create", auth, pJson, pEnco, commentCtrl.createComment);
router.put("/modify", auth, pJson, pEnco, commentCtrl.modifyComment)
router.delete("/delete", auth, pJson, pEnco, commentCtrl.deleteComment)

module.exports = router;