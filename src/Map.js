import React, { Component } from 'react';
import { Marker, Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

//google maps Api key
//change this if you want to use a different api key
const googleApiKey = `AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM`;

export class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
            mapCenter: {
                lat: 40.7413549,
                lng: -73.9980244
            },
            windowOpen: false,
            activeMarker: null,
            place: 'location name',
            allMarkers: []
        };
    }


    render() {
        return (
            <Map
                google={this.props.google}
                initialCenter={this.props.initialCenter ? this.props.initialCenter : this.state.mapCenter}
                zoom={this.props.defaultZoom ? this.props.defaultZoom : 13}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    //pass apiKey and google maps url to the api call's parameters
    apiKey: googleApiKey,
    url: 'https://maps.googleapis.com/maps/api/js',
})(MapContainer);
