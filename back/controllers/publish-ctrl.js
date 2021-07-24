
const fs = require("fs");
const generic = require("../generic-functions");
const db = require("../models");
const Publish = db.Publish;
const User = db.User;


// ==================================================================================
// "GET" ==> Get all publications by ID in DataBase
// ==================================================================================
exports.showAllPublication = (req, res, next) => {
    
    Publish.findAll()
    .then(publication => res.status(200).json(publication))
    .catch(() => res.status(404).json({ message: "Publication NOT found !" }));
}


// ==================================================================================
// "POST" ==> Create one publication in DataBase
// ==================================================================================
exports.createPublication = (req, res, next) => {

    const publication = new Publish({
        ...req.body,
        userId: req.query.id,
    });

    publication.save()
    .then(() => res.status(200).json({ message: "Publication created successfully !" }))
    .catch(() => res.status(501).json({ message: "Publication NOT created !" }));
}


// ==================================================================================
// "PUT" ==> Modify one publication by ID in DataBase
// ==================================================================================
exports.modifyPublication = (req, res, next) => {
    
    Publish.update({ ...req.body }, { where: { id: req.body.id } })
    .then(() => res.status(200).json({ message: "Publication modified successfully !" }))
    .catch(() => res.status(500).json({ message: "Publication NOT modified !" }));
}


// ==================================================================================
// "DELETE" ==> Delete one publication by ID in DataBase
// ==================================================================================
exports.deletePublication = ( req, res, next) => {
    
    const userIdTok = generic.getUserId(req, res, next, "token");

    User.findOne({ where: { id: userIdTok } })
    .then((user) => {      
        Publish.findOne({ where: { id: req.body.id } })
        .then(post => {
            
            if(user.isAdmin === true || post.userId === user.id) {
                if(post.imageUrl) {
                    
                    const pictureName = post.imageUrl.split("/pictures/")[1];
                    fs.unlink(`pictures/${pictureName}`, () => generic.deleteItem(post, post.title, res));

                } else generic.deleteItem(post, post.title, res);
            }

        }).catch(() => res.status(404).json({ message: "Publication NOT found !" }));
    }).catch(() => res.status(500).json({ message: "User NOT found !" }));
}