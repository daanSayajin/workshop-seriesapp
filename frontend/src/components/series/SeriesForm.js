import React, { Component } from 'react'
import Select from 'react-select'
import PubSub from 'pubsub-js'

import { list } from '../../services/generosService'

import camera from '../../assets/camera.svg'

import './SeriesForm.css'

class SeriesForm extends Component {

    constructor(props) {
        super(props)

        this.stateInitial = {
            id: null,
            nome: '',
            ano_lancamento: '',
            temporadas: '',
            sinopse: '',
            imagem: '',
            generos: [],
            select: {
                generos: '',
            },
            invalidToken: false
        }

        this.state = this.stateInitial

        PubSub.subscribe('editing', (msg, serie) => {
            this.setState(serie)
            this.setState({ generos: 
                serie.generos.map(genero => {
                    return {
                        value: genero.id,
                        label: genero.genero
                    }
                })
            })
        })
    }

    async componentDidMount() {
        let generos

        try {
            const res = await list() 

            if (res.status === 401) return this.setState({ invalidToken: true })

            generos = await res.json()
        } catch(e) {
            return console.log(e)
        }

        this.setState({ select: {
            generos: generos.map(genero => {
                return {
                    value: genero.id,
                    label: genero.genero
                }
            })
        }})
    }

    inputHandler = e => {
        const { id, value } = e.target

        this.setState({ [id]: value })
    }

    handleSelectChange = selectedOption => {
        this.setState({ generos: selectedOption })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.handleSubmit(this.state)
        this.setState(this.stateInitial)
    }

    preview = thumbnail => {
        if (thumbnail instanceof Object) 
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        else
            return thumbnail ? `http://localhost:3000/${thumbnail}` : null
    }

    render() {
        return (
            <div className="card mb-3">
                <h5 className="card-header">
                    Cadastro de séries
                </h5>

                <form 
                    className="card-body"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" className="form-control mb-2" 
                            onChange={this.inputHandler} 
                            value={this.state.nome}    
                        />

                        <label htmlFor="ano_lancamento">Ano de Lançamento</label>
                        <input type="number" id="ano_lancamento" className="form-control mb-2" 
                            onChange={this.inputHandler}
                            value={this.state.ano_lancamento}
                        />

                        <label htmlFor="temporadas">Temporadas</label>
                        <input type="number" id="temporadas" className="form-control mb-2" 
                            onChange={this.inputHandler}
                            value={this.state.temporadas}
                        />

                        <label htmlFor="sinopse">Sinopse</label>
                        <textarea id="sinopse" className="form-control mb-4" 
                            onChange={this.inputHandler}
                            value={this.state.sinopse}    
                        >
                        </textarea>

                        <label 
                            id="thumbnail" 
                            style={{ backgroundImage: `url(${this.preview(this.state.imagem)})` }}
                            className={this.state.imagem ? 'has-thumbnail' : ''}
                        >
                            <input type="file" onChange={e => this.setState({ imagem: e.target.files[0] })} />
                            <img src={camera} alt="Select icon" />
                        </label>

                        <Select
                            value={this.state.generos}
                            onChange={this.handleSelectChange}
                            options={this.state.select.generos}
                            className="mb-4"
                            isMulti
                        />

                        <button type="submit" className="form-control btn btn-success" disabled={this.state.invalidToken ? 'disabled' : ''}>
                            SALVAR
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SeriesForm