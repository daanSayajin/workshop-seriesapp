import React, { Component } from 'react'

import './App.css'

import SeriesBox from './components/series/SeriesBox'

class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>CADASTRO DE SÉRIES</h1>
             
                <SeriesBox />
            </div>
        )
    }
}

export default App
