import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import ErrorHandler from './ErrorHandler';
import FoursquareAPI from './FoursquareAPI';

export default class App extends Component {
    state = {
        mapCenter: {
            lat: 34.749859,
            lng: -112.114983
        },
        allLocations: [],
        searchResults: [],
        loading: true,
        fourSquareError: false,
    }
    
    async componentDidMount() {
        let locationIds = [
            "4b774f58f964a520f5902ee3",
            "4bc0f2ceb492d13a123ca560",
            "4bae81e5f964a520c9ba3be3",
            "51ed7c95498e21212f39e672",
            "4c390ad93849c928eea6c0b1",
            "4d98d729af3d236aeb2246c7",
            "548cbf12498e6b13ea18b0e0",
            "4b889184f964a5204a0132e3",
            "4cf40154cc61a35d9436239e",
            "5404ec65498e50e6e21ecfa8",
            "4d601574ef378cfa52a878a6",
            "527ab3bb498e3f8e27bad5e5",
            "4bb7b2bf3db7b7139568209a",
        ];

        let locationData = [];

        //loop through locationIds array and use each id to fetch location data
        for (let count = 0; count < locationIds.length; ++count) {
            await FoursquareAPI.getLocationDetails(locationIds[count])
                .then(data => {
                    //check if there was an error fetching foursquare
                    if (data.meta.errorDetail) {
                        this.setState({
                            fourSquareError: true
                        });
                        return console.error(`FourSquareAPI fetch error ${data.meta.errorDetail}`);
                    } else {
                        this.setState({
                            fourSquareError: false
                        });
                    }
                    return locationData.push(data.response.venue);
                }).catch(err => console.error(err));
        }

        return this.setState({
            allLocations: locationData,
            searchResults: locationData,
            loading: false,
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
            return null;
        });

        return this.setState({ searchResults: matchedLocations });
    }//filterLocations end


  render() {
    return (
      <main className="App">
            <header className="header">
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
                    aria-label={"toggle sidebar"}
                >
                    <i className="fas fa-bars fa-2x" />
                </button>
                <h1 className="title"> React Neighborhood Map </h1>
            </header>
            {this.state.loading ?
                <h2 className="loading-text">Loading App <span className="loading-animation"/></h2>
                :
                <ErrorHandler>
                    <MapContainer
                        initialCenter={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                        defaultZoom={15}
                        filterLocations={this.filterLocations}
                        locationsArray={this.state.searchResults}
                        fourSquareError={this.state.fourSquareError}
                    />
                </ErrorHandler>
            }
      </main>
    );
  }
}

