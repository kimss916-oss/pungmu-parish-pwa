const CACHE='pungmu-shell-v3';
const SHELL=[
  '/pungmu-parish-pwa/',
  '/pungmu-parish-pwa/index.html',
  '/pungmu-parish-pwa/manifest.webmanifest',
  '/pungmu-parish-pwa/icons/icon-192.png',
  '/pungmu-parish-pwa/icons/icon-512.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
  }).catch(()=>caches.match(e.request)));
});
