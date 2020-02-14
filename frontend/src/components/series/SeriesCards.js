import React, { Component } from 'react'

import './SeriesCards.css'

const Cards = props => {
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
                            <a href="#"> Sinopse </a>

                            <button className="btn btn-outline-danger btn-sm mt-2 mr-2"
                                onClick={() => {
                                    if (window.confirm('Deseja realmente excluir essa série?'))
                                        props.delete(serie.id)
                                }}
                            >
                                Deletar
                            </button>
                            
                            <button className="btn btn-outline-warning btn-sm mt-2"
                                onClick={() => props.changeSerieState(serie)}
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
            <div className="card">
                <h5 className="card-header text-center">
                    Lista de Séries
                </h5>

                <Cards 
                    series={this.props.series} 
                    delete={this.props.delete} 
                    changeSerieState={this.props.changeSerieState}
                />
            </div>
        )
    }
}

export default SeriesCards