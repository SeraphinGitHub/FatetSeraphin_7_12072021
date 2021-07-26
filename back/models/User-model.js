
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },

        token: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { notEmpty: true }
        },
        
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },

        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },

        department: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { notEmpty: true }
        },

        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false,
            validate: { notEmpty: true }
        },
    });

    return User;
};