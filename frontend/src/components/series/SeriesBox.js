import React, { Component } from 'react'

import SeriesForm from './SeriesForm'
import SeriesCards from './SeriesCards'

import { list, insert, update, remove } from '../../services/seriesService'

class SeriesBox extends Component {
    
    constructor() {
        super()

        this.state = {
            series: []
        }
    }

    async componentDidMount() {
        let series

        try {
            const res = await list() 
            series = await res.json()
        } catch(e) {
            return console.log(e)
        }

        this.setState({ series })
    }

    handleSubmit = async serie => {
        let res 

        const data = new FormData()

        data.append('id', serie.id)
        data.append('nome', serie.nome)
        data.append('ano_lancamento', serie.ano_lancamento)
        data.append('temporadas', serie.temporadas)
        data.append('sinopse', serie.sinopse)
        data.append('imagem', serie.imagem)
        data.append('generos', JSON.stringify(serie.generos.map(genero => {
            return {
                id: genero.value,
                genero: genero.label
            }
        })))

        try {
            if (serie.id) 
                res = await update(data)
            else 
                res = await insert(data)
        } catch(e) {
            return console.log(e)
        }

        if (res.status === 201) {
            serie = await res.json()

            this.setState({
                series: [...this.state.series, serie]
            })
        }

        else if (res.status === 200) {
            serie = await res.json()

            this.setState({
                series: this.state.series.map(s => +s.id === +serie.id ? serie : s)
            })
        }
    }

    delete = async id => {
        const res = await remove(id) 
        
        if (res.status !== 204) 
            return console.log('Failed to delete')

        this.setState({
            series: this.state.series.filter(serie => serie.id !== id)
        })
    }   

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <SeriesForm handleSubmit={this.handleSubmit} />
                    </div>
                    <div className="col-md-8">
                        <SeriesCards series={this.state.series} delete={this.delete} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SeriesBox