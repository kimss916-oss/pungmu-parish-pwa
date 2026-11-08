const CACHE='pungmu-shell-v7';
const SHELL=['/pungmu-parish-pwa/','/pungmu-parish-pwa/index.html','/pungmu-parish-pwa/manifest.webmanifest','/pungmu-parish-pwa/icons/icon-192.png','/pungmu-parish-pwa/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put(e.request,x));return r;}).catch(()=>caches.match(e.request)));});

// Firebase Messaging background notifications (same SW used for PWA shell).
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:'AIzaSyABX1iZ5Kq7zwcr22faMapM5IUhP86amNo',authDomain:'pungmu-parish-pwa.firebaseapp.com',projectId:'pungmu-parish-pwa',messagingSenderId:'391478026636',appId:'1:391478026636:web:5cc77ea9ce109b565eb6a9'});
const messaging=firebase.messaging();
// FCM notification payloads are displayed by the SDK when app is in background.

self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||'/pungmu-parish-pwa/',self.location.origin);
 if(target.origin!==self.location.origin)return;
 event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(windows=>{
  for(const win of windows){if(new URL(win.url).origin===target.origin){return win.focus();}}
  return clients.openWindow(target.href);
 }));
});
