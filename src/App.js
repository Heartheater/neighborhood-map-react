import React, { Component } from 'react';
import './App.css';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';
import ErrorHandler from './ErrorHandler';
import FoursquareAPI from './FoursquareAPI';

//google maps Api key
//change this if you want to use a different api key
const googleApiKey = `AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM`;

class App extends Component {
    state = {
        mapCenter: {
            lat: 33.448376,
            lng: -112.074036
        },
        allLocations: [],
        searchResults: [],
        loading: true,
    }
    
    async componentDidMount() {
        //let locationIds = FoursquareAPI.getRestaurantIds(this.state.mapCenter.lat, this.state.mapCenter.lng);
        let locationIds = [
            /*
            "4d4464d4bf61a1cd2b5408ac",
            "4f999981e5e82ef193a1ce45",
            "4df7c1342271d8baf9c4de8d",
            "4ed67e1a61afeefb7cdc16ef",
            "5230bf8811d2a4689e05fc19",
            "55107942498ed654c625de3f",
            "530e49af498eb68729749d86",
            "5244874911d23515396871b5",
            */
        ];
        let locationData = [{
            "id": "4d4464d4bf61a1cd2b5408ac",
            "name": "The Arrogant Butcher",
            "contact": {
                "phone": "6023248502",
                "formattedPhone": "(602) 324-8502",
                "twitter": "arrogantbutcher",
                "facebook": "117077779831",
                "facebookUsername": "FoxRestaurantConcepts",
                "facebookName": "Fox Restaurant Concepts"
            },
            "location": {
                "address": "2 E Jefferson St #150",
                "crossStreet": "at S 1st St",
                "lat": 33.447354225134795,
                "lng": -112.07263224789942,
                "labeledLatLngs": [
                    {
                        "label": "display",
                        "lat": 33.447354225134795,
                        "lng": -112.07263224789942
                    }
                ],
                "postalCode": "85004",
                "cc": "US",
                "city": "Phoenix",
                "state": "AZ",
                "country": "United States",
                "formattedAddress": [
                    "2 E Jefferson St #150 (at S 1st St)",
                    "Phoenix, AZ 85004",
                    "United States"
                ]
            },
            "canonicalUrl": "https://foursquare.com/v/the-arrogant-butcher/4d4464d4bf61a1cd2b5408ac",
            "categories": [
                {
                    "id": "4bf58dd8d48988d14e941735",
                    "name": "American Restaurant",
                    "pluralName": "American Restaurants",
                    "shortName": "American",
                    "icon": {
                        "prefix": "https://ss3.4sqi.net/img/categories_v2/food/default_",
                        "suffix": ".png"
                    },
                    "primary": true
                },
                {
                    "id": "4bf58dd8d48988d116941735",
                    "name": "Bar",
                    "pluralName": "Bars",
                    "shortName": "Bar",
                    "icon": {
                        "prefix": "https://ss3.4sqi.net/img/categories_v2/nightlife/pub_",
                        "suffix": ".png"
                    }
                },
                {
                    "id": "4bf58dd8d48988d155941735",
                    "name": "Gastropub",
                    "pluralName": "Gastropubs",
                    "shortName": "Gastropub",
                    "icon": {
                        "prefix": "https://ss3.4sqi.net/img/categories_v2/food/gastropub_",
                        "suffix": ".png"
                    }
                }
            ],
            "verified": true,
            "stats": {
                "tipCount": 143
            },
            "url": "http://www.foxrc.com/the_arrogant_butcher.html",
            "price": {
                "tier": 2,
                "message": "Moderate",
                "currency": "$"
            },
            "likes": {
                "count": 319,
                "groups": [
                    {
                        "type": "others",
                        "count": 319,
                        "items": []
                    }
                ],
                "summary": "319 Likes"
            },
            "dislike": false,
            "ok": false,
            "rating": 8.7,
            "ratingColor": "73CF42",
            "ratingSignals": 490,
            "menu": {
                "type": "Menu",
                "label": "Menu",
                "anchor": "View Menu",
                "url": "http://foxrc.com/restaurants/the-arrogant-butcher/",
                "mobileUrl": "http://foxrc.com/restaurants/the-arrogant-butcher/",
                "externalUrl": "http://foxrc.com/restaurants/the-arrogant-butcher/"
            },
            "allowMenuUrlEdit": true,
            "beenHere": {
                "count": 0,
                "unconfirmedCount": 0,
                "marked": false,
                "lastCheckinExpiredAt": 0
            },
            "specials": {
                "count": 0,
                "items": []
            },
            "photos": {
                "count": 399,
                "groups": [
                    {
                        "type": "checkin",
                        "name": "Friends' check-in photos",
                        "count": 0,
                        "items": []
                    },
                    {
                        "type": "venue",
                        "name": "Venue photos",
                        "count": 399,
                        "items": [
                            {
                                "id": "50e7a8dae4b0be2720a1cdb0",
                                "createdAt": 1357359322,
                                "source": {
                                    "name": "Instagram",
                                    "url": "http://instagram.com"
                                },
                                "prefix": "https://igx.4sqi.net/img/general/",
                                "suffix": "/4413912_3bgTj_BPr9Q7wNmIMWtQXuYUOrTSLEVCq68UPwzRoeg.jpg",
                                "width": 612,
                                "height": 612,
                                "user": {
                                    "id": "4413912",
                                    "firstName": "Keith",
                                    "lastName": "Moore",
                                    "gender": "male",
                                    "photo": {
                                        "prefix": "https://igx.4sqi.net/img/user/",
                                        "suffix": "/DKFHFEAIOYSA5K4Y.jpg"
                                    }
                                },
                                "visibility": "public"
                            }
                        ]
                    }
                ],
                "summary": "0 photos"
            },
            "venuePage": {
                "id": "73458070"
            },
            "reasons": {
                "count": 1,
                "items": [
                    {
                        "summary": "Lots of people like this place",
                        "type": "general",
                        "reasonName": "rawLikesReason"
                    }
                ]
            },
            "page": {
                "user": {
                    "id": "73458070",
                    "firstName": "The Arrogant Butcher",
                    "gender": "none",
                    "photo": {
                        "prefix": "https://igx.4sqi.net/img/user/",
                        "suffix": "/73458070-MC10KQKZCJ3MGDIE.png"
                    },
                    "type": "venuePage",
                    "venue": {
                        "id": "4d4464d4bf61a1cd2b5408ac"
                    },
                    "tips": {
                        "count": 0
                    },
                    "lists": {
                        "groups": [
                            {
                                "type": "created",
                                "count": 2,
                                "items": []
                            }
                        ]
                    },
                    "homeCity": "Phoenix, AZ",
                    "bio": "",
                    "contact": {}
                }
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "createdAt": 1296327892,
            "tips": {
                "count": 143,
                "groups": [
                    {
                        "type": "others",
                        "name": "All tips",
                        "count": 143,
                        "items": [
                            {
                                "id": "4d7a4de42dff88bf87bcd705",
                                "createdAt": 1299860964,
                                "text": "from the looks of the menu, it's aiming for the dining public's sweet spot: contemporary American cuisine with comforting flourishes and reasonable prices.",
                                "type": "user",
                                "url": "http://blogs.phoenixnewtimes.com/bella/2011/02/now_open_at_cityscape_the_arrogan.php",
                                "canonicalUrl": "https://foursquare.com/item/4d7a4de42dff88bf87bcd705",
                                "likes": {
                                    "count": 15,
                                    "groups": [
                                        {
                                            "type": "others",
                                            "count": 15,
                                            "items": []
                                        }
                                    ],
                                    "summary": "15 likes"
                                },
                                "logView": true,
                                "agreeCount": 16,
                                "disagreeCount": 0,
                                "todo": {
                                    "count": 21
                                },
                                "user": {
                                    "id": "4339715",
                                    "firstName": "Phoenix New Times",
                                    "gender": "none",
                                    "photo": {
                                        "prefix": "https://igx.4sqi.net/img/user/",
                                        "suffix": "/2BZ12U510HWDLMRS.jpg"
                                    },
                                    "type": "page"
                                }
                            }
                        ]
                    }
                ]
            },
            "shortUrl": "http://4sq.com/gSgtYx",
            "timeZone": "America/Phoenix",
            "listed": {
                "count": 159,
                "groups": [
                    {
                        "type": "others",
                        "name": "Lists from other people",
                        "count": 159,
                        "items": [
                            {
                                "id": "52a6509011d2fa4e532492fe",
                                "name": "Phoenix's Best American - 2013",
                                "description": "A guide to the places people love most, based on over 4.5 billion check-ins.",
                                "type": "others",
                                "user": {
                                    "id": "46452980",
                                    "firstName": "Best of Foursquare",
                                    "gender": "none",
                                    "photo": {
                                        "prefix": "https://igx.4sqi.net/img/user/",
                                        "suffix": "/46452980-CVQT5PGTUAFP2HBA.png"
                                    },
                                    "type": "page"
                                },
                                "editable": false,
                                "public": true,
                                "collaborative": false,
                                "url": "/bestof4sq/list/phoenixs-best-american--2013",
                                "canonicalUrl": "https://foursquare.com/bestof4sq/list/phoenixs-best-american--2013",
                                "createdAt": 1386631312,
                                "updatedAt": 1386631315,
                                "photo": {
                                    "id": "4f4e7875121d4e5024802823",
                                    "createdAt": 1330542709,
                                    "prefix": "https://igx.4sqi.net/img/general/",
                                    "suffix": "/g-lry9KtQZAqxKlOyix8wDQVcX_ekFjCfw5i22777U0.jpg",
                                    "width": 120,
                                    "height": 120,
                                    "user": {
                                        "id": "9520900",
                                        "firstName": "BestOf",
                                        "gender": "none",
                                        "photo": {
                                            "prefix": "https://igx.4sqi.net/img/user/",
                                            "suffix": "/YVPCAXA5BNK13X2O.png"
                                        },
                                        "type": "page"
                                    },
                                    "visibility": "public"
                                },
                                "logView": true,
                                "followers": {
                                    "count": 16
                                },
                                "listItems": {
                                    "count": 10,
                                    "items": [
                                        {
                                            "id": "v4d4464d4bf61a1cd2b5408ac",
                                            "createdAt": 1386631313,
                                            "photo": {
                                                "id": "4f88b017e4b076717a232b37",
                                                "createdAt": 1334358039,
                                                "prefix": "https://igx.4sqi.net/img/general/",
                                                "suffix": "/TXVuZdW7NuSN3fcPRqnWI5uVe4PT5d_uceVzIjHWWrE.jpg",
                                                "width": 540,
                                                "height": 720,
                                                "user": {
                                                    "id": "23781631",
                                                    "firstName": "Ronnie",
                                                    "lastName": "Griffin",
                                                    "gender": "male",
                                                    "photo": {
                                                        "prefix": "https://igx.4sqi.net/img/user/",
                                                        "suffix": "/UDNHI1XIUFCVAFJ0.jpg"
                                                    }
                                                },
                                                "visibility": "public"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "5100df2be4b02b0c9f7eadf0",
                                "name": "Phoenix new times",
                                "description": "https://foursquare.com/phoenixnewtimes",
                                "entities": [
                                    {
                                        "indices": [
                                            0,
                                            38
                                        ],
                                        "type": "url",
                                        "object": {
                                            "url": "https://foursquare.com/phoenixnewtimes"
                                        }
                                    }
                                ],
                                "type": "others",
                                "user": {
                                    "id": "14742382",
                                    "firstName": "Renati",
                                    "gender": "female",
                                    "photo": {
                                        "prefix": "https://igx.4sqi.net/img/user/",
                                        "suffix": "/OTRSSQEESZM201P0.png"
                                    }
                                },
                                "editable": false,
                                "public": true,
                                "collaborative": false,
                                "url": "/user/14742382/list/phoenix-new-times",
                                "canonicalUrl": "https://foursquare.com/user/14742382/list/phoenix-new-times",
                                "createdAt": 1359011627,
                                "updatedAt": 1359014192,
                                "followers": {
                                    "count": 30
                                },
                                "listItems": {
                                    "count": 43,
                                    "items": [
                                        {
                                            "id": "v4d4464d4bf61a1cd2b5408ac",
                                            "createdAt": 1359014020
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "4fd675f8e4b06383cd8b7b14",
                                "name": "Downtown Playground",
                                "description": "Take it from a native, these are the best places to have a great time with great people!",
                                "type": "others",
                                "user": {
                                    "id": "7851602",
                                    "firstName": "Leslie",
                                    "lastName": "Easley",
                                    "gender": "female",
                                    "photo": {
                                        "prefix": "https://igx.4sqi.net/img/user/",
                                        "suffix": "/L5IRAP3R0EYHV50W.jpg"
                                    }
                                },
                                "editable": false,
                                "public": true,
                                "collaborative": false,
                                "url": "/user/7851602/list/downtown-playground",
                                "canonicalUrl": "https://foursquare.com/user/7851602/list/downtown-playground",
                                "createdAt": 1339454968,
                                "updatedAt": 1382721819,
                                "photo": {
                                    "id": "50e1f50ae4b0a94f68c22964",
                                    "createdAt": 1356985610,
                                    "prefix": "https://igx.4sqi.net/img/general/",
                                    "suffix": "/3709657_hzaQb3k6sS5DyYAPArBY1N4ixR8WJ0TNkc62TRXy6lA.jpg",
                                    "width": 960,
                                    "height": 720,
                                    "user": {
                                        "id": "3709657",
                                        "firstName": "Nelson",
                                        "lastName": "Guerrero",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://igx.4sqi.net/img/user/",
                                            "suffix": "/DXMHYZJNMF0E3F23.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                "followers": {
                                    "count": 62
                                },
                                "listItems": {
                                    "count": 111,
                                    "items": [
                                        {
                                            "id": "t4fd81230e4b09bbdac9aa082",
                                            "createdAt": 1339456039
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "4ed7e01d7ee53b38104aea64",
                                "name": "FOX Restaurant Concepts",
                                "description": "\"Dining isn't just abou the meal - it's about the overall experience\" -Sam Fox. Fox Restaurant Concepts is a collection of original, thriving boutique restaurants including 12 unique concepts.",
                                "type": "others",
                                "user": {
                                    "id": "558890",
                                    "firstName": "Raymond",
                                    "lastName": "Embry",
                                    "gender": "male",
                                    "photo": {
                                        "prefix": "https://igx.4sqi.net/img/user/",
                                        "suffix": "/W4VCJF104PZKFNAD.jpg"
                                    }
                                },
                                "editable": false,
                                "public": true,
                                "collaborative": false,
                                "url": "/rembry/list/fox-restaurant-concepts",
                                "canonicalUrl": "https://foursquare.com/rembry/list/fox-restaurant-concepts",
                                "createdAt": 1322770461,
                                "updatedAt": 1329331445,
                                "photo": {
                                    "id": "4eb842bed3e3644ca768e82a",
                                    "createdAt": 1320698558,
                                    "prefix": "https://igx.4sqi.net/img/general/",
                                    "suffix": "/NZNZLOK4H0XLEGPEM35ZBA1TIA1ZZWAYSAK5HGCGU1XMK2MY.jpg",
                                    "width": 537,
                                    "height": 720,
                                    "user": {
                                        "id": "558890",
                                        "firstName": "Raymond",
                                        "lastName": "Embry",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://igx.4sqi.net/img/user/",
                                            "suffix": "/W4VCJF104PZKFNAD.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                "followers": {
                                    "count": 91
                                },
                                "listItems": {
                                    "count": 33,
                                    "items": [
                                        {
                                            "id": "v4d4464d4bf61a1cd2b5408ac",
                                            "createdAt": 1322774090
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "hours": {
                "status": "Open until 9:00 PM",
                "richStatus": {
                    "entities": [],
                    "text": "Open until 9:00 PM"
                },
                "isOpen": true,
                "isLocalHoliday": false,
                "dayData": [],
                "timeframes": [
                    {
                        "days": "Mon–Thu",
                        "includesToday": true,
                        "open": [
                            {
                                "renderedTime": "11:00 AM–9:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Fri",
                        "open": [
                            {
                                "renderedTime": "11:00 AM–10:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Sat",
                        "open": [
                            {
                                "renderedTime": "Noon–10:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Sun",
                        "open": [
                            {
                                "renderedTime": "3:00 PM–9:00 PM"
                            }
                        ],
                        "segments": []
                    }
                ]
            },
            "popular": {
                "status": "Likely open",
                "richStatus": {
                    "entities": [],
                    "text": "Likely open"
                },
                "isOpen": true,
                "isLocalHoliday": false,
                "timeframes": [
                    {
                        "days": "Today",
                        "includesToday": true,
                        "open": [
                            {
                                "renderedTime": "11:00 AM–2:00 PM"
                            },
                            {
                                "renderedTime": "4:00 PM–9:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Thu",
                        "open": [
                            {
                                "renderedTime": "11:00 AM–2:00 PM"
                            },
                            {
                                "renderedTime": "4:00 PM–9:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Fri",
                        "open": [
                            {
                                "renderedTime": "11:00 AM–11:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Sat",
                        "open": [
                            {
                                "renderedTime": "Noon–10:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Sun",
                        "open": [
                            {
                                "renderedTime": "None"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Mon",
                        "open": [
                            {
                                "renderedTime": "Noon–2:00 PM"
                            },
                            {
                                "renderedTime": "4:00 PM–9:00 PM"
                            }
                        ],
                        "segments": []
                    },
                    {
                        "days": "Tue",
                        "open": [
                            {
                                "renderedTime": "11:00 AM–1:00 PM"
                            },
                            {
                                "renderedTime": "5:00 PM–9:00 PM"
                            }
                        ],
                        "segments": []
                    }
                ]
            },
            "pageUpdates": {
                "count": 0,
                "items": []
            },
            "inbox": {
                "count": 0,
                "items": []
            },
            "parent": {
                "id": "4bb680d62ea19521b7cbab2f",
                "name": "CityScape Phoenix",
                "location": {
                    "address": "1 E Washington St",
                    "crossStreet": "at Central Ave",
                    "lat": 33.44791864315961,
                    "lng": -112.07367990882075,
                    "labeledLatLngs": [
                        {
                            "label": "display",
                            "lat": 33.44791864315961,
                            "lng": -112.07367990882075
                        }
                    ],
                    "postalCode": "85004",
                    "cc": "US",
                    "city": "Phoenix",
                    "state": "AZ",
                    "country": "United States",
                    "formattedAddress": [
                        "1 E Washington St (at Central Ave)",
                        "Phoenix, AZ 85004",
                        "United States"
                    ]
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1fd941735",
                        "name": "Shopping Mall",
                        "pluralName": "Shopping Malls",
                        "shortName": "Mall",
                        "icon": {
                            "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
                            "suffix": ".png"
                        },
                        "primary": true
                    }
                ]
            },
            "hierarchy": [
                {
                    "name": "CityScape Phoenix",
                    "lang": "en",
                    "id": "4bb680d62ea19521b7cbab2f",
                    "canonicalUrl": "https://foursquare.com/v/cityscape-phoenix/4bb680d62ea19521b7cbab2f"
                }
            ],
            "attributes": {
                "groups": [
                    {
                        "type": "price",
                        "name": "Price",
                        "summary": "$$",
                        "count": 1,
                        "items": [
                            {
                                "displayName": "Price",
                                "displayValue": "$$",
                                "priceTier": 2
                            }
                        ]
                    },
                    {
                        "type": "payments",
                        "name": "Credit Cards",
                        "summary": "Credit Cards",
                        "count": 7,
                        "items": [
                            {
                                "displayName": "Credit Cards",
                                "displayValue": "Yes (incl. Discover & Visa)"
                            }
                        ]
                    },
                    {
                        "type": "outdoorSeating",
                        "name": "Outdoor Seating",
                        "summary": "Outdoor Seating",
                        "count": 1,
                        "items": [
                            {
                                "displayName": "Outdoor Seating",
                                "displayValue": "Yes"
                            }
                        ]
                    },
                    {
                        "type": "wifi",
                        "name": "Wi-Fi",
                        "summary": "Wi-Fi",
                        "count": 1,
                        "items": [
                            {
                                "displayName": "Wi-Fi",
                                "displayValue": "Yes"
                            }
                        ]
                    },
                    {
                        "type": "serves",
                        "name": "Menus",
                        "summary": "Happy Hour, Dinner & more",
                        "count": 8,
                        "items": [
                            {
                                "displayName": "Lunch",
                                "displayValue": "Lunch"
                            },
                            {
                                "displayName": "Dinner",
                                "displayValue": "Dinner"
                            },
                            {
                                "displayName": "Happy Hour",
                                "displayValue": "Happy Hour"
                            }
                        ]
                    },
                    {
                        "type": "drinks",
                        "name": "Drinks",
                        "summary": "Beer, Wine, Full Bar & Cocktails",
                        "count": 5,
                        "items": [
                            {
                                "displayName": "Beer",
                                "displayValue": "Beer"
                            },
                            {
                                "displayName": "Wine",
                                "displayValue": "Wine"
                            },
                            {
                                "displayName": "Full Bar",
                                "displayValue": "Full Bar"
                            },
                            {
                                "displayName": "Cocktails",
                                "displayValue": "Cocktails"
                            }
                        ]
                    },
                    {
                        "type": "diningOptions",
                        "name": "Dining Options",
                        "count": 5,
                        "items": [
                            {
                                "displayName": "Delivery",
                                "displayValue": "No Delivery"
                            }
                        ]
                    }
                ]
            },
            "bestPhoto": {
                "id": "50e7a8dae4b0be2720a1cdb0",
                "createdAt": 1357359322,
                "source": {
                    "name": "Instagram",
                    "url": "http://instagram.com"
                },
                "prefix": "https://igx.4sqi.net/img/general/",
                "suffix": "/4413912_3bgTj_BPr9Q7wNmIMWtQXuYUOrTSLEVCq68UPwzRoeg.jpg",
                "width": 612,
                "height": 612,
                "visibility": "public"
            },
            "colors": {
                "highlightColor": {
                    "photoId": "50e7a8dae4b0be2720a1cdb0",
                    "value": -9938896
                },
                "highlightTextColor": {
                    "photoId": "50e7a8dae4b0be2720a1cdb0",
                    "value": -1
                },
                "algoVersion": 3
            }
        }];
        //loop through locationIds array and use each id to fetch location data
        for (let count = 0; count < locationIds.length; ++count) {
            await FoursquareAPI.getLocationDetails(locationIds[count])
                .then(data => {
                    if (data.meta.errorDetail) {
                        return console.error(`FourSquareAPI fetch error ${data.meta.errorDetail}`);
                    }
                    return locationData.push(data.response.venue);
                }).catch(err => console.error(err));
        }

        for (let ct = 0; ct < 10; ++ct) {
            locationData.push(locationData[0]);
        }

        console.log(locationData);

        this.setState({
            allLocations: locationData,
            searchResults: locationData,
            loading: false
        });
    }
    

    filterLocations = (query) => {
        //if query is empty return all locations
        if (query === " " || !query) {
            return this.setState({ searchResults: this.state.allLocations});
        }

        let matchedLocations = this.state.allLocations.filter((location) => {
            //if the location name matches the query
            if (location.name.toLowerCase().includes(query)) {
                //keep that location in matchedLocations
                return location;
            }
            //otherwise check if query matches any of the location's categories
            else if (location.categories) {
                for (let count = 0; count < location.categories.length; ++count) {
                    if (location.categories[count].pluralName.toLowerCase().includes(query)) {
                        return location;
                    }
                }
            }
        });

        return this.setState({ searchResults: matchedLocations });
    }//filterLocations end


  render() {
    return (
      <main className="App">
            <header className="header">
                <button
                    className="open-sidebar-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        //toggles sidebar open/close
                        let menu = document.querySelector('.sidebar');
                        if (!menu) return;
                        menu.classList.toggle("close");
                        menu.classList.toggle("open");
                    }}
                    aria-label={"toggle sidebar"}
                >
                    <i className="fas fa-bars fa-2x" />
                </button>
                <h1 className="title"> React Neighborhood Map </h1>
            </header>
            {this.state.loading ?
                <p className="loading">loading...</p>
                :
                <ErrorHandler>
                    <MapContainer
                        google={this.props.google}
                        initialCenter={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                        defaultZoom={16}
                        filterLocations={this.filterLocations}
                        locationsArray={this.state.searchResults}
                    />
                </ErrorHandler>
            }
      </main>
    );
  }
}

export default GoogleApiWrapper({
    //pass apiKey and google maps url to the api call's parameters
    apiKey: googleApiKey,
    url: 'https://maps.googleapis.com/maps/api/js',
})(App);
