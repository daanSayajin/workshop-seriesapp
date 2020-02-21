import React, { Component } from 'react'

import { signIn } from '../../services/authService'

const ErrorMessage = ({ message }) => {
    return (
        message ? (
            <div>
                <div className="alert alert-danger mt-3">
                    {message}
                </div>
            </div>
        ) : ('')
    )
}

class Login extends Component {

    constructor() {
        super()

        this.state = {
            email: '',
            senha: '',
            errorMessage: null
        }
    }

    inputHandler = e => {
        const { id, value } = e.target

        this.setState({ [id]: value })
    }

    handleLogin = async e => {
        e.preventDefault()

        const { email, senha } = this.state

        const res = await signIn({ email, senha })
       
        if (!res) 
            return this.setState({ errorMessage: 'E-mail e/ou senha inválidos.' })
        else if (res) {
            this.setState({ errorMessage: null })
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">                        
                        <div className="">
                            <h5 className="card-header">
                                Login
                            </h5>

                            <form className="card-body" onSubmit={this.handleLogin}> 
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                        onChange={this.inputHandler}
                                        value={this.state.email}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">Não iremos compartilhar seu endereço de email com ninguém.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input type="password" className="form-control" id="senha" 
                                        onChange={this.inputHandler}
                                        value={this.state.senha}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Entrar</button>

                                <ErrorMessage message={this.state.errorMessage} />
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}

export default Login
