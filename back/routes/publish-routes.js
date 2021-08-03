
const express = require("express");
const bodyParser = require("body-parser"); 
const router = express.Router();
const publishCtrl = require("../controllers/publish-ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const pJson = bodyParser.json();
const pEnco = bodyParser.urlencoded({extended: false});

router.get("/", auth, pJson, pEnco, publishCtrl.showAllPublication);
router.post("/create", auth, multer, publishCtrl.createPublication);
router.put("/modify", auth, multer, publishCtrl.modifyPublication);
router.delete("/delete", auth, pJson, pEnco, publishCtrl.deletePublication);

module.exports = router;