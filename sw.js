const CACHE_NAME = 'meiko-rnd-v3';
const PRECACHE = [
  './',
  'assets/home.css',
  'assets/home.js',
  'assets/home-copy.mjs',
  'assets/site.css',
  'assets/site.js',
  'assets/site-copy.mjs',
  'assets/road.js',
  'assets/meiko-logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  const isCode = /\.(css|js|mjs)$/i.test(url.pathname);
  const isAsset = /\.(png|webp|jpg|jpeg|svg|woff2?)$/i.test(url.pathname);

  // Code is network-first so a new deploy never pairs fresh HTML with stale CSS/JS.
  if (isCode) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) { const clone = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)); }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  if (isAsset) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  } else {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok && url.pathname.endsWith('/')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
  }
});
