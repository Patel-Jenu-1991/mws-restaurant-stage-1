'use strict';

console.log('Service Worker: Registered');

// Listen for install event and cache offline resources
self.addEventListener('install', function(event) {
  // wait till the installation event is complete
  event.waitUntil(
    // open a caches object named v1
    caches.open('v1').then(function(cache) {
      // Add cache files to the cache
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
      ]);
    })
  );
});

// handle the fetch event to respond to requests
// from the cache or a network request
self.addEventListener('fetch', function(event) {
  // invoke the respondWith method to prevent default action
  // and provide it a promise
  event.respondWith(
    // check for the request url to match in our existing cache
    // then provide the appropriate response
    caches.match(event.request).then(function(response) {
      // if we get a match from the match query
      // the request already exists in the cache and we can return it
      if (response) {
        console.log('Found ', event.request, ' in cache');
        return response;
      } else {
        // If the request doesn't exist within the cache
        // it needs to be fetched via a network request like normal
        console.log('Could not find ', event.request, ' in cache, FETCHING!');
        // we not only want to fetch the request but also
        // add it to the cache for use later
        return fetch(event.request).then(function(response) {
          // using a cloned response to avoid
          // reusing the same response
          const clonedResponse = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(event.request, clonedResponse);
          })
          return response;
        })
      }
    })
  );
});
