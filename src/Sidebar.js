import React, { Component } from 'react';

export default class Sidebar extends Component {

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
        return listItems;
    }

    render() {
        return (
            <div className="sidebar open">
                <div className="locations-list-wrapper" >
                    <div className="sidebar-top">
                        {this.props.children}
                    </div>
                    <ul className="locations-list">
                        {
                         (this.props.locationsArray[0]) ?
                                this.getListItems()
                                : <li className="no-results"> No Results Found </li>
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
