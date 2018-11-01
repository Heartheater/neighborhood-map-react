import React from 'react';

export default function FeatureLocation(props) {
    return (
        <section className="featured-location">
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

            <div className="featured-details" aria-label={`${props.featuredLocation.categories ? props.featuredLocation.categories[0].name : null}`}>
                <div className="featured-rating-price-wrapper">
                    <div aria-label={"restaurant rating"}>
                        {props.featuredLocation.rating}
                    </div>
                    <div aria-hidden={"true"}>
                        {props.getRating(props.featuredLocation)}
                    </div>
                    {props.featuredLocation.price ? 
                        <div className="featured-price" aria-label={"restaurant price"}>
                            {props.featuredLocation.price.currency}
                        </div>
                        : null
                    }

                    {props.featuredLocation.categories ? props.featuredLocation.categories[0].name : null}
                </div>
                {props.featuredLocation.url ?
                    <a target="_tab"
                        href={`${props.featuredLocation.url}`}
                        className="featured-link"
                        aria-label={"view website"}
                    > View Website
                    </a>
                    : null
                }

                <ul className="featured-contact-detail">
                    {props.featuredLocation.hours ?
                        <li>
                            <i className="fas fa-clock icon"></i>
                            {props.featuredLocation.hours.status}
                        </li>
                        : null
                    }

                    <li>
                        <i className="fas fa-location-arrow icon"></i>
                        {props.featuredLocation.location ? 
                            <div className="featured-address">
                                {props.featuredLocation.location.formattedAddress[0]}
                                <br />
                                {props.featuredLocation.location.formattedAddress[1]}
                            </div>
                            : null
                        }

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
                {props.featuredLocation.hours ?
                    <table className="featured-hours" aria-label={"Business Hours"}>
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
                    :null
                }

            </div>
        </section>
        );
}