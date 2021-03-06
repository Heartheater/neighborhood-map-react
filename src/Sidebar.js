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
            if (!place || !place.name) return null;

            listItems.push(
                <li
                    key={`location-list-item-${count}`}
                    className='location-list-item'
                    onClick={() => this.props.locationClickHandler(place)}
                    aria-label={`${place.name}`}
                    role="button"
                    onKeyPress={(e) => {
                        e.preventDefault();
                        if (e.key === 'Enter') {
                            this.props.locationClickHandler(place)
                        }
                    }}
                    tabIndex="0"
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
            <li className="fs-logo-wrapper" key="location-list-logo" >
                <a aria-label={"four square"} href="https://foursquare.com/" target="_new_tab">
                    <img className="foursquare-logo" alt="powered by foursquare" src={fourSquareImage} />
                </a>
            </li>
        );
        return listItems;
    }


    showError() {
        if (!this.props.fourSquareError) return null;

        //return error message if there was an error
        return (
            <li className="no-results" aria-label="error loading data">
                Error loading data from Foursquare
            </li>
        );
    }

    render() {
        return (
            <section className="sidebar open">
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
                        <section className="sidebar-top" >
                            {this.props.children}
                        </section>
                        <ul className="locations-list">
                            {this.props.locationsArray[0] ?
                                this.getListItems()
                                :
                                this.props.fourSquareError ?
                                    this.showError()
                                    :
                                    <li className="no-results" aria-label="no results found">
                                        No Results Found
                                    </li>
                            }

                        </ul>
                    </div>
                    }
            </section>
        );
    }
}
