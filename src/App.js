import React, { Component } from 'react';
import './App.css';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';
import ErrorHandler from './ErrorHandler';



//google maps Api key
//change this if you want to use a different api key
const googleApiKey = `AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM`;

const locationsArray = [
    { name: 'Haunted Hamburger', lat: 34.750263, lng: -112.11605 },
    { name: 'Jerome Artists Co-op', lat: 34.7496591, lng: -112.114419 },
    { name: 'The Mine Cafe', lat: 34.7511169, lng: -112.1158929 },
    { name: 'Mile High Grill & Inn', lat: 34.750431, lng: -112.1159191 },
    { name: 'Spirit Room', lat: 34.7512062, lng: -112.1162356 },
    { name: 'The Flatiron', lat: 34.749793, lng: -112.114615 },
    { name: 'Surgeon\'s House', lat: 34.749636, lng: -112.115789 }
];

class App extends Component {
    constructor() {
        super();
        this.state = {
            mapCenter: {
                lat: 34.7497933,
                lng: -112.1151577
            },
            searchResults: locationsArray,
            noResultFound: false

        };
    }

    filterLocations = (query) => {
        //if query is empty return all locations
        if (query === " " || !query) {
            return this.setState({ searchResults: locationsArray, noResultFound: false });
        }

        let matchedLocations = locationsArray.filter((location) => {
            //if the location name matches the query
            if (location.name.toLowerCase().includes(query)) {
                //keep that location in matchedLocations
                return location;
            }
            //otherwise check if query matches any of the location's categories
            else if (location.categories) {
                for (let count = 0; count < location.categories.length; ++count) {
                    if (location.categories[count].pluralName.toLowerCase().includes(query)) {
                        return location;
                    }
                }
            }
        });

        //if query doesn't match anything return noResultFound
        if (matchedLocations.length <= 0)
            this.setState({ noResultFound: true });
        else
            this.setState({ noResultFound: false });
        
        return this.setState({ searchResults: matchedLocations });
    }//filterLocations end



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
                    filterLocations={this.filterLocations}
                    noResultFound={this.state.noResultFound}
                    locationsArray={this.state.searchResults}
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

