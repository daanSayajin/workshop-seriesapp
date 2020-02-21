import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'

import './SeriesCards.css'

const Cards = props => {

    if (props.series.error) {
        return <h1 className="text-center mt-3 mb-3">Token expirado!</h1>
    }

    return (
        <div className="card-body card-body-flex">
            {props.series.map(serie => {
                return (
                    <div className="card card-serie mb-3" key={serie.id}>
                        <div className="card-header">
                            <h5 className="card-title"> {serie.nome} </h5>
                            <h6 className="card-title text-muted"> {serie.ano_lancamento} </h6>
                        </div>

                        <div className="card-body">
                            <img src="/logo192.png" alt={serie.nome} className="card-img" />
                        </div>

                        <div className="card-footer">
                            {serie.temporadas}
                            {serie.temporadas > 1 ? ' temporadas - ' : ' temporada - '}
                            <Link to="#"> Sinopse </Link>

                            <button className="btn btn-outline-danger btn-sm mt-2 mr-2"
                                onClick={() => {
                                    if (window.confirm('Deseja realmente excluir essa série?'))
                                        props.delete(serie.id)
                                }}
                            >
                                Deletar
                            </button>
                            
                            <button className="btn btn-outline-warning btn-sm mt-2"
                                onClick={() => {
                                    PubSub.publish('editing', serie)
                                }}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

class SeriesCards extends Component {
    render() {
        return (
            <div className="card mb-3">
                <h5 className="card-header text-center">
                    Lista de Séries
                </h5>

                <Cards series={this.props.series} delete={this.props.delete} />
            </div>
        )
    }
}

export default SeriesCards