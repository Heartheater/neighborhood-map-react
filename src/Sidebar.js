import React, { Component } from 'react';

export default class Sidebar extends Component {

    getListItems() {
        //listItems will hold all the location names
        let listItems = []; 
        //count is for making a unique key for each item
        let count = 1;

        //create a li for each location object
        this.props.locationsArray.map((location) => {
            listItems.push(
                <li
                    key={`location-list-item-${count}`}
                    className='location-list-item'
                    onClick={() => this.props.locationClickHandler(location)}
                >
                    <div className="location-info">
                        <h3 className="location-name">
                            {location.name}
                        </h3>
                        <div className="location-desc">
                            <div className="category">
                                category
                            </div>
                            {`address `}
                            {location.hours ?
                                <div className="hours">
                                    {location.hours.status}
                                </div>
                                : null}
                        </div>
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
                            this.getListItems()
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
