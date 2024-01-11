const CACHE = 'wfh';
const FILES = [
  './',
  './index.css',
  './index.html',
  './worker.js',
  './js/main.js',
  './js/setup.js',
  './js/timeCalculations.js',
  './js/carbonHelper.js',
  './icons/wfh-256.png',
  './icons/wfh-512.png',
];

async function fetchFromCache(request) {
  const cache = await caches.open(CACHE);
  const data = await cache.match(request);
  if (data) {
    return data;
  } else {
    await cache.add(request);
    return cache.match(request);
  }
}

function interceptFetch(e) {
  e.respondWith(fetchFromCache(e.request));
}

async function installMyServiceWorker() {
  // pre-cache everything
  try {
    const c = await caches.open(CACHE);
    await c.addAll(FILES);
    console.log('Cache is primed.');
  } catch (e) {
    console.warn("Priming cache failed.  Falling back to 'online only'.", e);
  }
}

self.addEventListener('install', installMyServiceWorker);
self.addEventListener('fetch', interceptFetch);
