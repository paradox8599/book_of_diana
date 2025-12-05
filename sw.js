self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('my-pwa-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/bg.webp',
        '/bg_mobile.webp'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

