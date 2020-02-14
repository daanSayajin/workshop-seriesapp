import React, { Component } from 'react'

class SeriesForm extends Component {

    inputHandler = e => {
        const { id, value } = e.target

        this.props.inputHandler(id, value)
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.handleSubmit()
    }

    render() {

        const { serie } = this.props

        return (
            <div className="card">
                <h5 className="card-header">
                    Cadastro de séries
                </h5>

                <form 
                    onSubmit={this.handleSubmit}
                    className="card-body"
                >
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" className="form-control mb-2" 
                            onChange={this.inputHandler} 
                            value={serie.nome}    
                        />

                        <label htmlFor="ano_lancamento">Ano de Lançamento</label>
                        <input type="number" id="ano_lancamento" className="form-control mb-2" 
                            onChange={this.inputHandler}
                            value={serie.ano_lancamento}
                        />

                        <label htmlFor="temporadas">Temporadas</label>
                        <input type="number" id="temporadas" className="form-control mb-2" 
                            onChange={this.inputHandler}
                            value={serie.temporadas}
                        />

                        <label htmlFor="sinopse">Sinopse</label>
                        <textarea id="sinopse" className="form-control mb-4" 
                            onChange={this.inputHandler}
                            value={serie.sinopse}    
                        >
                        </textarea>

                        <button type="submit" className="form-control btn btn-success">
                            SALVAR
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SeriesForm