
const generic = require("../generic-functions");
const db = require("../models");
const Publish = db.Publish;


// "GET" ==> Get all publications by ID in DataBase
exports.showAllPublication = (req, res, next) => generic.getAllItem(Publish, {}, res);


// "POST" ==> Create one publication in DataBase
exports.createPublication = (req, res, next) => {

    // const userIdTok = this.verifyToken(req, res, next, "userId");
    const userIdTok = 3 ;

    // const azeObject = JSON.parse(req.body.file);

    const post = new Publish({
        ...req.body,
        // ...azeObject,
        userId: userIdTok,
        imageUrl: `${req.protocol}://${req.get("host")}/pictures/${req.body.file.name}`,
    });

    post.save()
    .then(() => res.status(200).json({ message: "Publication created successfully !" }))
    .catch(() => res.status(501).json({ message: "Publication NOT created !" }));
}


// "PUT" ==> Modify one publication by ID in DataBase
exports.modifyPublication = (req, res, next) => 
generic.verifyPostOwner(Publish, generic.modifyOneItem, req, res, next);


// "DELETE" ==> Delete one publication by ID in DataBase
exports.deletePublication = (req, res, next) => 
generic.verifyPostOwner(Publish, generic.deleteOneItem, req, res, next);