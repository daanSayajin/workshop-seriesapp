const routes = require('express').Router()

const serieController = require('../controllers/serieController')

routes.get('/', serieController.index)
routes.post('/', serieController.store)
routes.get('/:id', serieController.show)
routes.put('/:id', serieController.update)
routes.delete('/:id', serieController.destroy)

module.exports = routes