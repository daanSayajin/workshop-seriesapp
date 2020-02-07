const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

module.exports = (params) => {
    return jwt.sign(params, secret, {
        expiresIn: 60
    })
}