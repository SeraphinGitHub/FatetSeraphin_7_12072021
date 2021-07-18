
module.exports = (sequelize, DataTypes) => {
    
    const Publish = sequelize.define("Publish", {
        textContent: DataTypes.STRING,
        picture: DataTypes.STRING,
    }, {});

    Publish.associate = (models) => models.Publish.belongsTo(models.User, {foreignKey: { allowNull: false }});
    return Publish;
};