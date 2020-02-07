import React, { Component } from 'react'
import './App.css'

class App extends Component {

    constructor() {
        super()

        this.state = {
            lista: []
        }
    }

    async componentDidMount() {
        const series = await (await fetch('http://localhost:3000/series')).json()

        this.setState({
            lista: series
        })
    }

    render() {
        return (
            <div className="App">
                <h1>CADASTRO DE SÉRIES</h1>
                
                <div>
                    <form method="POST">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" />

                        <label htmlFor="lancamento">Ano de Lançamento</label>
                        <input type="text" id="lancamento" />

                        <label htmlFor="temporadas">Temporadas</label>
                        <input type="text" id="temporadas" />

                        <label htmlFor="sinopse">Sinopse</label>
                        <textarea id="sinopse"></textarea>

                        <button type="submit">SALVAR</button>
                    </form>

                    <div className="list">
                        <table cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Lançamento</th>
                                    <th>Temporadas</th>
                                    <th>Sinopse</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.lista.map(serie => {
                                    return (
                                        <tr key={serie.id}>
                                            <td>{serie.nome}</td>
                                            <td>{serie.ano_lancamento}</td>
                                            <td>{serie.temporadas}</td>
                                            <td>{serie.sinopse}</td>
                                        </tr>     
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
