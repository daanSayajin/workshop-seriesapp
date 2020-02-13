const express = require('express')
const jwt = require('jsonwebtoken')

const serieRoutes = require('./routes/serieRoutes')
const userRoutes = require('./routes/userRoutes')

const { secret } = require('./config/auth')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')

    return next()
})

app.use('/usuarios', userRoutes)

// app.use((req, res, next) => {
//     const authHeader = req.headers.authorization

//     if (!authHeader)
//         return res.status(401).json({ error: 'token not found' })

//     const parts = authHeader.split(' ')

//     if (parts.length !== 2)
//         return res.status(401).json({ error: 'bad formatted token' })

//     const [ bearer, token ] = parts

//     jwt.verify(token, secret, (err, decoded) => {
//         if (err) 
//             return res.status(401).json({ error: 'invalid token' })

//         req.userId = decoded.id
//         return next()
//     })
// })

app.use('/series', serieRoutes)

module.exports = app