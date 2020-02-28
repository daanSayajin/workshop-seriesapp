const routes = require('express').Router()

const generoController = require('../controllers/generoController')

routes.get('/', generoController.index)

module.exports = routes