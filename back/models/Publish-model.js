
module.exports = (sequelize, DataTypes) => {

    const Publish = sequelize.define("Publish", {
        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,            
            validate: { notEmpty: true }
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,            
            validate: { notEmpty: true }
        },

        textContent: {
            type: DataTypes.TEXT,
            allowNull: false,            
            validate: { notEmpty: true }
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { notEmpty: true }
        },
    });

    return Publish;
};