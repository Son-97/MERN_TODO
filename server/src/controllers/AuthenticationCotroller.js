const { User } = require('../models')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
process.env.SECRET_KEY = 'secret';

module.exports = {
    async register(req, res, ) {
        const today = new Date();
        const UserData = {
            email: req.body.email,
            password: req.body.password,
            created: today
        }
        try {
            var user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    UserData.password = hash
                    User.create(UserData)
                        .then(user => {
                            res.json({ status: user.email + ' registered' })
                        })
                        .catch(err => {
                            res.send("error: " + err)
                        })
                })
            }
            else {
                res.json({ error: 'User alreadly exists.' })
            }
        }
        catch (err) {
            res.send("error: " + err)
        }
    },
    //login
    async login(req, res) {
        try {
            var user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.status(400).json({ error: 'User does not exist.' })
            }
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    }
}