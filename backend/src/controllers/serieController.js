const serieModel = require('../models/serieModel')

module.exports = {

    async index(req, res) {
        const series = await serieModel.select()
        
        if (!series)
            return res.status(404).json({ error: 'empty list' })
        
        return res.status(200).json(series)
    },

    async store(req, res) {
        const serie = req.body

        try {
            const { insertId } = await serieModel.insert(serie)
    
            return res.status(201).json({ id: insertId, ...serie })
        } catch(err) {
            return res.status(500).json(err)
        }
    },

    async show(req, res) {
        const { id } = req.params
    
        const serie = await serieModel.selectById(id)

        if (!serie[0])
            return res.status(404).json({ error: 'serie not found' })
        
        return res.status(200).json(serie[0])
    },

    async update(req, res) {
        const { id } = req.params
        let serie = req.body

        serie.id = id 

        const { affectedRows } = await serieModel.update(serie)

        if (!affectedRows)
            return res.status(404).json({ error: 'serie not found' })

        return res.status(200).json({ id, ...serie })
    },

    async destroy(req, res) {
        const { id } = req.params

        const { affectedRows } = await serieModel.delete(id)

        if (!affectedRows)
            return res.status(404).json({ error: 'serie not found' })

        return res.status(204).json()
    }
}