/**
 * ============================================
 * MARKET STOK YÖNETİMİ - SERVICE WORKER
 * ============================================
 * 
 * Offline-First PWA Architecture
 * Cache Strategy: Cache First, Network Fallback
 * Background Sync Support
 * 
 * @version 1.0.0
 * @author Senior Frontend Engineer
 */

// ============================================
// CONFIGURATION
// ============================================

const CACHE_VERSION = 'market-stok-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}`;

// Cache kategorileri
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

// Cache edilecek statik dosyalar
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    // External CDN resources - cached on first use
];

// Cache limitleri
const CACHE_LIMITS = {
    static: 50,
    dynamic: 100,
    images: 50
};

// Cache süresi (milisaniye)
const CACHE_DURATION = {
    static: 30 * 24 * 60 * 60 * 1000,  // 30 gün
    dynamic: 7 * 24 * 60 * 60 * 1000,   // 7 gün
    images: 14 * 24 * 60 * 60 * 1000    // 14 gün
};

// ============================================
// INSTALL EVENT
// ============================================

self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...', CACHE_VERSION);
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Pre-caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached successfully');
                // Force activation
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Pre-caching failed:', error);
            })
    );
});

// ============================================
// ACTIVATE EVENT
// ============================================

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...', CACHE_VERSION);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Eski cache'leri temizle
                            return cacheName.startsWith('market-stok-') && 
                                   cacheName !== STATIC_CACHE && 
                                   cacheName !== DYNAMIC_CACHE && 
                                   cacheName !== IMAGE_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Old caches cleaned');
                // Tüm clientları kontrol et
                return self.clients.claim();
            })
            .catch((error) => {
                console.error('[SW] Activation failed:', error);
            })
    );
});

// ============================================
// FETCH EVENT - Cache Strategy
// ============================================

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }

    // API requests - Network First
    if (url.pathname.includes('/api/')) {
        event.respondWith(networkFirstStrategy(request));
        return;
    }

    // Image requests - Cache First
    if (request.destination === 'image') {
        event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
        return;
    }

    // CDN resources - Cache First
    if (url.origin !== location.origin) {
        event.respondWith(cacheFirstStrategy(request, DYNAMIC_CACHE));
        return;
    }

    // HTML/CSS/JS - Cache First with Network Fallback
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
});

// ============================================
// CACHING STRATEGIES
// ============================================

/**
 * Cache First Strategy
 * Cache'de varsa cache'den döner, yoksa network'ten alır ve cache'ler
 */
async function cacheFirstStrategy(request, cacheName) {
    try {
        // Cache'de ara
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            // Cache'de var, ama background'da güncelle
            updateCache(request, cacheName);
            return cachedResponse;
        }

        // Cache'de yok, network'ten al
        const networkResponse = await fetch(request);
        
        // Clone et (response sadece bir kez kullanılabilir)
        const responseToCache = networkResponse.clone();
        
        // Cache'e ekle
        const cache = await caches.open(cacheName);
        await cache.put(request, responseToCache);
        
        // Cache boyut kontrolü
        await limitCacheSize(cacheName, CACHE_LIMITS[getCacheType(cacheName)]);
        
        return networkResponse;
        
    } catch (error) {
        console.error('[SW] Cache First Strategy failed:', error);
        
        // Offline fallback
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

/**
 * Network First Strategy
 * Önce network'e git, başarısızsa cache'den döner
 */
async function networkFirstStrategy(request) {
    try {
        // Network'ten al
        const networkResponse = await fetch(request);
        
        // Clone et
        const responseToCache = networkResponse.clone();
        
        // Cache'e ekle
        const cache = await caches.open(DYNAMIC_CACHE);
        await cache.put(request, responseToCache);
        
        return networkResponse;
        
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', error);
        
        // Network başarısız, cache'den dön
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

/**
 * Background'da cache güncelleme
 */
async function updateCache(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(cacheName);
        await cache.put(request, networkResponse);
    } catch (error) {
        // Silent fail - background update
        console.log('[SW] Background update failed:', error);
    }
}

// ============================================
// CACHE MANAGEMENT
// ============================================

/**
 * Cache boyutunu sınırla
 */
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        // En eski item'ları sil
        const itemsToDelete = keys.length - maxItems;
        
        for (let i = 0; i < itemsToDelete; i++) {
            await cache.delete(keys[i]);
        }
        
        console.log(`[SW] Cleaned ${itemsToDelete} items from ${cacheName}`);
    }
}

/**
 * Cache tipini belirle
 */
function getCacheType(cacheName) {
    if (cacheName.includes('static')) return 'static';
    if (cacheName.includes('images')) return 'images';
    return 'dynamic';
}

/**
 * Tüm cache'leri temizle (Debug için)
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('[SW] All caches cleared');
}

// ============================================
// BACKGROUND SYNC
// ============================================

/**
 * Background Sync - Offline sırasında kuyruğa alınan işlemler
 */
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync triggered:', event.tag);
    
    if (event.tag === 'sync-products') {
        event.waitUntil(syncProducts());
    }
});

/**
 * Ürün verilerini senkronize et
 */
async function syncProducts() {
    try {
        // LocalStorage'dan sync queue'yu al
        const clients = await self.clients.matchAll();
        
        if (clients.length > 0) {
            // Client'a sync mesajı gönder
            clients[0].postMessage({
                type: 'SYNC_REQUESTED',
                timestamp: Date.now()
            });
        }
        
        console.log('[SW] Product sync completed');
    } catch (error) {
        console.error('[SW] Product sync failed:', error);
        throw error;
    }
}

// ============================================
// PUSH NOTIFICATIONS (Optional)
// ============================================

/**
 * Push notification handler
 */
self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'Yeni bildirim',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Görüntüle',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Kapat',
                icon: '/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Market Stok Yönetimi', options)
    );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// ============================================
// MESSAGE HANDLER
// ============================================

/**
 * Client'tan mesaj al
 */
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(clearAllCaches());
    }
    
    if (event.data.type === 'SYNC_NOW') {
        event.waitUntil(syncProducts());
    }
});

// ============================================
// ERROR HANDLER
// ============================================

self.addEventListener('error', (event) => {
    console.error('[SW] Error occurred:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW] Unhandled promise rejection:', event.reason);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Cache durumunu raporla
 */
async function getCacheReport() {
    const cacheNames = await caches.keys();
    const report = {};
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        report[cacheName] = keys.length;
    }
    
    return report;
}

// Log service worker version
console.log('[SW] Service Worker loaded:', CACHE_VERSION);