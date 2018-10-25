import React from 'react';

export default function FeatureLocation(props) {
    return (
        <div className="featured-location">
            {props.children}
            <div className="featured-location-top">
                <div className="featured-img-wrapper">
                    <img
                        className="featured-img"
                        src={props.findPhoto(props.featuredLocation)}
                        alt={`${props.featuredLocation.name}`}
                    />
                </div>
                <h2 className="featured-title">
                    {props.featuredLocation.name}
                </h2>
            </div>

            <div className="featured-details">
                <div className="featured-rating-price-wrapper">
                    {props.featuredLocation.rating}
                    {props.getRating(props.featuredLocation)}
                    <div className="featured-price">
                        {props.featuredLocation.price.currency}
                    </div>
                    {props.featuredLocation.categories[0].name}

                </div>
                {props.featuredLocation.url ?
                    <a target="_tab"
                        href={`${props.featuredLocation.url}`}
                        className="featured-link"
                    > View Website
                            </a>
                    : null
                }

                <ul className="featured-contact-detail">
                    <li>
                        <i className="fas fa-clock icon"></i>
                        {props.featuredLocation.hours.status}
                    </li>
                    <li>
                        <i className="fas fa-location-arrow icon"></i>
                        <div className="featured-address">
                            {props.featuredLocation.location.formattedAddress[0]}
                            <br />
                            {props.featuredLocation.location.formattedAddress[1]}
                        </div>
                    </li>
                    {props.featuredLocation.contact.formattedPhone ?
                        <li>
                            <i className="fas fa-phone icon"></i>
                            <div className="featured-phone">
                                {props.featuredLocation.contact.formattedPhone}
                            </div>
                        </li>
                        : null
                    }

                </ul>
                <table className="featured-hours">
                    <caption>Hours</caption>
                    <tbody>
                        {props.featuredLocation.hours.timeframes.map(businessHours => {
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
        );
}