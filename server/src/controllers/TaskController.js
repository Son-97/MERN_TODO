const { Task } = require('../models')

module.exports = {
    async Task(req, res) {
        try {
            var tasks = await Task.findAll();
            if (tasks) {
                res.json(tasks)
            }
        }
        catch (err) {
            res.send('error: ' + err)
        }
    },
    async showTask(req, res) {
        try {
            const task = await Task.findOne({ 
                where: { 
                    id: req.params.id 
                } 
            })
            res.send(task)
        } catch (err) {
            res.status(500).send({
                error: err
            })
        }
    },
    async addTask(req, res) {
        try {
            const task = await Task.create(req.body)
            res.send(task)
        }
        catch (err) {
            res.send("error: " + err)
        }
    },
    async editTask(req, res) {
        try {
            await Task.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Error: ' + err
            })
        }
    },
    async deleteTask(req, res) {
        try {
            const task = await Task.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!task) {
                return res.status(403).send({
                    error: 'You do not have access to this task'
                })
            }
            await task.destroy()
            res.send('Task Deleted')
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete the task'
            })
        }
    }
}