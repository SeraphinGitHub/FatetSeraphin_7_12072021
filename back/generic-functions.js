
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {

    // Delete One Item by its ID
    deleteItem: function(item, itemName, res) {
        
        item.destroy({ where: { id: item.id } })
        .then(() => res.status(200).json({ message: `${itemName} deleted successfully !` }))
        .catch(() => res.status(500).json({ message: `${itemName} NOT deleted !` }));
    },

    // Delete One Item by its ID
    getUserId: function(req, res, next, elseValue) {
        
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.Token_Key);
            const tokenUserId = decodedToken.userId;
        
            if(req.body.userId && req.body.userId !== tokenUserId) throw "Invalid userID !";
            else if(elseValue === "token") return tokenUserId;
            else if(elseValue === "next") next();
        }
        catch (error) { res.status(401).json({ message: "None authentified request !" }) }
    },
}