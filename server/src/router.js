const AuthenticationController = require('./controllers/AuthenticationCotroller')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const TaskController = require('./controllers/TaskController')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    app.get('/task',
        TaskController.Task)
    app.get('/task/:id',
        TaskController.showTask)
    app.post('/task', 
        TaskController.addTask)
    app.put('/task/:id',
        TaskController.editTask)
    app.delete('/task/:id',
        TaskController.deleteTask)
}