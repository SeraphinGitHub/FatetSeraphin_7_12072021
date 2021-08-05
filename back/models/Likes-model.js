
module.exports = (sequelize, DataTypes) => {

    const Likes = sequelize.define("Likes", {

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,            
            validate: { notEmpty: true }
        },

        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,            
            validate: { notEmpty: true }
        },
    });

    return Likes;
};