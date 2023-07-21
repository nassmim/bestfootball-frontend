const CACHE_NAME = 'bestfootball-cache-v1';
const urlsToCache = [
    './index.html',
    '/css/bootstrap.min.css',
    '/css/font-awesome.min.css',
    'css/style.css',
    'js/bootstrap.min.js',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {

    event.respondWith(

        caches.match(event.request)
        
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

/* Notifications service */
self.addEventListener("push", event => {
    event.waitUntil(
        showNotification(event)
    );
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (clients.openWindow && event.notification.data.url) {
        event.waitUntil(clients.openWindow(event.notification.data.url));
    }
});


function showNotification(event) {
    return new Promise(resolve => {
        const { title, body, icon, data } = JSON.parse(event.data.text());
        self.registration
            .showNotification(title, { body, icon, data })
            .then(resolve)
    })
}
/* End Notifications service */