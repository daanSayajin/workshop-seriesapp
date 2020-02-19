const express = require('express')

const auth = require('./middlewares/auth')

const serieRoutes = require('./routes/serieRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')

    return next()
})

app.use('/usuarios', userRoutes)

app.use(auth)

app.use('/series', serieRoutes)

module.exports = app