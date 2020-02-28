const express = require('express')
const cors = require('cors')

const auth = require('./middlewares/auth')

const serieRoutes = require('./routes/serieRoutes')
const userRoutes = require('./routes/userRoutes')
const generoRoutes = require('./routes/generoRoutes')

const app = express()

app.use(express.static('uploads/'))
app.use(express.json())
app.use(cors())

app.use('/usuarios', userRoutes)

app.use(auth)

app.use('/series', serieRoutes)
app.use('/generos', generoRoutes)

module.exports = app