const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {sequelize} = require('./src/models')
const config = require('./src/config/config')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./src/router')(app)

sequelize.sync()
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    })