
require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./models");
const User = db.User;
const Publish = db.Publish;
const Comment = db.Comment;


module.exports = {
    
    // ==================================================================================
    // Get All Item
    // ==================================================================================
    getAllItem: function(itemModel, whereObject, res) {
        itemModel.findAll(whereObject)
        .then((item) => res.status(200).json(item))
        .catch(() => res.status(404).json({ message: "Publication NOT found !" }));
    },


    // ==================================================================================
    // Create One Item
    // ==================================================================================
    createOneItem: function(itemValue, req, res, next) {
        let item;
        const userIdTok = this.verifyToken(req, res, next, "userId");
        
        if(itemValue === "publication") item = new Publish({
            ...req.body,
            userId: userIdTok
        });

        if(itemValue === "comment") {

            item = new Comment({
                ...req.body,
                userId: userIdTok,
                publishId: req.params.id,
            });
        }
        
        item.save()
        .then(() => res.status(200).json({ message: "Publication created successfully !" }))
        .catch(() => res.status(501).json({ message: "Publication NOT created !" }));
    },


    // ==================================================================================
    // Modify One Item
    // ==================================================================================
    modifyOneItem: function(itemModel, itemID, req, res) {
        itemModel.update({ ...req.body }, { where: { id: itemID } })
        .then(() => res.status(200).json({ message: "Publication modified successfully !" }))
        .catch(() => res.status(500).json({ message: "Publication NOT modified !" }));
    },


    // ==================================================================================
    // Delete One Item
    // ==================================================================================
    deleteOneItem: function(itemModel, req, res, next) {
        const userIdTok = this.verifyToken(req, res, next, "userId");

        User.findOne({ where: { id: userIdTok } })
        .then((user) => {      
            itemModel.findOne({ where: { id: req.params.id } })
            .then(post => {
                
                if(user.isAdmin === true || post.userId === user.id) {
                    if(post.imageUrl) {
                        
                        const pictureName = post.imageUrl.split("/pictures/")[1];
                        fs.unlink(`pictures/${pictureName}`, () => this.deleteItem(post, "Publication", res));

                    } else this.deleteItem(post, "Publication", res);
                }

            }).catch(() => res.status(404).json({ message: "Publication NOT found !" }));
        }).catch(() => res.status(500).json({ message: "User NOT found !" }));
    },


    // ==================================================================================
    // Delete Item (Base function)
    // ==================================================================================
    deleteItem: function(item, itemName, res) {
        item.destroy({ where: { id: item.id } })
        .then(() => res.status(200).json({ message: `${itemName} deleted successfully !` }))
        .catch(() => res.status(500).json({ message: `${itemName} NOT deleted !` }));
    },


    // ==================================================================================
    // Get User ID by Token
    // ==================================================================================
    verifyToken: function(req, res, next, elseValue) {
        try {
            const token = req.headers.authorization.split(" ")[1];

            // **************************************************
            // const token = req.cookies.split(" ")[1];

            const decodedToken = jwt.verify(token, process.env.Token_Key);
            const tokenUserId = decodedToken.userId;
        
            if(req.body.userId && req.body.userId !== tokenUserId) throw "Session expired !";
            else if(elseValue === "userId") return tokenUserId;
            else if(elseValue === "token") return token;
            else if(elseValue === "next") next();
        }
        catch (error) { res.status(403).json({ message: "None authentified request !" }) }
    },


    // ==================================================================================
    // Search user by hash of req email
    // ==================================================================================
    userProbe: async function(users, emailReq, res) {
        let matchUserArray = [];
        
        for (i = 0; i < users.length; i++) {
            let user = users[i];

            await bcrypt.compare(emailReq, users[i].email)
            .then(emailValid => { if(emailValid) return matchUserArray.push(user) })
            .catch((error => res.status(501).json({ error })));

        } return matchUserArray;
    },


    // ==================================================================================
    // Modify E-mail or Password
    // ==================================================================================
    updateEmailOrPsw: function(user, dataValue, req, res, next) {

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
    }
}