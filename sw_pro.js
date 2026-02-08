// Market Pro Service Worker - Enterprise v3.1
const CACHE_NAME = 'market-pro-v3.1'; // Versiyonu bir tık artırdık ki tarayıcı tazelemeyi anlasın

const urlsToCache = [
  './',
  './index.html',
  './manifest_pro.json',
  'https://unpkg.com/@zxing/library@latest/umd/index.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Kurulum: Dosyaları Önbelleğe Al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Önbellek açılıyor...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Strateji: Önbelleği Kontrol Et, Bulamazsan Ağdan Çek
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Eğer önbellekte varsa onu döndür, yoksa ağa git
        return response || fetch(event.request);
      })
      .catch(() => {
        // Eğer her iki tarafta da hata varsa (offline iken yeni sayfa açılıyorsa)
        // Burayı eski pwa dosyasından index.html'e çevirdik:
        return caches.match('./index.html');
      })
  );
});

// Aktivasyon: Eski Önbellekleri Temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eski önbellek siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
