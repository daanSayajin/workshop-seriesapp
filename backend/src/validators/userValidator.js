const { check, body } = require('express-validator') 
const userModel = require('../models/userModel')

module.exports = [
    check('nome').isLength({ min: 3, max: 50 })
        .withMessage('Deve ter entre 3 e 50 caracteres'),
    check('email').isEmail()
        .withMessage('E-mail inválido'),
    check('email').isLength({ min: 10, max: 100 })
        .withMessage('Deve ter entre 10 e 100 caracteres'),
    check('senha').isLength({ min: 8, max: 15 })
        .withMessage('Deve ter entre 8 e 15 caracteres'),
    body('email').custom(async email => {
        const user = await userModel.findByEmail(email)
        
        if (user[0])
            return Promise.reject('E-mail já cadastrado')
    })           
]