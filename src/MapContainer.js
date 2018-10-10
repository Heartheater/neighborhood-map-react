import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import escapeRegEx from 'escape-string-regexp';
import Sidebar from './Sidebar';

export default class MapContainer extends Component {
    state = {
        defaultMapCenter: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        windowOpen: false,
        activeMarker: null,
        allMarkers: [],

        infoWindow: new this.props.google.maps.InfoWindow(),
    }

    componentDidMount() {
        this.loadMap();
        this.addMarkers();
    }

    loadMap() {
        //check if google is available
        if (this.props && this.props.google) {
            const { google } = this.props;
            const mapContainer = this.refs.map;

            //create map
            const mapCenter = new google.maps.LatLng(this.props.initialCenter.lat, this.props.initialCenter.lng);
            const mapConfig = Object.assign({}, {
                center: mapCenter,
                zoom: this.props.defaultZoom,
            })
            this.map = new google.maps.Map(mapContainer, mapConfig);
        }
    }//loadMap end

    addMarkers = () => {
        const { google } = this.props;

        //create a new marker for each location
        return this.props.locationsArray.map(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: this.map,
                name: location.name,
                title: location.name
            });

            //show info window when marker is clicked
            marker.addListener('click', () => this.showInfo(marker, this.state.infoWindow));

            //add this marker to allMarkers array
            return this.setState((prev) => ({
                allMarkers: [...prev.allMarkers, marker]
            }));
        });
    }//addMarkers end

    showInfo = (marker, infoWindow) => {
        //return if infowindow is already open on this marker
        if (infoWindow.marker === marker) return;
        infoWindow.marker = marker;
        infoWindow.setContent(`<h4>${marker.name}</h4> <p>details</p>`);
        infoWindow.open(this.map, marker);

        //erase content when window closes
        infoWindow.addListener('closeclick', () => infoWindow.marker = null);
    };

    animateMarker(marker) {
        const { google } = this.props;

        //return if marker still has an animation 
        if (marker.getAnimation()) return;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 750);
    }

    locationClickHandler = (location) => {
        this.state.allMarkers.map(marker => {
            if (location.name.toLowerCase() === marker.name.toLowerCase()) {
                //show info window for the clicked location
                this.showInfo(marker, this.state.infoWindow);
                this.animateMarker(marker);
            }
        });
    }


    filterMarkers(query) {
        //check each map marker to see if it matches the search query
        this.state.allMarkers.map(marker => {
            //if the marker matches the query, keep it visible
            if (marker.name.toLowerCase().includes(query)) {
               return marker.setMap(this.map);
            } //if the marker doesn't match, hide it from the map
            else {
               return marker.setMap(null);
            }
        });
    }

    render() {
        return (
            <div className="map-container"> 
                <Sidebar
                    locationsArray={this.props.locationsArray}
                    locationClickHandler={this.locationClickHandler}
                >
                    {/*Input for filtering results*/}
                    <div className="location-filter-wrapper">
                        <input
                            className="location-filter-btn"
                            type="text"
                            placeholder="Filter locations"
                            onChange={(e) => {
                                //escape any special characters in the query
                                const query = escapeRegEx(e.target.value).toLowerCase();
                                this.props.filterLocations(query);
                                return this.filterMarkers(query);
                            }}
                        />
                        <button
                            className="delete-input-value"
                            onClick={() => {
                                //erases text in the location filter input
                                const filterBtn = document.querySelector(".location-filter-btn");
                                filterBtn.value = "";
                                //reset filtered locations and markers
                                this.props.filterLocations("");
                                this.filterMarkers("");
                            }}
                        > x
                        </button>
                    </div>

                    {this.props.noResultFound ?
                        <p className="no-results"> No Results Found </p>
                        : null
                    }
                </Sidebar>
                
                <div className="map" ref="map" role="application">
                    loading map...
                </div>
            </div>
            );
    }
}



