module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        email: {
            type: DataType.STRING,
            unique: true,
        },
        password: DataType.STRING,
    });
    return User;
};