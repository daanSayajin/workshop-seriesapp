const routes = require('express').Router()

const userController = require('../controllers/userController')
const userValidator = require('../validators/userValidator')

routes.post('/registrar', userValidator, userController.store)
routes.post('/autenticar', userController.authenticate)

module.exports = routes