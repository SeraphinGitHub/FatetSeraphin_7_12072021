
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;


// Find user by its hashed email
const userBy_EmailHash = async (allUsers, reqBodyEmail) => {
    
    let userArray = [];
        
    for (i = 0; i < allUsers.length; i++) {
        let user = allUsers[i];

        await bcrypt.compare(reqBodyEmail, allUsers[i].email)
        .then(emailValid => {
            
            if(emailValid) return userArray.push(user);
            else return;
            
        }).catch(error => res.status(501).json({ error }));
    }

    return userArray;
}




const aze = (res, reqBody, reqBodyEmail, reqBodyPsw) => {

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
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch(() => res.status(400).json({ message: "Utilisateur NON créé !" }));

        }).catch(() => res.status(501).json({ message: "Mot de passe NON validé !" }));

    }).catch(() => res.status(500).json({ message: "E-mail NON validée !" }));
}


// ==================================================================================
// "POST" ==> User Sign In
// ==================================================================================
exports.signin = (req, res, next) => {

    User.findAll()
    .then((users) => {

        // Search one user in DB with requested email
        const userArray = userBy_EmailHash(users, req.body.email);
        const userEmail_DB = userArray[0].email;
        
        // Compare requested email
        bcrypt.compare(req.body.email, userEmail_DB)
        .then(emailValid => {
            if(!emailValid) return res.status(401).json({ message: "Cette adresse e-mail existe déjà !" });

            aze(res, req.body, req.body.email, req.body.password);

            // bcrypt.hash(req.body.email, 12)
            // .then(emailHashed => {

            //     bcrypt.hash(req.body.password, 12)
            //     .then(pswHashed => {

            //         const user = new User({
            //             ...req.body,
            //             email: emailHashed,
            //             password: pswHashed,
            //         })

            //         user.save()
            //         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            //         .catch(() => res.status(400).json({ message: "Utilisateur NON créé !" }));

            //     }).catch(() => res.status(501).json({ message: "Mot de passe NON validé !" }));

            // }).catch(() => res.status(500).json({ message: "E-mail NON validée !" }));

        }).catch(() => res.status(502).json({ message: "azeazeaze !" }));
    
    }).catch(() => res.status(500).json({ message: "wxcwxcwxcwxc !" }));
};


// ==================================================================================
// "POST" ==> User Login
// ==================================================================================
exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
    .then((user) => {
        if(!user) return res.status(401).json({ message: "Utilisateur non trouvé !" });

        bcrypt.compare(req.body.password, user.password)
        
        .then(valid => {
            if(!valid) return res.status(401).json({ message: "Mot de passe incorrect !" });

            res.status(200).json({
                userId: user._id,                
                token: jwt.sign(
                    { userId: user._id },
                    "RANDOM_TOKEN_SECRET",
                    { expiresIn: "48h" }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// ==================================================================================
// "GET" ==> User Wall
// ==================================================================================
exports.userWall = (req, res, next) => {

    User.findOne()
    .then(() => res.status(200).json({ message: "" }))
    .catch(error => res.status(500).json({ error }));
};


// ==================================================================================
// "GET" ==> User Profile
// ==================================================================================
exports.userProfile = (req, res, next) => {

    User.findOne()
    .then(() => res.status(200).json({ message: "" }))
    .catch(error => res.status(500).json({ error }));
};


// ==================================================================================
// "DELETE" ==> Delete User
// ==================================================================================
exports.deleteUser = (req, res, next) => {

    User.findOne()
    .then(() => res.status(200).json({ message: "" }))
    .catch(error => res.status(500).json({ error }));
};