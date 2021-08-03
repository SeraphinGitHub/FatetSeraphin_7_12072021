
require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./models");
const User = db.User;


// ==================================================================================
// Get All Item
// ==================================================================================
exports.getAllItem = (itemModel, whereObject, req, res, next) => {
    
    itemModel.findAll(whereObject)
    .then(item => res.status(200).json(item))
    .catch(() => res.status(404).json({ message: "Publication NOT found !" }));
};


// ==================================================================================
// Get User Infos
// ==================================================================================
exports.getUserDetails = (userId, valueString, req, res, next) => {

    User.findOne({ where: { id: userId } })
    .then((user) => {
                
        const userCaption = {
            id: user.id,
            isAdmin: user.isAdmin,
            userName: user.userName,
            position: user.position,
            department: user.department,
            imageUrl: user.imageUrl,
        };

        const { isAdmin, ...securedUserCaption } = userCaption;

        if(valueString === "loggedUser") res.status(200).json(userCaption);
        if(valueString === "postUser") res.status(201).json(securedUserCaption);

    }).catch(() => res.status(403).json({ message: "User NOT found !" }));
};


// ==================================================================================
// Check post User in order to Update/Delete (Base function)
// ==================================================================================
exports.verifyPostOwner = (itemModel, valueString, req, res, next) => {
    const userIdTok = this.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {
        
        itemModel.findOne({ where: { id: req.body.id } })
        .then(post => {
            
            if(user.isAdmin === true || post.userId === user.id) {
                
                if(valueString === "modifyItem") this.modifyOneItem(itemModel, post, req, res, next);
                if(valueString === "deleteItem") this.deleteOneItem(post, req, res, next);
            }

        }).catch(() => res.status(404).json({ message: "Publication NOT found !" }));
    }).catch(() => res.status(500).json({ message: "Publication's user NOT found !" }));
};


// ==================================================================================
// Modify One Item
// ==================================================================================
exports.modifyOneItem = (itemModel, post, req, res, next) => {
    
    if(post.imageUrl && req.file) {
        const pictureName = post.imageUrl.split("/pictures/")[1];
        fs.unlink(`pictures/${pictureName}`,(() => {

            const item = { imageUrl: `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}` };

            itemModel.update( item, { where: { id: post.id } })
            .then(() => res.status(202).json({ message: "Publication with file modified successfully !" }))
            .catch(() => res.status(503).json({ message: "Publication with file NOT modified !" }));
        }));
    }

    else if(!post.imageUrl && req.file) {

        const item = { imageUrl: `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}` };

        itemModel.update( item, { where: { id: post.id } })
        .then(() => res.status(202).json({ message: "Publication with file modified successfully !" }))
        .catch(() => res.status(503).json({ message: "Publication with file NOT modified !" }));
    }

    else {
        const item = { ...req.body };

        itemModel.update( item, { where: { id: post.id } })
        .then(() => res.status(200).json({ message: "Publication modified successfully !" }))
        .catch(() => res.status(500).json({ message: "Publication NOT modified !" }));
    }
};


// ==================================================================================
// Delete One Item
// ==================================================================================
exports.deleteOneItem = (post, req, res, next) => {
    
    if(post.imageUrl) {
        const pictureName = post.imageUrl.split("/pictures/")[1];
        fs.unlink(`pictures/${pictureName}`, () => this.destroyItem(post, "Publication", req, res, next));
    } else this.destroyItem(post, "Publication", req, res, next);
};


// ==================================================================================
// Delete Item (Base function)
// ==================================================================================
exports.destroyItem = (item, itemName, req, res, next) => {

    item.destroy({ where: { id: item.id } })
    .then(() => res.status(200).json({ message: `${itemName} deleted successfully !` }))
    .catch(() => res.status(500).json({ message: `${itemName} NOT deleted !` }));
};


// ==================================================================================
// Get User ID by Token
// ==================================================================================
exports.verifyToken = (req, res, next, elseValue) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if(typeof token === "undefined") res.status(401).json({ message: "Session expirée !" });
        else if(elseValue === "userId") return jwt.verify(token, process.env.Token_Key).userId;
        else if(elseValue === "next") next();
    }
    catch (error) { res.status(403).json({ message: "Requêtte non authentifiée !" }) }
};


// ==================================================================================
// Search user by hash of req email
// ==================================================================================
exports.userProbe = async (users, emailReq, req, res, next) => {
    let matchUserArray = [];
    
    for (i = 0; i < users.length; i++) {
        let user = users[i];

        await bcrypt.compare(emailReq, users[i].email)
        .then(emailValid => { if(emailValid) return matchUserArray.push(user) })
        .catch((error => res.status(501).json({ error })));

    } return matchUserArray;
};


// ==================================================================================
// Modify E-mail or Password
// ==================================================================================
exports.updateEmailOrPsw = (user, dataValue, req, res, next) => {

    let oldData;
    let newData;
    let userData;
    let modifData;        
        
    if(dataValue === "Password") {
        oldData = req.body.oldPassword;
        newData = req.body.newPassword;
        userData = user.password;
    }

    if(dataValue === "E-mail") {
        oldData = req.body.oldEmail;
        newData = req.body.newEmail;
        userData = user.email;
    }
    
    bcrypt.compare(oldData, userData)
    .then(valid => {

        if(!valid) return res.status(401).json({ message: `Old ${dataValue} invalid !` });

        else bcrypt.hash(newData, 12)
        .then(hash => {

            if(dataValue === "Password") modifData = { password: hash };
            if(dataValue === "E-mail") modifData = { email: hash };

            User.update(modifData, { where: { id: user.id } })
            .then(() => res.status(200).json({ message: `${dataValue} modified successfully !` }))
            .catch(() => res.status(500).json({ message: `${dataValue} NOT modified !` }));

        }).catch(() => res.status(501).json({ message: `Unexpected token ! -New ${dataValue}-` }));
    }).catch(() => res.status(502).json({ message: `Unexpected token ! -Old ${dataValue}-` }));
};