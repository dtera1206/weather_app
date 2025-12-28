const CACHE_NAME = 'weather-app-v1';
const urlsToCache = ['./', './index.html', './css/style.css', './js/main.js'];

// インストール時にファイルをキャッシュする（オフライン対応の準備）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// ネットワークが使えないときはキャッシュから読み込む
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
