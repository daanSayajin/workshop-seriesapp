import React, { Component } from 'react'

import SeriesForm from './SeriesForm'
import SeriesCards from './SeriesCards'

class SeriesBox extends Component {
    
    constructor() {
        super()

        this.emptySerie = {
            nome: '',
            ano_lancamento: '',
            temporadas: '',
            sinopse: ''
        }

        this.state = {
            series: [],
            serie: this.emptySerie
        }
    }

    async componentDidMount() {
        const series = await (await fetch('http://localhost:3000/series')).json()

        this.setState({
            series
        })
    }

    inputHandler = (field, value) => {
        this.setState({
            serie: {
                ...this.state.serie,
                [field]: value
            }
        })
    }

    changeSerieState = serie => {
        this.setState({ serie })
    }

    handleSubmit = async () => {
        let { serie } = this.state

        const params = {
            method: serie.id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serie)
        }

        let res = await fetch(`http://localhost:3000/series/${serie.id || ''}`, params)

        if (res.status === 201) {
            serie = await res.json()

            this.setState({
                series: [...this.state.series, serie],
                serie: this.emptySerie
            })
        }

        else if (res.status === 200) {
            serie = await res.json()

            this.setState({
                series: this.state.series.map(s => s.id == serie.id ? serie : s),
                serie: this.emptySerie
            })
        }
    }

    delete = async id => {
        const res = await fetch('http://localhost:3000/series/' + id, { method: 'DELETE' })

        if (res.status !== 204) 
            return console.log('Failed to delete')

        this.setState({
            series: this.state.series.filter(serie => serie.id !== id)
        })
    }   

    edit

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <SeriesForm 
                            handleSubmit={this.handleSubmit} 
                            serie={this.state.serie} 
                            inputHandler={this.inputHandler}
                        />
                    </div>
                    <div className="col-md-8">
                        <SeriesCards 
                            series={this.state.series} 
                            delete={this.delete}
                            changeSerieState={this.changeSerieState}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SeriesBox