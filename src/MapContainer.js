import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MapContainer extends Component {
    state = {
        defaultMapCenter: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        windowOpen: false,
        activeMarker: null,
        allMarkers: [],

        locationArray: [
            { name: 'Haunted Hamburger', lat: 34.750263, lng: -112.11605 },
            { name: 'Jerome Artists Co-op', lat: 34.7496591, lng: -112.114419 },
            { name: 'The Mine Cafe', lat: 34.7511169, lng: -112.1158929 },
            { name: 'Mile High Grill & Inn', lat: 34.750431, lng: -112.1159191 },
            { name: 'Spirit Room', lat: 34.7512062, lng: -112.1162356 },
            { name: 'The Flatiron', lat: 34.749793, lng: -112.114615 },
            { name: 'Surgeon\'s House', lat: 34.749636, lng: -112.115789 }
        ],

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
        let { infoWindow } = this.state;
        const bounds = new google.maps.LatLngBounds();

        //create a new marker for each location
        this.state.locationArray.map(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: this.map,
                name: location.name,
                title: location.name
            });

            //show info window when marker is clicked
            marker.addListener('click', () => this.showInfo(marker, infoWindow));

            //add this marker to allMarkers array
            this.setState((prev) => ({
                allMarkers: [...prev.allMarkers, marker]
            }));

            return bounds.extend(marker.position);
        });
        //make sure all markers are visible on map
       return this.map.fitBounds(bounds);

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


    render() {
        return (
            <div className="map-container"> 

                <div className="map" ref="map" role="application">
                    loading map...
                </div>
            </div>
            );
    }
}



