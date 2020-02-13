import React, { Component } from 'react'

import SeriesForm from './SeriesForm'
import SeriesCards from './SeriesCards'

class SeriesBox extends Component {
    
    constructor() {
        super()

        this.state = {
            series: []
        }
    }

    async componentDidMount() {
        const series = await (await fetch('http://localhost:3000/series')).json()

        this.setState({
            series
        })
    }

    handleSubmit = async serie => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serie)
        }

        try {
            let res = await fetch('http://localhost:3000/series', params)
            
            if (res.status !== 201) {
                return console.log('Failed to post')
            }

            serie = await res.json()

            this.setState({
                series: [...this.state.series, serie]
            })
        } catch (e) {
            console.log(e)
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