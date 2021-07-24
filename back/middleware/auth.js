
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, proces.env.Token_Key);
        const tokenUserId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== tokenUserId) throw "Invalid userID !";
        
        else {
            next();
            return tokenUserId;
        } 
    }

    catch (error) {
        res.status(401).json({ message: "None authentified request !" });
    }
};