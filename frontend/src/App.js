import React, { Component } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar'
import SeriesBox from './components/series/SeriesBox'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar />
                <SeriesBox />
            </div>
        )
    }
}

export default App
