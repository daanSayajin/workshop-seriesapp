import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'               

import Navbar from './components/Navbar'
import SeriesBox from './components/series/SeriesBox'
import Home from './components/home/Home'
import Authors from './components/authors/Authors'

import { isSignedIn } from './services/authService'
import Login from './components/login/Login'

const NotFound = () => {
    return (
        <div>
            <h1>Página não encontrada.</h1>
        </div>
    )
}

const PrivateRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => 
                isSignedIn() ? (
                    <div>
                        <Navbar />
                        <Component />
                    </div>
                ) : (
                    <Redirect to={{ 
                        pathname: '/login', 
                        state: { 
                            from: props.location 
                        } 
                    }} />
                )
            }
        />
    )
}

const Routes = () => {
    return (
        <BrowserRouter>            
            <Switch>
                <Route path="/login" component={Login} />

                <PrivateRoutes exact path="/" component={Home} />
                <PrivateRoutes path="/series" component={SeriesBox} />
                <PrivateRoutes path="/autores" component={Authors} />
                
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes