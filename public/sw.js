// This is a service worker
// Service workers react to specific events, but no DOM access

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Servent Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function (cache) {
                console.log('[Service Worker] Pre-Caching App Shell');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/promise.js',
                    '/src/js/fetch.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    '/src/images/main-image.jpg',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ]);
            }));
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Servent Worker ...', event);

    // self.clients.clain() ensures that SWs are loaded or are activated correctly.
    // Not necessary, but does make the code more robust.
    return self.clients.claim();
});

// Non-Life-Cycle Event

/* When a fetch event is triggered,  such as an img tag requesting an image,
 *  we hijack the output and respond with whatever we want to respond with.
 *  The point is, the response has to go through the Service Worker
 *  Using fetch(), we can look at a SW as a network proxy.
 *  Use respondsWith() so that every outgoing fetch request and response goes through the SW.
 */
self.addEventListener('fetch', function (event) {
    // fetch event will happen, for example, if html asks for img
    //console.log('[Service Worker] Fetching something ...', event);

    // Use respondsWith() to Override the data which gets sent back
    //event.respondWith(fetch(event.request));

    // fetch the data from the Cache API
    // request are your keys == keys are a request object, and store in new cache
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    // returning the value from the cache
                    return response;
                } else {
                    // if the key is not in the cache, store in a new cache
                    return fetch(event.request)

                }
            })
    );
});




