import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
        this.props.socket.on('kuhler', (data) => console.log(data));
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        )
    }
}

export default socketConnect(App);