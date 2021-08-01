
const generic = require("../generic-functions");

module.exports = (req, res, next) => generic.verifyToken(req, res, next, "next");

// module.exports = (req, res, next) => {
//     console.log({ Alert: "Auth middlware is disabled !" });
//     next();
// }