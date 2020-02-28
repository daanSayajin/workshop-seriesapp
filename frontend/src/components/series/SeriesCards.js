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

                        <div className="card-body" style={{ display: 'flex', alignItems: 'center' }} >
                            <img src={serie.imagem === '' ? '/logo512.png' : `http://localhost:3000/${serie.imagem}`} alt={serie.nome} className="card-img" />
                        </div>

                        <div className="card-footer">
                            {serie.temporadas}
                            {serie.temporadas > 1 ? ' temporadas - ' : ' temporada - '}
                            <Link to="#" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => {
                                PubSub.publish('detail', serie)
                            }}> Sinopse </Link>

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

    constructor() {
        super()

        this.state = {
            serieDetail: ''
        }

        PubSub.subscribe('detail', (msg, serie) => {
            this.setState({ serieDetail: serie })
        })
    }

    render() {
        const { serieDetail } = this.state 

        return (
            <div className="card mb-3">
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{serieDetail.nome}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={serieDetail.imagem ? `http://localhost:3000/${serieDetail.imagem}` : '/logo512.png'}  alt={serieDetail.nome} className="card-img mb-2" />
                            {serieDetail.temporadas}
                            {serieDetail.temporadas > 1 ? ' temporadas' : ' temporada'} - <span className="text-muted">{serieDetail.ano_lancamento}</span>
                            <br />
                            <br />
                            {serieDetail.sinopse}
                            <br />
                            <br />
                            {serieDetail.generos ? serieDetail.generos.reduce((prev, genero) => (
                                <>
                                    {prev}
                                    <span className="card-header p-2 mr-2 bg-dark text-white">
                                        {genero.genero}
                                    </span>
                                </>
                            ), '') : ''}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>

                <h5 className="card-header text-center">
                    Lista de Séries
                </h5>

                <Cards series={this.props.series} delete={this.props.delete} />
            </div>
        )
    }
}

export default SeriesCards