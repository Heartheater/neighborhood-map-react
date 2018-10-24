import React, { Component } from 'react';
import './App.css';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';
import ErrorHandler from './ErrorHandler';
import FoursquareAPI from './FoursquareAPI';

//google maps Api key
//change this if you want to use a different api key
const googleApiKey = `AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM`;

class App extends Component {
    state = {
        mapCenter: {
            lat: 33.448376,
            lng: -112.074036
        },
        allLocations: [],
        searchResults: [],
        loading: true,
    }
    
    async componentDidMount() {
        //let locationIds = FoursquareAPI.getRestaurantIds(this.state.mapCenter.lat, this.state.mapCenter.lng);
        let locationIds = [
            "4d4464d4bf61a1cd2b5408ac",
            "4f999981e5e82ef193a1ce45",
            "4df7c1342271d8baf9c4de8d",
            "4ed67e1a61afeefb7cdc16ef",
            "5230bf8811d2a4689e05fc19",
            "55107942498ed654c625de3f",
            "530e49af498eb68729749d86",
            "5244874911d23515396871b5",
        ];
        let locationData = [];
        //loop through locationIds array and use each id to fetch location data
        for (let count = 0; count < locationIds.length; ++count) {
            await FoursquareAPI.getLocationDetails(locationIds[count])
                .then(data => {
                    if (data.meta.errorDetail) {
                        return console.error(`FourSquareAPI fetch error ${data.meta.errorDetail}`);
                    }
                    return locationData.push(data.response.venue);
                }).catch(err => console.error(err));
        }
        console.log(locationData);

        this.setState({
            allLocations: locationData,
            searchResults: locationData,
            loading: false
        });
    }
    

    filterLocations = (query) => {
        //if query is empty return all locations
        if (query === " " || !query) {
            return this.setState({ searchResults: this.state.allLocations});
        }

        let matchedLocations = this.state.allLocations.filter((location) => {
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

        return this.setState({ searchResults: matchedLocations });
    }//filterLocations end


  render() {
    return (
      <main className="App">
            <header className="header">
                <div>
                    <button
                        className="open-sidebar-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            //toggles sidebar open/close
                            let menu = document.querySelector('.sidebar');
                            if (!menu) return;
                            menu.classList.toggle("close");
                            menu.classList.toggle("open");
                        }}
                    >
                        <i className="fas fa-bars fa-2x" />
                    </button>
                </div>
                <h1 className="title"> React Neighborhood Map </h1>
            </header>
            {this.state.loading ?
                <p className="loading">loading...</p>
                :
                <ErrorHandler>
                    <MapContainer
                        google={this.props.google}
                        initialCenter={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                        defaultZoom={16}
                        filterLocations={this.filterLocations}
                        locationsArray={this.state.searchResults}
                    />
                </ErrorHandler>
            }
      </main>
    );
  }
}

export default GoogleApiWrapper({
    //pass apiKey and google maps url to the api call's parameters
    apiKey: googleApiKey,
    url: 'https://maps.googleapis.com/maps/api/js',
})(App);
