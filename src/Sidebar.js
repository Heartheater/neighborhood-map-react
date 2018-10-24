import React, { Component } from 'react';
import fourSquareImage from './imgs/powered-by-foursquare.png';

export default class Sidebar extends Component {
    state = {
        featuredLocation: null,
    }

    featureListItem(place) {
        if (!place) {
            return this.setState({ featuredLocation: null });
        }
        return this.setState({ featuredLocation: place });
            
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

    getHours(place) {

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
                    onClick={() => {
                        this.props.locationClickHandler(place)
                        return this.featureListItem(place)
                    }}
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
                {this.state.featuredLocation ?
                    <div className="featured-location">
                        <button
                            className="featured-location-back-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({ featuredLocation: null });
                            }}
                        > <i className="fas fa-chevron-left" /> Back
                        </button>

                        <div className="featured-location-top">
                            <div className="featured-img-wrapper">
                                <img
                                    className="featured-img"
                                    src={this.props.findPhoto(this.state.featuredLocation)}
                                    alt={`${this.state.featuredLocation.name}`}
                                    />
                            </div>
                            <h2 className="featured-title">
                                {this.state.featuredLocation.name}
                            </h2>
                        </div>

                        <div className="featured-details">
                            <div className="featured-rating-price-wrapper">
                                {this.state.featuredLocation.rating}
                                {this.getRating(this.state.featuredLocation)}
                                <div className="featured-price">
                                    {this.state.featuredLocation.price.currency}
                                </div>
                                {this.state.featuredLocation.categories[0].name}

                            </div>
                            <a target="_tab"
                                href={`${this.state.featuredLocation.url}`}
                                className="featured-link"
                            > View Website
                            </a>

                            <ul className="featured-contact-detail">
                                <li>
                                    <i className="fas fa-clock icon"></i>
                                    {this.state.featuredLocation.hours.status}
                                </li>
                                <li>
                                    <i className="fas fa-location-arrow icon"></i>
                                    <div className="featured-address">
                                        {this.state.featuredLocation.location.formattedAddress[0]}
                                        <br />
                                        {this.state.featuredLocation.location.formattedAddress[1]}
                                    </div>
                                </li>
                                {this.state.featuredLocation.contact.formattedPhone ? 
                                    <li>
                                        <i className="fas fa-phone icon"></i>
                                        <div className="featured-phone">
                                            {this.state.featuredLocation.contact.formattedPhone}
                                        </div>
                                    </li>
                                    : null
                                 }

                            </ul>
                            <table className="featured-hours">
                                <caption>Hours</caption>
                                <tbody>
                                    {this.state.featuredLocation.hours.timeframes.map(businessHours => {
                                            return (
                                                <tr key={`hrs-${businessHours.days}`}>
                                                    <th>{businessHours.days}: </th>
                                                    <td>{businessHours.open[0].renderedTime} </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>

                        </div>
                    </div>
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
