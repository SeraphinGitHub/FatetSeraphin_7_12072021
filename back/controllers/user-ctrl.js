
require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generic = require("../generic-functions");
const db = require("../models");
const User = db.User;
const Publish = db.Publish;
const Comment = db.Comment;


// Have to contain: 
//  LETTER || letter || number || dot || under score || dash
//  && at (@) &&
//  LETTER || letter || number && dot && LETTER || letter
const emailRegEx = new RegExp(/^[A-Za-z0-9._-]+[@]+[A-Za-z0-9]+[.]+[A-Za-z]+$/);

// Have to contain: LETTER || letter || accent letters || spaces || dash
const normalTextRegEx = new RegExp(/^[A-Za-zÜ-ü\s-]+$/);

// Have to contain: LETTER || letter || number || accent letters || number && minimum 10 characters 
const passwordRegExSignin = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*].{9,}$/);

// Have to contain: LETTER || letter || number || accent letters || number
const passwordRegExLogin = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*]+$/);


// ========== Token Generation ==========
const generateToken = (user, req, res, next) => {
    const token = jwt.sign({ userId: user.id }, process.env.Token_Key, { expiresIn: "48h" });
    res.status(200).json({ token, message: `Bonjour ${user.userName}, vous êtes connecté !` });
}


// ==================================================================================
// "POST" ==> User Sign In
// ==================================================================================
exports.signin = (req, res, next) => {

    if(req.body.email && emailRegEx.test(req.body.email)
    && req.body.password && passwordRegExSignin.test(req.body.password)
    && req.body.confirmPsw && passwordRegExSignin.test(req.body.confirmPsw)
    && req.body.userName && normalTextRegEx.test(req.body.userName)
    && req.body.position && normalTextRegEx.test(req.body.position)
    && req.body.department && normalTextRegEx.test(req.body.department) ) {

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
                    .then(user => generateToken(user, req, res, next))
                    .catch(() => res.status(502).json({ message: "Ce compte n'a pas pû être créé !" }));
    
                }).catch(() => res.status(401).json({ message: "Invalid password !" }));
            }).catch(() => res.status(400).json({ message: "Invalid E-mail !" }));
        }).catch(() => res.status(500).json({ message: "No users found !" }));
    }
};


// ==================================================================================
// "POST" ==> User Login
// ==================================================================================
exports.login = (req, res, next) => {

    if(req.body.email && emailRegEx.test(req.body.email)
    && req.body.password && passwordRegExLogin.test(req.body.password) ) {

        User.findAll()
        .then(async (users) => {
            const matchUserArray = await generic.userProbe(users, req.body.email, req, res, next);
    
            if(matchUserArray.length) {
                let user = matchUserArray[0];
    
                bcrypt.compare(req.body.password, user.password)
                .then(passwordValid => {
    
                    if(passwordValid) generateToken(user, req, res, next);
                    else return res.status(401).json({ message: "Mot de passe invalide !" });
    
                }).catch(() => res.status(501).json({ message: `${user.userName} n'a pas pû se connecter !` }));
    
            } else return res.status(400).json({ message: "E-mail invalide !" });
        }).catch(() => res.status(500).json({ message: "Aucun utilisateur trouvé !" }));
    }
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
// Get User Infos (Base function)
// ==================================================================================
exports.getUserDetails = (userId, req, res, next) => {

    User.findOne({ where: { id: userId } })
    .then((user) => {
                
        const securedUserDetails = {
            id: user.id,
            isAdmin: user.isAdmin,
            userName: user.userName,
            position: user.position,
            department: user.department,
            imageUrl: user.imageUrl,
            createdAt: user.createdAt,
        };

        res.status(200).json(securedUserDetails);

    }).catch(() => res.status(403).json({ message: "User NOT found !" }));
};


// ==================================================================================
// "POST" ==> Get Post's User Infos
// ==================================================================================
exports.getPostUserInfos = (req, res, next) => this.getUserDetails(req.body.id, req, res, next);


// ==================================================================================
// "GET" ==> User Profile
// ==================================================================================
exports.getUserProfile = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");
    this.getUserDetails(userIdTok, req, res, next);
};


// ==================================================================================
// "PUT" ==> Update User Profile
// ==================================================================================
exports.modifyProfile = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {

        if(req.file) {
            const pictureName = user.imageUrl.split("/pictures/")[1];

            fs.unlink(`pictures/${pictureName}`,(() => {
                const userPhoto = {imageUrl: `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`};
                const {email, password, position, department, isAdmin, ...securedUserPhoto} = userPhoto;
                
                User.update(securedUserPhoto, { where: { id: user.id } })
                .then(() => res.status(202).json({ message: `${user.userName}'s photo update successfully !` }))
                .catch(() => res.status(502).json({ message: `${user.userName}'s photo NOT updated !` }));
            }));
        }
    
        else {
            const userData = {...req.body };
            const {email, password, isAdmin, imageUrl, ...securedUserData} = userData;

            User.update(securedUserData, { where: { id: user.id } })
            .then(() => res.status(201).json({ message: `${user.userName}'s infos update successfully !` }))
            .catch(() => res.status(501).json({ message: `${user.userName}'s infos NOT updated !` }));
        }

    }).catch(() => res.status(500).json({ message: "User NOT found !" }));
};


// ==================================================================================
// "PUT" ==> Update User Password
// ==================================================================================
exports.modifyPassword = (req, res, next) => {

    if(req.body.oldData
    && req.body.newData
    && passwordRegExSignin.test(req.body.newData)) {

        const userIdTok = generic.verifyToken(req, res, next, "userId");
    
        User.findOne({ where: { id: userIdTok } })
        .then(user => this.updateEmailOrPsw(user, "mot de passe", req, res, next))
        .catch(() => res.status(404).json({ message: "User NOT found !" })); 
    }
}


// ==================================================================================
// "PUT" ==> Update User Email
// ==================================================================================
exports.modifyEmail = (req, res, next) => {

    if(req.body.oldData
    && req.body.newData
    && emailRegEx.test(req.body.newData)) {

        const userIdTok = generic.verifyToken(req, res, next, "userId");
        
        User.findAll()
        .then(async (users) => {
            const matchUserArray = await generic.userProbe(users, req.body.newData, req, res, next);
            if(matchUserArray.length) return res.status(402).json({ message: "Cet e-mail est déjà pris !" });

            else User.findOne({ where: { id: userIdTok } })
            .then(user => this.updateEmailOrPsw(user, "e-mail", req, res, next))
            .catch(() => res.status(404).json({ message: "User NOT found !" }));

        }).catch(() => res.status(500).json({ message: "No users found !" }));
    }
};


// ==================================================================================
// Modify E-mail or Password
// ==================================================================================
exports.updateEmailOrPsw = (user, dataValue, req, res, next) => {

    let userData;
    let modifData;
        
    if(dataValue === "mot de passe") userData = user.password;
    if(dataValue === "e-mail") userData = user.email;
    
    bcrypt.compare(req.body.oldData, userData)
    .then(valid => {

        if(!valid) return res.status(401).json({ message: `Ancien ${dataValue} invalide !` });

        else bcrypt.hash(req.body.newData, 12)
        .then(hash => {

            if(dataValue === "mot de passe") modifData = { password: hash };
            if(dataValue === "e-mail") modifData = { email: hash };

            User.update(modifData, { where: { id: user.id } })
            .then(() => res.status(200).json({ message: `Votre ${dataValue} à été modifié avec succès !` }))
            .catch(() => res.status(500).json({ message: `Votre ${dataValue} n'as pas pû être modifié !` }));

        }).catch(() => res.status(501).json({ message: `Unexpected token ! -New ${dataValue}-` }));
    }).catch(() => res.status(502).json({ message: `Unexpected token ! -Old ${dataValue}-` }));
};


// ==================================================================================
// "DELETE" ==> Delete User
// ==================================================================================
exports.deleteUser = (req, res, next) => {

    if(req.body.password && passwordRegExSignin.test(req.body.password)) {
        const userIdTok = generic.verifyToken(req, res, next, "userId");

        User.findOne({ where: { id: userIdTok } })
        .then(user => {
            if(user.isAdmin === false) {

                bcrypt.compare(req.body.password, user.password)
                .then(passwordValid => {
                    if(passwordValid) {

                        Comment.destroy({ where: { userId: user.id } })
                        .then(() => {

                            Publish.findAll({ where: { userId: user.id } })
                            .then(posts => {

                                posts.forEach(post => {
                                    if(post.imageUrl) {
                                        const pictureName = post.imageUrl.split("/pictures/")[1];
                                        fs.unlink(`pictures/${pictureName}`, () => generic.destroyItem(post, post.title, req, res, next));
                                    }
                                });

                                Publish.destroy({ where: { userId: user.id } })
                                .then(() => {
        
                                    if(user.imageUrl !== "http://localhost:3000/pictures/Default.jpg") {

                                        const pictureName = user.imageUrl.split("/pictures/")[1];
                                        fs.unlink(`pictures/${pictureName}`, () => generic.destroyItem(user, user.userName, req, res, next));
                                    
                                    } else generic.destroyItem(user, user.userName, req, res, next); 

                                }).catch(() => res.status(504).json({ message: "Post NOT deleted !" }));
                            }).catch(() => res.status(503).json({ message: "Publications NOT found !" }));
                        }).catch(() => res.status(502).json({ message: "Comments NOT deleted !" }));

                    } else return res.status(501).json({ message: "Mot de passe invalide !" });
                }).catch(() => res.status(401).json({ message: "Invalid password !" }));
            
            } else return res.status(500).json({ message: "Cannot delete -Admin- user !" });
        }).catch(() => res.status(400).json({ message: "User NOT found !" }));
    }
};