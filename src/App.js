import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import ErrorHandler from './ErrorHandler';

class App extends Component {
    constructor() {
        super();
        this.state = {
            mapCenter: {
                lat: 34.540309,
                lng: -112.469661
            }
        };
    }
  render() {
    return (
      <main className="App">
        <header className="App-header">
                React Neighborhood Map
        </header>

        <ErrorHandler>
            <Map
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                defaultZoom={15}
            />
        </ErrorHandler>
      </main>
    );
  }
}

export default App;
