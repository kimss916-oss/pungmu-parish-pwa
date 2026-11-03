const CACHE='pungmu-shell-v2';
const BASE='/pungmu-parish-pwa/';
const SHELL=[
  BASE,
  BASE+'index.html',
  BASE+'manifest.webmanifest',
  BASE+'icons/icon-192.png',
  BASE+'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match(BASE+'index.html'))
    )
  );
});
