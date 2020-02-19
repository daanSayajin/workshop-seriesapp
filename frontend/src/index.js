import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import Login from './components/login/Login'

const isSignedIn = false

const Index = () => {
    if (isSignedIn)
        return <App />
    
    return <Login />
}

ReactDOM.render(<Index />, document.getElementById('root'));
