import React, { Component } from 'react'

class SeriesTable extends Component {

    render() {
        return (
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
                        {this.props.series.map(serie => {
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
        )
    }
}

export default SeriesTable