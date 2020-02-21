const { validationResult } = require('express-validator') 
const bcrypt = require('bcryptjs')

const userModel = require('../models/userModel')

const generateToken = require('../config/generateToken')

module.exports = {

    async store(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) 
            return res.status(422).json({ errors: errors.array() })

        let user = req.body

        try {
            user.senha = await bcrypt.hash(user.senha, 10)
            const { insertId } = await userModel.insert(user)

            return res.status(201).json({
                 id: insertId, 
                 ...user, 
                 token: generateToken({ id: insertId }) 
            })  
        } catch(err) {
            return res.status(500).json(err)
        }      
    },
    
    async authenticate(req, res) {
        const { email, senha } = req.body

        try {
            const user = await userModel.findByEmail(email)

            if (!user[0])
                return res.status(400).json({ error: 'user not found' })

            if (!await bcrypt.compare(senha, user[0].senha))
                return res.status(400).json({ error: 'invalid password' })

            delete user[0].senha

            return res.status(200).json({ 
                ...user[0],
                token: generateToken({ id: user[0].id })
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}