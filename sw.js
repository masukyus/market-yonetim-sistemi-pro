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
 */

// CONFIGURATION
const CACHE_VERSION = 'market-stok-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}`;

const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json'
];

const CACHE_LIMITS = {
    static: 50,
    dynamic: 100,
    images: 50
};

// INSTALL EVENT
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
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Pre-caching failed:', error);
            })
    );
});

// ACTIVATE EVENT
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...', CACHE_VERSION);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
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
                return self.clients.claim();
            })
            .catch((error) => {
                console.error('[SW] Activation failed:', error);
            })
    );
});

// FETCH EVENT
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

// CACHE FIRST STRATEGY
async function cacheFirstStrategy(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            updateCache(request, cacheName);
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        const responseToCache = networkResponse.clone();
        
        const cache = await caches.open(cacheName);
        await cache.put(request, responseToCache);
        
        await limitCacheSize(cacheName, CACHE_LIMITS[getCacheType(cacheName)]);
        
        return networkResponse;
        
    } catch (error) {
        console.error('[SW] Cache First Strategy failed:', error);
        
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

// BACKGROUND CACHE UPDATE
async function updateCache(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(cacheName);
        await cache.put(request, networkResponse);
    } catch (error) {
        console.log('[SW] Background update failed:', error);
    }
}

// CACHE SIZE LIMIT
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        const itemsToDelete = keys.length - maxItems;
        
        for (let i = 0; i < itemsToDelete; i++) {
            await cache.delete(keys[i]);
        }
        
        console.log(`[SW] Cleaned ${itemsToDelete} items from ${cacheName}`);
    }
}

// GET CACHE TYPE
function getCacheType(cacheName) {
    if (cacheName.includes('static')) return 'static';
    if (cacheName.includes('images')) return 'images';
    return 'dynamic';
}

// BACKGROUND SYNC
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync triggered:', event.tag);
    
    if (event.tag === 'sync-products') {
        event.waitUntil(syncProducts());
    }
});

async function syncProducts() {
    try {
        const clients = await self.clients.matchAll();
        
        if (clients.length > 0) {
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

// PUSH NOTIFICATIONS
self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'Yeni bildirim',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification('Market Stok Yönetimi', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event.action);
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});

// MESSAGE HANDLER
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'SYNC_NOW') {
        event.waitUntil(syncProducts());
    }
});

// ERROR HANDLERS
self.addEventListener('error', (event) => {
    console.error('[SW] Error occurred:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service Worker loaded:', CACHE_VERSION);
