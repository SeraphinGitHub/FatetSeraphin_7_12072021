
const fs = require("fs");
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
exports.deletePublication = (req, res, next) => {
    
    User.getUserId(req.headers.authorization)
    .then((aze) => {
        console.log(aze);
    })
    .catch(() => res.status(500).json({ message: "Publication NOT deleted !" }));

    // Publish.destroy({ where: { id: req.body.id } })
    // .then(() => res.status(200).json({ message: `${req.body.title} deleted successfully !` }))
    // .catch(() => res.status(500).json({ message: "Publication NOT deleted !" }));

    // Publish.findOne({ where: { id: req.body.id } })
    // .then(publication => {

    //     if(publication.isAdmin === false) {
    //         const pictureName = publication.imageUrl.split("/pictures/")[1];
    //         if(pictureName) fs.unlink(`pictures/${pictureName}`, () => deleteUser(user, req, res));
    //         else deleteUser(user, req, res);
    //     }

    //     else return res.status(500).json({ message: "Cannot delete -Admin- user !" })
    // })
    // .catch(() => res.status(404).json({ message: "User NOT found !" }));
}