
const generic = require("../generic-functions");
const db = require("../models");
const Comment = db.Comment;


// "GET" ==> Get all comments by ID in DataBase
exports.showAllComment = (req, res, next) =>  {
    const whereObject = { where: { publishId: req.params.id } };
    generic.getAllItem(Comment, whereObject, res);
}


// "POST" ==> Create one comment in DataBase
exports.createComment = (req, res, next) => generic.createOneItem("comment", req, res, next);


// "PUT" ==> Modify one comment by ID in DataBase
exports.modifyComment = (req, res, next) => generic.modifyOneItem(Comment, req.body.id, req, res);


// "DELETE" ==> Delete one comment by ID in DataBase
exports.deleteComment = (req, res, next) => generic.deleteOneItem(Comment, req, res, next);