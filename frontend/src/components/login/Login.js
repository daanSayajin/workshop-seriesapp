import React, { Component } from 'react'

class Login extends Component {

    constructor() {
        super()

        this.state = {
            email: '',
            senha: ''
        }
    }

    inputHandler = e => {
        const { id, value } = e.target

        this.setState({ [id]: value })
    }

    handleLogin = async e => {
        e.preventDefault()

        const { email, senha } = this.state

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        }

        const res = await fetch('http://localhost:3000/usuarios/autenticar', params)
       
        if (res.status === 400) {
            return console.log('Usuário ou senha inválido.')
        }

        const user = await res.json()
        console.log(user)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card">
                            <h5 className="card-header">
                                Login
                            </h5>

                            <form className="card-body" onSubmit={this.handleLogin}> 
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
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
