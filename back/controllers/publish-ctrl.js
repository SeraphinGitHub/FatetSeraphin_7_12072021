
const generic = require("../generic-functions");
const db = require("../models");
const Publish = db.Publish;


// "GET" ==> Get all publications by ID in DataBase
exports.showAllPublication = (req, res, next) => generic.getAllItem(Publish, {}, res);


// "POST" ==> Create one publication in DataBase
exports.createPublication = (req, res, next) => generic.createOneItem("publication", req, res, next);


// "PUT" ==> Modify one publication by ID in DataBase
exports.modifyPublication = (req, res, next) => generic.modifyOneItem(Publish, req.body.id, req, res);


// "DELETE" ==> Delete one publication by ID in DataBase
exports.deletePublication = (req, res, next) => generic.deleteOneItem(Publish, req, res, next);