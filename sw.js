self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('my-pwa-cache-v3').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon_512.png',
        '/bg.webp',
        '/bg_mobile.webp'
      ]);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== 'my-pwa-cache-v3')
            .map(key => caches.delete(key))
      );
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

