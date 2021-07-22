
module.exports = (sequelize, DataTypes) => {

    const Publish = sequelize.define("Publish", {

        textContent: {
            type: DataTypes.STRING,
            allowNull: false,            
            validate: { notEmpty: true }
        },
    });

    return Publish;
};