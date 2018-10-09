import React, { Component } from 'react';
import './App.css';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './Map';
import ErrorHandler from './ErrorHandler';

//google maps Api key
//change this if you want to use a different api key
const googleApiKey = `AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM`;

class App extends Component {
    constructor() {
        super();
        this.state = {
            mapCenter: {
                lat: 34.7497933,
                lng: -112.1151577
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
            <MapContainer
                google={this.props.google}
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                defaultZoom={17}
            />
        </ErrorHandler>
      </main>
    );
  }
}

export default GoogleApiWrapper({
    //pass apiKey and google maps url to the api call's parameters
    apiKey: googleApiKey,
    url: 'https://maps.googleapis.com/maps/api/js',
})(App);

