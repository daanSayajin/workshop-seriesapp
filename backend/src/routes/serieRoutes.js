const routes = require('express').Router()
const multer = require('multer')

const serieController = require('../controllers/serieController')
const uploadConfig = require('../config/upload')

const upload = multer(uploadConfig);

routes.get('/', serieController.index)
routes.post('/', upload.single('imagem'), serieController.store)
routes.get('/:id', serieController.show)
routes.put('/:id', upload.single('imagem'), serieController.update)
routes.delete('/:id', serieController.destroy)

module.exports = routes