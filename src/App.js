import React, { Component } from 'react';
import KuhlerChart from './KuhlerChart';
import './App.css';

class App extends Component {
	render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Cache-server stats</h1>
                </header>
                <main>
                    <KuhlerChart type="fanRPM" />
                    <KuhlerChart type="pumpRPM" />
                    <KuhlerChart type="liquidTemp" />
                </main>
            </div>
        )
    }
}

export default App;