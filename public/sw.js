let currentCache = 'neighborhood-map-v1';

let cachedFiles = [
    './',
    './index.html',
    './favicon.ico',
    'static/media/powered-by-foursquare.cdd335d8.png',
    'static/js/main.chunk.js',
    'static/js/bundle.js',
    'static/js/0.chunk.js',
    'https://fonts.googleapis.com/css?family=Exo:200',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',

    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12365!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=24276',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12364!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=64019',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12364!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=113353',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12365!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=73610',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12366!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=33867',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12366!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=115604',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12363!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146048!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=27390',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12363!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146048!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=76724',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12367!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=125195',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12367!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=75861',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12362!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=12434',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12362!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=61768',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12368!3i26299!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=85452',
    'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i16!2i12368!3i26300!4i256!2m3!1e2!6m1!3e5!2m3!1e0!2sm!3i440146060!3m14!2sen!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2!23i1301875&key=AIzaSyCvRrihVSVciSghCR1F0HLX1pQXwL_xmTM&token=36118',
];

self.addEventListener('install', (e) => {
    console.log('Service Worker installed');
    //add files to cache
    e.waitUntil(caches.open(currentCache)
        .then(cache => { return cache.addAll(cachedFiles); })
        .catch(err => console.log(err))
    );
});

self.addEventListener('activate', (e) => {
    console.log('Service Worker active');
    //Remove old cache
    e.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((thisCache) => {
                if (thisCache !== currentCache)
                    return caches.delete(thisCache);
            })
        );
    }));
});

self.addEventListener('fetch', (e) => {
    console.log('Fetching', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            //if response is found in the cache return it
            if (response) {
                console.log("Service Worker found in cache", e.request.url);
                return response;
            }

            //fetch if request is not already in the cache
            return fetch(e.request).then((fetchResponse) => {
                if (fetchResponse.status == 0) {
                    //don't cache if status = 0
                    return fetchResponse;
                }
                //add request to cache
                e.waitUntil(caches.open(currentCache)
                    .then(cache => {
                        if (!fetchResponse.bodyUsed) {
                            let responseClone = fetchResponse.clone();
                            cache.put(e.request.url, responseClone);
                        }
                        else {
                            cache.add(e.request.url);
                        }
                        return fetchResponse;
                    }).catch(err => console.error("Service Worker error fetching & caching new data: ", err))
                );
                return fetchResponse;
            });
        })
    );
});

