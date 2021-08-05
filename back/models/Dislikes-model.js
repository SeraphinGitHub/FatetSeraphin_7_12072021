
module.exports = (sequelize, DataTypes) => {

    const Dislikes = sequelize.define("Dislikes", {

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

    return Dislikes;
};