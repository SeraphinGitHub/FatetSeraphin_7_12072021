
require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generic = require("../generic-functions");
const db = require("../models");
const User = db.User;
const Publish = db.Publish;


// ==================================================================================
// "POST" ==> User Sign In
// ==================================================================================
exports.signin = (req, res, next) => {

    User.findAll()
    .then(async (users) => {

        const matchUserArray = await generic.userProbe(users, req.body.email, req, res, next);
        if(matchUserArray.length) return res.status(401).json({ message: "Cet e-mail est déjà pris !" });

        else bcrypt.hash(req.body.email, 12)
        .then(emailHashed => {
    
            bcrypt.hash(req.body.password, 12)
            .then(pswHashed => {

                const user = new User({
                    ...req.body,
                    email: emailHashed,
                    password: pswHashed,
                })

                user.save()
                .then(user => {
                    const session = jwt.sign({ userId: user.id }, process.env.Token_Key, { expiresIn: "48h" });
                    res.status(200).json({ session, message: `Bonjour ${user.userName}, compte créé avec succès !` });

                }).catch(() => res.status(502).json({ message: "Ce compte n'a pas pû être créé !" }));

            }).catch(() => res.status(401).json({ message: "Invalid password !" }));
        }).catch(() => res.status(400).json({ message: "Invalid E-mail !" }));
    }).catch(() => res.status(500).json({ message: "No users found !" }));
};


// ==================================================================================
// "POST" ==> User Login
// ==================================================================================
exports.login = (req, res, next) => {

    User.findAll()
    .then(async (users) => {
        const matchUserArray = await generic.userProbe(users, req.body.email, req, res, next);

        if(matchUserArray.length) {
            let user = matchUserArray[0];

            bcrypt.compare(req.body.password, user.password)
            .then(passwordValid => {

                if(passwordValid) {
                    const session = jwt.sign({ userId: user.id }, process.env.Token_Key, { expiresIn: "48h" });
                    res.status(200).json({ session, message: `Bonjour ${user.userName}, vous êtes connecté !` });

                } else return res.status(401).json({ message: "Mot de passe invalide !" });
            }).catch(() => res.status(501).json({ message: `${user.userName} n'a pas pû se connecter !` }));

        } else return res.status(400).json({ message: "E-mail invalide !" });
    }).catch(() => res.status(500).json({ message: "Aucun utilisateur trouvé !" }));
};


// ==================================================================================
// "POST" ==> User Logout
// ==================================================================================
exports.logout = (req, res, next) => {

    const userIdTok = generic.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {
        
        res.status(202).json({ message: `${user.userName} déconnecté !` });

    }).catch(() => res.status(404).json({ message: "Utilisateur non trouvé !" }));
};


// ==================================================================================
// "GET" ==> User Wall
// ==================================================================================
exports.userWall = (req, res, next) => {
    
    const userIdTok = generic.verifyToken(req, res, next, "userId");
    const whereObject = { where: { userId: userIdTok } };
    generic.getAllItem(Publish, whereObject, req, res, next);
};


// ==================================================================================
// "GET" ==> Get User Caption
// ==================================================================================
exports.getUserCaption = (req, res, next) => {

    const userIdTok = generic.verifyToken(req, res, next, "userId");
    generic.getUserDetails(userIdTok, "loggedUser", req, res, next);
}


// ==================================================================================
// "POST" ==> Get Post's User Infos
// ==================================================================================
exports.getPostUserInfos = (req, res, next) => generic.getUserDetails(req.body.id, "postUser", req, res, next);


// ==================================================================================
// "GET" ==> User Profile
// ==================================================================================
exports.getUserProfile = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");
    
    User.findOne({ where: { id: userIdTok } })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(404).json({ message: "User NOT found !" }));
};


// ==================================================================================
// "PUT" ==> Update User Profile
// ==================================================================================
exports.modifyProfile = (req, res, next) => {

    const userIdTok = generic.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {
        
        const item = {...req.body };
        const {email, password, ...securedItem} = item;

        User.update(securedItem, { where: { id: user.id } })
        .then(() => res.status(200).json({ message: `${user.userName}'s profile update successfully !` }))
        .catch(() => res.status(500).json({ message: `${user.userName}'s profile NOT updated !` }));
            
    }).catch(() => res.status(500).json({ message: "User NOT found !" }));
};


// ==================================================================================
// "PUT" ==> Update User Email
// ==================================================================================
exports.modifyPassword = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => generic.updateEmailOrPsw(user, "Password", req, res, next))
    .catch(() => res.status(404).json({ message: "User NOT found !" })); 
}


// ==================================================================================
// "PUT" ==> Update User Password
// ==================================================================================
exports.modifyEmail = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");
    
    User.findAll()
    .then(async (users) => {
        const matchUserArray = await generic.userProbe(users, req.body.newEmail, req, res, next);
        if(matchUserArray.length) return res.status(402).json({ message: "This e-mail already exists !" });

        else User.findOne({ where: { id: userIdTok } })
        .then(user => generic.updateEmailOrPsw(user, "E-mail", req, res, next))
        .catch(() => res.status(404).json({ message: "User NOT found !" }));

    }).catch(() => res.status(500).json({ message: "No users found !" }));
};


// ==================================================================================
// "DELETE" ==> Delete User
// ==================================================================================
exports.deleteUser = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {
        if(user.isAdmin === false) {

            bcrypt.compare(req.body.password, user.password)
            .then(passwordValid => {
                if(passwordValid) {
                   
                    if(user.imageUrl !== "http://localhost:3000/pictures/Default.jpg") {

                        const pictureName = user.imageUrl.split("/pictures/")[1];
                        fs.unlink(`pictures/${pictureName}`, () => generic.destroyItem(user, user.userName, req, res, next));
        
                    } else generic.destroyItem(user, user.userName, req, res, next);


                    // Grab each post, then Grab each comment of each post, then delete all (foreach loop)



                } else return res.status(401).json({ message: "Invalid password !" });
            }).catch(() => res.status(501).json({ message: "Unexpected token ! -Delete User-" }));

        } else return res.status(500).json({ message: "Cannot delete -Admin- user !" });
    }).catch(() => res.status(404).json({ message: "User NOT found !" }));
};