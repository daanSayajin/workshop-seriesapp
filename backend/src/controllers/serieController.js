const fs = require('fs')

const serieModel = require('../models/serieModel')
const serieGeneroModel = require('../models/serieGeneroModel')

module.exports = {

    async index(req, res) {
        const series = await serieGeneroModel.select()
        const seriesJoined = []

        if (!series)
            return res.status(404).json({ error: 'empty list' })
        
        let id_series = series.map(serie => serie.id_serie)
        id_series = id_series.filter((serie, i, self) => self.indexOf(serie) === i)
        
        id_series.forEach(id_serie => {
            const serie = series[series.map(serie => serie.id_serie).indexOf(+id_serie)]
            const generos = series.filter(serie => serie.id_serie === +id_serie).map(serie => {
                return {
                    id: serie.id_genero,
                    genero: serie.genero
                }
            })

            seriesJoined.push({
                id: serie.id_serie,
                nome: serie.nome,
                ano_lancamento: serie.ano_lancamento,
                temporadas: serie.temporadas,
                sinopse: serie.sinopse,
                imagem: serie.imagem,
                generos
            })
        });

        return res.status(200).json(seriesJoined)
    },

    async store(req, res) {
        const serie = req.body
        let filename = ''

        if (req.file) 
            filename = req.file.filename
        else 
            filename = serie.imagem

        const generos = JSON.parse(serie.generos)
        delete serie.generos

        try {
            const { insertId } = await serieModel.insert({ ...serie, imagem: filename })
    
            generos.forEach(async genero => {
                await serieGeneroModel.insert({ 
                    id_serie: insertId,  
                    id_genero: genero.id
                })
            })

            return res.status(201).json({ id: insertId, ...serie, generos, imagem: filename })
        } catch(err) {
            return res.status(500).json(err)
        }
    },

    async show(req, res) {
        const { id } = req.params
        const serieJoined = []

        const serie = await serieGeneroModel.selectById(id)

        if (!serie[0])
            return res.status(404).json({ error: 'serie not found' })

        const { id_serie } = serie[0]
        const generos = serie.filter(serie => serie.id_serie === id_serie).map(serie => {
            return {
                id: serie.id_genero,
                genero: serie.genero
            }
        })

        serieJoined.push({
            id: serie[0].id_serie,
            nome: serie[0].nome,
            ano_lancamento: serie[0].ano_lancamento,
            temporadas: serie[0].temporadas,
            sinopse: serie[0].sinopse,
            imagem: serie[0].imagem,
            generos
        })

        return res.status(200).json(serieJoined)
    },

    async update(req, res) {
        const { id } = req.params
        let serie = req.body
        let filename = ''

        if (req.file) {
            filename = req.file.filename
            const { imagem } = (await serieModel.selectById(id))[0]

            if (imagem !== '')
                fs.unlinkSync(`uploads/${imagem}`)
        } else 
            filename = serie.imagem

        const generos = JSON.parse(serie.generos)
        delete serie.generos

        serie.id = id 

        const { affectedRows } = await serieModel.update({ ...serie, imagem: filename })

        if (!affectedRows)
            return res.status(404).json({ error: 'serie not found' })

        await serieGeneroModel.delete(id)
        
        generos.forEach(async genero => {
            await serieGeneroModel.insert({ 
                id_serie: id,  
                id_genero: genero.id
            })
        })

        return res.status(200).json({ id, ...serie, generos, imagem: filename })
    },

    async destroy(req, res) {
        const { id } = req.params

        const { imagem } = (await serieModel.selectById(id))[0]
        fs.unlinkSync(`uploads/${imagem}`)

        const { affectedRows } = await serieGeneroModel.delete(id)

        if (!affectedRows)
            return res.status(404).json({ error: 'serie not found' }) 

        await serieModel.delete(id)

        return res.status(204).json()
    }
}