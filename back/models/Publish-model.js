
module.exports = (sequelize, DataTypes) => {

    const Publish = sequelize.define("User", {

        textContent: {
            type: DataTypes.STRING,
            allowNull: false,            
            validate: { notEmpty: true }
        },
    });

    return Publish;
};