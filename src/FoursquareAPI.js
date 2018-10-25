const foursquareUrl = 'https://api.foursquare.com/v2/venues/';

function getAuth() {
    //authorization keys for Four Square API
    const keys = {
        client_id: 'WCZJJB3ZJOZBTLBNU1WNNY3SZ2VDNCRZVMVYWINIHADUNC0A',
        client_secret: '14H2JOWZNV2KABSLU0KSNIDBMUJ5JHBQ104CDUI0SY3IUO3U',
        v: '20181004'
    };
    return `client_id=${keys.client_id}&client_secret=${keys.client_secret}&v=${keys.v}`;
}

function getUrlFromParams(parameters) {
    if (!parameters) return '';

    //create a url string to hold the given parameters
    return Object.keys(parameters)
        .map(key => (
            //each key is the name of the parameter 
            //and parameters[key] is the data belonging to it
            `${key}=${parameters[key]}`
        ))
        .join('&'); //join each parameter with '&'
}

function fetchFoursquareData(endPoint, method, parameters) {
    let request = {
        method,
        headers: {
            Accept: 'application/json'
        }
    };
    return fetch(
        `${foursquareUrl + endPoint}?${getAuth()}&${getUrlFromParams(parameters)}`,
        request
    ).then(response => response.json())
        .catch(err => console.error(`Error fetching Foursquare Data: ${err}`));
}


export default class FoursquareAPI {
    //search returns venue ids
    static search(parameters) {
        return fetchFoursquareData('search', 'GET', parameters);
    }

    static getLocationDetails(VENUE_ID) {
        return fetchFoursquareData(VENUE_ID, 'GET');
    }

    static getRestaurantIds(lat, lng) {
        let locationIds = [];

        this.search({
            intent: 'browse',
            //ll is latitude and longitude of the area to search near
            ll: `${lat}, ${lng}`,
            //category id for food / restaurant venues
            categoryId: '4d4b7105d754a06374d81259',
            limit: 30, //limit results
            radius: 300 //search radius in meters
        }).then(res => res.response.venues.map(venue => locationIds.push(venue.id))
        ).catch(err => console.error(err));
        console.log(locationIds);
        return locationIds;
    }
}
