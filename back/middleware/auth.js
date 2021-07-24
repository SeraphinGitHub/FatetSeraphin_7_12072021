
const generic = require("../generic-functions");

module.exports = (req, res, next) => generic.getUserId(req, res, next, "next");