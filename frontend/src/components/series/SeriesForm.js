import React, { Component } from 'react'

class SeriesForm extends Component {

    constructor() {
        super()

        this.stateInitial = {
            nome: '',
            ano_lancamento: '',
            temporadas: '',
            sinopse: ''
        }

        this.state = this.stateInitial
    }

    inputHandler = e => {
        const { id, value } = e.target

        this.setState({ [id]: value })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.handleSubmit(this.state)
        this.setState(this.stateInitial)
    }

    render() {
        return (
            <div>
                <form 
                    onSubmit={this.handleSubmit}
                >
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" 
                        onChange={this.inputHandler} 
                        value={this.state.nome}    
                    />

                    <label htmlFor="ano_lancamento">Ano de Lançamento</label>
                    <input type="number" id="ano_lancamento" 
                        onChange={this.inputHandler}
                        value={this.state.ano_lancamento}
                    />

                    <label htmlFor="temporadas">Temporadas</label>
                    <input type="number" id="temporadas" 
                        onChange={this.inputHandler}
                        value={this.state.temporadas}
                    />

                    <label htmlFor="sinopse">Sinopse</label>
                    <textarea id="sinopse" 
                        onChange={this.inputHandler}
                        value={this.state.sinopse}    
                    >
                    </textarea>

                    <button type="submit">SALVAR</button>
                </form>
            </div>
        )
    }
}

export default SeriesForm