
const express = require("express");
const router = express.Router();
const publishCtrl = require("../controllers/publish-ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


router.get("/", auth, publishCtrl.showAllPublication);
router.post("/create", auth, multer, publishCtrl.createPublication);
router.post("/like", auth, publishCtrl.likePublication);
router.put("/modify", auth, multer, publishCtrl.modifyPublication);
router.delete("/delete", auth, publishCtrl.deletePublication);

module.exports = router;