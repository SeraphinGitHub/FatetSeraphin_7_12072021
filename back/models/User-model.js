
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User",
    {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        userName: DataTypes.STRING,
        position: DataTypes.STRING,
        department: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
    }, {});

    User.associate = (models) => models.User.hasMany(models.Publish);
    return User;
};