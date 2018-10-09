import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const markerLocationsArray = [
    { name: 'Haunted Hamburger', lat: 34.750263, lng: -112.11605 },
    { name: 'Ghost City Inn', lat: 34.7489484, lng: -112.1145002 },
    { name: 'Ghost Town Tours', lat: 34.7506988, lng: -112.116719 },
    { name: 'Jerome Artists Co-op', lat: 34.7496591, lng: -112.114419 },
    { name: 'Jerome Sliding Jail', lat: 34.7508657, lng: -112.1146598 },
    { name: 'The Mine Cafe', lat: 34.7511169, lng: -112.1158929 },
    { name: 'Mile High Grill & Inn', lat: 34.750431, lng: -112.1159191 },
    { name: 'The Miners Pick Rock Shop', lat: 34.7493362, lng: -112.1155664 },
    { name: 'Firefly Gallery Jerome', lat: 34.7508784, lng: -112.1158882 },
    { name: 'Spirit Room', lat: 34.7512062, lng: -112.1162356 },
    { name: 'The Flatiron', lat: 34.749793, lng: -112.114615 },
    { name: 'Surgeon\'s House', lat: 34.749636, lng: -112.115789 }
];

export default class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
            defaultMapCenter: {
                lat: 40.7413549,
                lng: -73.9980244
            },
            windowOpen: false,
            activeMarker: null,
            allMarkers: []
        };
    }

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        //check if google is available
        if (this.props && this.props.google) {
            const { google } = this.props;

            const mapContainer = this.refs.map;

            //create map
            const center = new google.maps.LatLng(this.props.initialCenter.lat, this.props.initialCenter.lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: this.props.defaultZoom,
            })
            this.map = new google.maps.Map(mapContainer, mapConfig);
        }
    }

    addMarkers = () => {


        return;
    }

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



