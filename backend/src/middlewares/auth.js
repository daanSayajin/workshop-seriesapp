const jwt = require('jsonwebtoken')

const { secret } = require('../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).json({ error: 'token not found' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2)
        return res.status(401).json({ error: 'bad formatted token' })

    const [ bearer, token ] = parts

    jwt.verify(token, secret, (err, decoded) => {
        if (err) 
            return res.status(401).json({ error: 'invalid token' })

        req.userId = decoded.id
        return next()
    })
}