import React, { Component } from 'react'

import SeriesForm from './SeriesForm'
import SeriesTable from './SeriesTable'

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

    render() {
        return (
            <div>
                <SeriesForm handleSubmit={this.handleSubmit} />
                <SeriesTable series={this.state.series} />
            </div>
        )
    }
}

export default SeriesBox