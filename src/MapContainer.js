import React, { Component } from 'react';
import escapeRegEx from 'escape-string-regexp';
import Sidebar from './Sidebar';
import { GoogleApiWrapper } from 'google-maps-react';

//google maps Api key
const googleApiKey = `AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM`;
let mapLoading = true;

class MapContainer extends Component {
    state = {
        defaultMapCenter: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        windowOpen: false,
        activeMarker: null,
        allMarkers: [],
        infoWindow: new this.props.google.maps.InfoWindow(),
        featuredLocation: false,
    }

    async componentDidMount() {
        mapLoading = false;

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
        if (!this.props.locationsArray[0] || !this.props.locationsArray[0].location) return;
        const { google } = this.props;

        //create a new marker for each location
        return this.props.locationsArray.map(place => {
            const marker = new google.maps.Marker({
                position: { lat: place.location.lat, lng: place.location.lng },
                map: this.map,
                name: place.name,
                title: place.name
            });

            //show info window when marker is clicked
            marker.addListener('click', () => this.showInfo(marker, place, this.state.infoWindow));
            
            //add this marker to allMarkers array
            return this.setState((prev) => ({
                allMarkers: [...prev.allMarkers, marker]
            }));
        });

    }//addMarkers end

    findLocationPhoto(place) {
        //size of the image
        let dimensions = '540x600';
        let defaultPhoto = '#',
            photo = defaultPhoto;

        //if there are no photos, return defaultPhoto
        if (!place.photos || place.photos.count === 0) {
            return photo;
        }
        //return best photo if it exists 
        if (place.bestPhoto) {
            photo = (place.bestPhoto.prefix + dimensions + place.bestPhoto.suffix);
        }
        else if (place.photos.groups) {
            //map through all the photo groups and find a photo
            place.photos.groups.map(photoGroup => {
                if (photoGroup.count > 0) {
                   photo = (photoGroup.items[0].prefix + dimensions + photoGroup.suffix);
                }
                return photo;
            });//map end
        }
        return photo;
    }//findLocationPhoto end

    showInfo = (marker, locationObj, infoWindow) => {
        //return if infowindow is already open on this marker
        if (infoWindow.marker === marker) return;
        infoWindow.marker = marker;

        let windowContent = (`
            <div class="info-window">
                <h2 class="info-window-title">
                    ${locationObj.name}
                </h2> 
                <div class="info-window-img-wrapper">
                    <img class="info-window-img" src="${this.findLocationPhoto(locationObj)}" alt="${locationObj.name}" /> 
                </div>
                <div class="info-window-details">
                    <div class="info-window-category">${ locationObj.categories ? locationObj.categories[0].name : ''}</div>
                    ${locationObj.location.formattedAddress[0]}
                    <br>${locationObj.location.formattedAddress[1]}
                </div>
            </div>
        `);

        infoWindow.setContent(windowContent);
        infoWindow.open(this.map, marker);


        //bring up details of the clicked location in the sidebar
        this.setState({ featuredLocation: locationObj });

        //erase content when window closes
        infoWindow.addListener('closeclick', () => {
            this.setState({ featuredLocation: null });
            return infoWindow.marker = null;
        });


    }; //showInfo end

    animateMarker(marker) {
        const { google } = this.props;
        //return if marker still has an animation 
        if (marker.getAnimation()) return;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 750);
    }

    locationClickHandler = (location) => {
        //map through all the markers to find the matching location name
        this.state.allMarkers.map(marker => {
            if (location.name.toLowerCase() === marker.name.toLowerCase()) {
                //show info window for the clicked location
                this.showInfo(marker, location, this.state.infoWindow);
                this.animateMarker(marker);
            }
            return marker;
        });
        //displays more info in the sidebar for the clicked location
        return this.setState({ featuredLocation: location });
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
                    findPhoto={this.findLocationPhoto}
                    featuredLocation={this.state.featuredLocation}
                    backToListView={() => this.setState({ featuredLocation: null })}
                    fourSquareError={this.props.fourSquareError}
                >

                    <div className="location-filter-wrapper">
                        <input
                            className="location-filter-btn"
                            type="text"
                            aria-label={"filter locations"}
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
                            aria-label="erase input value"
                            onClick={() => {
                                //erases text in the location filter input
                                const filterBtn = document.querySelector(".location-filter-btn");
                                if (!filterBtn.value) return;
                                filterBtn.value = "";
                                //reset filtered locations and markers
                                this.props.filterLocations("");
                                console.log(this.props.locationsArray);
                                this.filterMarkers("");
                            }}
                        > x
                        </button>
                    </div>
                </Sidebar>

                <div className="map" ref="map" role="application" aria-hidden="true">
                    Loading Map...
                </div>
            </div>
            );
    }
}

const LoadingContainer = (props) => (<div className="loading-text loading-map"> Loading Map... </div>);

export default GoogleApiWrapper({
    //pass apiKey and google maps url to the api call's parameters
    apiKey: googleApiKey,
    url: 'https://maps.googleapis.com/maps/api/js',
    LoadingContainer: LoadingContainer,
})(MapContainer);


//wait 10 seconds to check if the map still hasn't loaded
setTimeout(() => {
    //if the map is still loading
    if (mapLoading) {
        const loadingContainer = document.querySelector('.loading-map');
        if (!loadingContainer) return;
        //show error message
        return loadingContainer.innerHTML = ('There was an error loading the map');
    } //or if map already loaded return null
    else {
        return null;
    }
}, 10000);
