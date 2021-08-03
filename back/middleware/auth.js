
const generic = require("../generic-functions");
module.exports = (req, res, next) => generic.verifyToken(req, res, next, "next");