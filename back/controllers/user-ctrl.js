
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

        const matchUserArray = await generic.userProbe(users, req.body.email, res);
        if(matchUserArray.length) return res.status(401).json({ message: "This e-mail already exists !" });

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
                .then(() => res.status(200).json({ message: `${user.userName} created successfully !` }))
                .catch(() => res.status(502).json({ message: `${user.userName} could NOT be created !` }));

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
        const matchUserArray = await generic.userProbe(users, req.body.email, res);

        if(matchUserArray.length) {
            let user = matchUserArray[0];

            bcrypt.compare(req.body.password, user.password)
            .then(passwordValid => {

                if(passwordValid) {
                    const session = {
                        userId: user.id,
                        token: jwt.sign({ userId: user.id }, process.env.Token_Key, { expiresIn: "48h" })
                    }
                 
                    const cookieOptions = {
                        maxAge: 48*60*60*1000,  // 48h
                        // maxAge: 30*1000, // 30 seconds
                        httpOnly: true,
                        signed: true,
                    }

                    res.cookie("Session", session.token, cookieOptions);
                    res.status(200).json({ session, message: `${user.userName} logged successfully !` });
                    
                    console.log({ Session_Cookie : req.signedCookies.Session });
                    console.log({ script: "user-ctrl ==> l.75"});

                } else return res.status(401).json({ message: "Invalid password !" });
            }).catch(() => res.status(501).json({ message: `${user.userName} could NOT log !` }));

        } else return res.status(400).json({ message: "Invalid E-mail !" });
    }).catch(() => res.status(500).json({ message: "No users found !" }));
};


// ==================================================================================
// "POST" ==> User Logout
// ==================================================================================
exports.logout = (req, res, next) => {

    const userIdTok = generic.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {
       
        res.cookie("Session", {}, {maxAge: 0});
        res.status(202).json({ message: `${user.userName} logged Out successfully !` });

    }).catch(() => res.status(404).json({ message: "User NOT found !" }));
};


// ==================================================================================
// "GET" ==> User Wall
// ==================================================================================
exports.userWall = (req, res, next) => {

    const userIdTok = generic.verifyToken(req, res, next, "userId");
    const whereObject = { where: { userId: userIdTok } };
    generic.getAllItem(Publish, whereObject, res);
};


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

    const userIdTok = this.verifyToken(req, res, next, "userId");

    User.findOne({ where: { id: userIdTok } })
    .then(user => {
        
        if(user.isAdmin === true || user.id) {

            const item = {...req.body };
            const {email, password, ...securedItem} = item;

            User.update(securedItem, { where: { id: user.id } })
            .then(() => res.status(200).json({ message: `${user.userName}'s profile update successfully !` }))
            .catch(() => res.status(500).json({ message: `${user.userName}'s profile NOT updated !` }));
        }        
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
        const matchUserArray = await generic.userProbe(users, req.body.newEmail, res);
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
                   
                    res.cookie("Session", {}, {maxAge: 0});

                    if(user.imageUrl !== "../pictures/Default.jpg") {

                        const pictureName = user.imageUrl.split("/pictures/")[1];
                        fs.unlink(`pictures/${pictureName}`, () => generic.destroyItem(user, user.userName, res));
        
                    } else generic.destroyItem(user, user.userName, res);

                } else return res.status(401).json({ message: "Invalid password !" });
            }).catch(() => res.status(501).json({ message: "Unexpected token ! -Delete User-" }));

        } else return res.status(500).json({ message: "Cannot delete -Admin- user !" });
    }).catch(() => res.status(404).json({ message: "User NOT found !" }));
};