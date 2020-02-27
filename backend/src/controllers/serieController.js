const serieModel = require('../models/serieModel')
const seriesGenerosModel = require('../models/seriesGeneroModel')

module.exports = {

    async index(req, res) {
        const series = await seriesGeneroModel.select()
        const seriesFixedGenero = []

        if (!series)
            return res.status(404).json({ error: 'empty list' })
        
        /* Lógica pra tirar as séries repetidas e juntar os gêneros, foi o único jeito que consegui pensar nos momentos de pressão, com certeza há um jeito melhor. */
        let id_series = series.reduce((acc, serie) => `${acc} ${serie.id_serie}`, '').split(' ')
        id_series.shift()

        id_series = id_series.filter((serie, i) => id_series.indexOf(serie) === i)
        
        id_series.forEach(id_serie => {
            const serie = series[series.map(serie => serie.id_serie).indexOf(+id_serie)]
            const generos = series.filter(serie => serie.id_serie === +id_serie).map(serie => serie.genero)

            seriesFixedGenero.push({
                nome: serie.nome,
                ano_lancamento: serie.ano_lancamento,
                temporadas: serie.temporadas,
                sinopse: serie.sinopse,
                imagem: serie.imagem,
                generos
            })
        });

        return res.status(200).json(seriesFixedGenero)
    },

    async store(req, res) {
        const serie = req.body
        const { filename } = req.file

        const generos = JSON.parse(serie.generos)
        delete serie.generos

        try {
            const { insertId } = await serieModel.insert({ ...serie, imagem: filename })
    
            for (let i = 0; i < generos.length; i++) {
                await seriesGenerosModel.insert({ 
                    id_serie: insertId,  
                    id_genero: generos[i].id
                })
            }

            return res.status(201).json({ id: insertId, ...serie, generos, imagem: filename })
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