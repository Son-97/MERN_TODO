module.exports = (sequelize, DataType) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        task_name: {
            type: DataType.STRING
        },
    });
    return Task;
};