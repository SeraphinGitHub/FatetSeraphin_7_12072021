
module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("Comment", {
        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },

        publishId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },

        textContent: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: { notEmpty: true }
        },
    });

    return Comment;
};