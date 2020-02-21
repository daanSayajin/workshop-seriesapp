const express = require('express')
const cors = require('cors')

const auth = require('./middlewares/auth')

const serieRoutes = require('./routes/serieRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())

app.use(cors())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Max-Age', '3600')

//     return next()
// })

app.use('/usuarios', userRoutes)

app.use(auth)

app.use('/series', serieRoutes)

module.exports = app