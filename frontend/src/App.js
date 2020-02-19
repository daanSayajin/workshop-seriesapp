import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'                


import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
                                                                    
import Navbar from './components/Navbar'
import SeriesBox from './components/series/SeriesBox'
import Home from './components/home/Home'
import Authors from './components/authors/Authors'

const NotFound = () => {
    return (
        <div>
            <h1>Página não encontrada.</h1>
        </div>
    )
}

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route path="/series" component={SeriesBox} />
                        <Route path="/autores" component={Authors} />
                        
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App

