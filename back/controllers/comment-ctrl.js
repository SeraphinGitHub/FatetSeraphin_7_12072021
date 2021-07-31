
const generic = require("../generic-functions");
const db = require("../models");
const Comment = db.Comment;


// "GET" ==> Get all comments by ID in DataBase
exports.showAllComment = (req, res, next) =>  {
    const whereObject = { where: { publishId: req.body.id } };
    generic.getAllItem(Comment, whereObject, res);
}


// "POST" ==> Create one comment in DataBase
exports.createComment = (req, res, next) => {

    // const userIdTok = this.verifyToken(req, res, next, "userId");
    const userIdTok = 3 ;

    const comment = new Comment({
        ...req.body,
        userId: userIdTok,
        publishId: req.body.id,
    });
    
    comment.save()
    .then(() => res.status(200).json({ message: "Comment created successfully !" }))
    .catch(() => res.status(501).json({ message: "Comment NOT created !" }));
};


// "PUT" ==> Modify one comment by ID in DataBase
exports.modifyComment = (req, res, next) => 
generic.verifyPostOwner(Comment, generic.modifyOneItem, req, res, next);


// "DELETE" ==> Delete one comment by ID in DataBase
exports.deleteComment = (req, res, next) => 
generic.verifyPostOwner(Comment, generic.deleteOneItem, req, res, next);