
const bcrypt = require("bcrypt");
const User = require("../models/User-model");
const jwt = require("jsonwebtoken");


// ==================================================================================
// "POST" ==> User Sign In
// ==================================================================================
exports.signin = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)

    .then(hash => {

        const user = new User({
            email: req.body.email,
            password: hash,
            userName: req.body.userName,
            position: req.body.position,
            department: req.body.department,
            isAdmin: false
        })

        if (!req.body.email
        || !req.body.password
        || !req.body.userName
        || !req.body.position
        || !req.body.department) {
            res.status(401).json({ error: "Veuillez remplir tout les champs !"})
        }

        else user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(error => res.status(400).json({ error }));

    }).catch(error => res.status(500).json({ error }));
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
// "GET" ==> User Page
// ==================================================================================
exports.userPage = (req, res, next) => {

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