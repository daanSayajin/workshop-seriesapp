const generoModel = require('../models/generoModel')

module.exports = {

    async index(req, res) {
        const generos = await generoModel.select()

        if (!generos[0])
            return res.status(404).json({ error: 'empty list' })

        return res.status(200).json(generos)
    }
}