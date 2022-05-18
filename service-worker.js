const CACHE_NAME = "cimahicity-v5";

let urlsToCache = [
    "/",
    "/index.html",
    "/sidenav.html",
    "/topnav.html",
    "/pages/home.html",
    "/pages/article.html",
    "/pages/history.html",
    "/pages/info.html",
    "/js/materialize.min.js",
    "/js/script.js",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/slider-1.jpg",
    "/img/slider-2.jpg",
    "/img/slider-3.jpg",
    "/img/history-1.jpg",
    "/img/history-2.jpg",
    "/img/history-3.jpg",
    "/img/history-4.jpg",
    "/img/history-5.jpg",
    "/img/parallax-article.jpg",
    "/img/parallax-history.jpg",
    "/img/parallax-info.jpg",
    "/img/bg.jpeg",
    "/img/cimahi.svg",
    "/img/lokasi-cimahi.png",
    "/img/icons/icon-72x72.png",
    "/img/icons/icon-96x96.png",
    "/img/icons/icon-128x128.png",
    "/img/icons/icon-144x144.png",
    "/img/icons/icon-192x192.png",
    "/img/icons/icon-256x256.png",
    "/img/icons/icon-384x384.png",
    "/img/icons/icon-512x512.png",
    "/manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log(`ServiceWorker: Gunakan asset dari cache: ${response.url}`);
                    return response;
                }

                console.log(`ServiceWorker: Memuat asset dari server: ${event.request.url}`);
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames
                        .map(function (cacheName) {
                            if (cacheName != CACHE_NAME) {
                                console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                                return caches.delete(cacheName);
                            }
                        })
                );
            })
    );
});