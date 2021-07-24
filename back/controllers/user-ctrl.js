
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const generic = require("../generic-functions");
const db = require("../models");
const User = db.User;


// Find user by its hashed email
const userBy_EmailHash = async (res, allUsers, reqBodyEmail) => {
    let matchUserArray = [];
        
    for (i = 0; i < allUsers.length; i++) {
        let user = allUsers[i];
        await bcrypt.compare(reqBodyEmail, allUsers[i].email)
        .then(emailValid => { if(emailValid) return matchUserArray.push(user) })
        .catch((error => res.status(501).json({ error })));
    }
    return matchUserArray;
}


// Create user in DB with hashed email & password
const createUser = (res, reqBody, reqBodyEmail, reqBodyPsw) => {

    bcrypt.hash(reqBodyEmail, 12)
    .then(emailHashed => {
        bcrypt.hash(reqBodyPsw, 12)
        .then(pswHashed => {

            const user = new User({
                ...reqBody,
                email: emailHashed,
                password: pswHashed,
            })

            user.save()
            .then(() => res.status(200).json({ message: "User created successfully !" }))
            .catch(() => res.status(502).json({ message: "User NOT created !" }));

        }).catch(() => res.status(501).json({ message: "Invalid password !" }));
    }).catch(() => res.status(500).json({ message: "Invalid e-mail !" }));
}


// ==================================================================================
// "POST" ==> User Sign In
// ==================================================================================
exports.signin = (req, res, next) => {

    User.findAll()
    .then(async(users) => {

        // Search one user in DB with requested email
        const matchUserArray = await userBy_EmailHash(res, users, req.body.email);

        // If requested email exist inside DB
        if(matchUserArray.length) return res.status(401).json({ message: "This e-mail already exists !" });
        
        // If requested email doesn't exist inside DB
        else createUser(res, req.body, req.body.email, req.body.password);

    }).catch(() => res.status(500).json({ message: "No user found !" }));
};


// ==================================================================================
// "POST" ==> User Login
// ==================================================================================
exports.login = (req, res, next) => {

    User.findAll()
    .then(async(users) => {

        // Search one user in DB with requested email
        const matchUserArray = await userBy_EmailHash(res, users, req.body.email);

        // If requested email exist inside DB
        if(matchUserArray.length) {

            const user = matchUserArray[0];
            await bcrypt.compare(req.body.password, user.password)
            .then(passwordValid => {
                if(!passwordValid) return res.status(401).json({ message: "Invalid password !" });
    
                res.status(200).json({
                    userId: user.id,                
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.Token_Key,
                        { expiresIn: "48h" }
                    ),
                    message: "User logged successfully !"
                });
            }).catch(() => res.status(502).json({ message: "Unexpected token !" }));
        }

        else return res.status(501).json({ message: "Invalid e-mail !" })

    }).catch(() => res.status(500).json({ message: "No user found !" }));
};


// ==================================================================================
// "GET" ==> User Wall
// ==================================================================================
exports.userWall = (req, res, next) => {

    // User.findOne({ id: req.query.id })
    // .then(wall => res.status(200).json(wall))
    // .catch(error => res.status(404).json({ error }));
};


// ==================================================================================
// "GET" ==> User Profile
// ==================================================================================
exports.userProfile = (req, res, next) => {

    // User.findOne({ id: req.query.id })
    // .then(profile => res.status(200).json(profile))
    // .catch(error => res.status(404).json({ error }));
};


// ==================================================================================
// "DELETE" ==> Delete User
// ==================================================================================
exports.deleteUser = (req, res, next) => {

    User.findOne({ where: { id: req.body.id } })
    .then(user => {

        if(user.isAdmin === false) {
            if(user.imageUrl) {

                const pictureName = user.imageUrl.split("/pictures/")[1];
                fs.unlink(`pictures/${pictureName}`, () => generic.deleteItem(user, user.userName, res));

            } else generic.deleteItem(user, user.userName, res);
        } else return res.status(500).json({ message: "Cannot delete -Admin- user !" })
    })
    .catch(() => res.status(404).json({ message: "User NOT found !" }));
};