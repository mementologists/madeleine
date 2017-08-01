self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('madeleine').then(cache => (
      cache.addAll([
        '/',
        '/assets/style.css',
        '/dist/bundle.js'
      ])
    ))
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
    .catch(err => console.log(err.stack))
    );
});
