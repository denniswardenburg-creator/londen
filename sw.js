const CACHE = 'kim-dennis-londen-v2';
const CORE = ['./','./index.html','./styles.css','./app.js','./planner.js','./manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('kim-dennis-londen-') && k !== CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event => {
  // Never cache live journeys or location queries.
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(resp => {
    if(resp.ok) {const copy = resp.clone();caches.open(CACHE).then(c => c.put(event.request, copy)).catch(()=>{});}
    return resp;
  }).catch(() => caches.match(event.request)));
});
