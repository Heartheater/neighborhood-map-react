import React, { Component } from 'react';
import fourSquareImage from './imgs/powered-by-foursquare.png';
import FeatureLocation from './FeatureLocation';

export default class Sidebar extends Component {

    getFeatured() {
        let place = null;
        if (this.props.featuredLocation) {
            place = this.props.featuredLocation;
        }
        return place;
    }

    getRating(place) {
        if (!place.rating) return;
        let stars = [];
        for (let count = 0; count < Math.round(place.rating / 2); ++count) {
            stars.push(<i className="fas fa-star" key={`star-rating-${count}`}></i>);
        }
        if (stars.length < 5) {
            for (let count = 0; stars.length < 5; ++count) {
                stars.push(<i className="far fa-star" key={`empty-star-${count}`}></i>);
            }
        }
        return <div className="star-rating">{stars}</div>;
    }

    getListItems() {
        //listItems will hold all the location names
        let listItems = []; 
        //count is for making a unique key for each list item
        let count = 1;

        //create a li for each location object
        this.props.locationsArray.map((place) => {
            if (!place || !place.name) return;
            listItems.push(
                <li
                    key={`location-list-item-${count}`}
                    className='location-list-item'
                    onClick={() => this.props.locationClickHandler(place)}
                >
                    <div className="location-info">
                        <h3 className="location-name">
                            {place.name}
                        </h3>
                        <hr/>
                        <div className="location-desc">
                            <div className="location-category">
                                {`${place.categories ? place.categories[0].name : ''}`}
                            </div>
                            {place.location ?
                                <div className="location-address">
                                    {`${place.location.formattedAddress[0]},`}
                                    <br />
                                    {`${place.location.formattedAddress[1]},`}
                                </div>
                                : ''
                            }
                            {place.hours ?
                                <div className="location-hours">
                                    {place.hours.status}
                                </div>
                                : null}
                        </div>
                    </div>
                    <div className="location-img-wrapper">
                        <img
                            className="location-img"
                            src={`${this.props.findPhoto(place)}`}
                            alt={`${place.name}`}
                        />
                    </div>
                </li>
            );
            count++;
            return listItems;
        });
        //add foursquare logo to end of list
        listItems.push(
            <li className="fs-logo-wrapper" key="location-list-logo">
                <a href="https://foursquare.com/" target="_new_tab">
                    <img className="foursquare-logo" alt="powered by foursquare" src={fourSquareImage} />
                </a>
            </li>
        );
        return listItems;
    }

    render() {
        return (
            <div className="sidebar open">
                {/*Check if a location should be featured instead of showing the list items*/}
                {this.getFeatured() ?
                    <FeatureLocation
                        featuredLocation={this.getFeatured()}
                        findPhoto={this.props.findPhoto}
                        getRating={this.getRating}
                    >
                        <button
                            className="featured-location-back-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.backToListView();
                            }}
                        >
                            <i className="fas fa-chevron-left" /> Back
                        </button>
                    </FeatureLocation>
                    :
                    <div className="locations-list-wrapper" >
                        <div className="sidebar-top">
                            {this.props.children}
                        </div>
                        <ul className="locations-list">
                            {this.props.locationsArray[0] ?
                                this.getListItems()
                                :
                                <li className="no-results">
                                    No Results Found
                                </li>
                            }
                        </ul>
                    </div>
                    }
            </div>
        );
    }
}
