
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
                .then(() => res.status(200).json({ message: "User created successfully !" }))
                .catch(() => res.status(502).json({ message: "User NOT created !" }));

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
        if(!matchUserArray.length) return res.status(402).json({ message: "Invalid E-mail !" });
            
        else {
            let user = matchUserArray[0];

            bcrypt.compare(req.body.password, user.password)
            .then(passwordValid => {
                if(!passwordValid) return res.status(401).json({ message: "Invalid password !" });

                else {
                    // If first time logged





                    // if(!user.token) {

                        const session = {
                            userId: user.id,
                            token: jwt.sign({ userId: user.id }, process.env.Token_Key, { expiresIn: "48h" })
                        }
                        
                        bcrypt.hash(session.token, 12)
                        .then(tokenHashed => {

                            const cookieOptions = {
                                maxAge: 48*60*60*1000,
                                httpOnly: true,
                            }
                            
                            res.cookie(`Session: ${user.userName}`, session.token, cookieOptions);

                            User.update({ token: tokenHashed }, { where: { id: user.id } })
                            .then(() => res.status(200).json({ session, message: `${user.userName} logged successfully !` }))
                            .catch(() => res.status(500).json({ message: `${user.userName} could NOT log !` }));
                            
                        }).catch(() => res.status(401).json({ message: "Session failled !" }));
                    // }
                    




                    // If already had been logged
                    // else {
                    //     const headerToken = generic.verifyToken(req, res, next, "token");
                    //     const session = { userId: user.id, token: headerToken }
                        
                    //     bcrypt.compare(headerToken, user.token)
                    //     .then(tokenValid => {
                    //         if(!tokenValid) return res.status(401).json({ message: "Session expired !" });
                            
                    //         else User.findOne({ where: { id: user.id } })
                    //         .then(() => res.status(203).json({ session, message: `${user.userName} logged successfully !` }))
                    //         .catch(() => res.status(503).json({ message: `${user.userName} could NOT log !` }));
                            
                    //     }).catch(() => res.status(502).json({ message: "Unexpected token ! -Session-" }));
                    // }




                    
                }
            }).catch(() => res.status(501).json({ message: "Unexpected token ! -Password-" }));
        }
    }).catch(() => res.status(500).json({ message: "No users found !" }));
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
    
    // ********************************
    console.log(req.cookies);


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
    generic.modifyOneItem(User, userIdTok, req, res);
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
        if(matchUserArray.length) return res.status(401).json({ message: "This e-mail already exists !" });

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

            if(user.imageUrl) {

                const pictureName = user.imageUrl.split("/pictures/")[1];
                fs.unlink(`pictures/${pictureName}`, () => generic.deleteItem(user, user.userName, res));

            } else generic.deleteItem(user, user.userName, res);
            
        } else return res.status(500).json({ message: "Cannot delete -Admin- user !" });
    }).catch(() => res.status(404).json({ message: "User NOT found !" }));
};