
const generic = require("../generic-functions");
const db = require("../models");
const Publish = db.Publish;


// ==================================================================================
// "GET" ==> Get all publications by ID in DataBase
// ==================================================================================
exports.showAllPublication = (req, res, next) => generic.getAllItem(Publish, {}, req, res, next);


// ==================================================================================
// "POST" ==> Create one publication in DataBase
// ==================================================================================
exports.createPublication = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");

    if(req.file) {
        const post = new Publish({
            ...req.body,
            userId: userIdTok,
            imageUrl: `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`,
        });

        post.save()
        .then(() => res.status(202).json({ message: "Publication with file created successfully !" }))
        .catch(() => res.status(503).json({ message: "Publication with file NOT created !" }));
    }

    else {
        const post = new Publish({
            ...req.body,
            userId: userIdTok,
        });

        post.save()
        .then(() => res.status(200).json({ message: "Publication created successfully !" }))
        .catch(() => res.status(501).json({ message: "Publication NOT created !" }));
    }
}


// ==================================================================================
// "PUT" ==> Modify one publication by ID in DataBase
// ==================================================================================
exports.modifyPublication = (req, res, next) =>
generic.verifyPostOwner(Publish, "modifyItem", req, res, next);


// ==================================================================================
// "DELETE" ==> Delete one publication by ID in DataBase
// ==================================================================================
exports.deletePublication = (req, res, next) => 
generic.verifyPostOwner(Publish, "deletePost", req, res, next);