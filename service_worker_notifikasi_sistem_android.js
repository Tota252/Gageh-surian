// Service Worker Gageh Surian - Menampilkan Kartu Notifikasi Sistem Android (Notification Shade & Lock Screen)
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Menerima perintah notifikasi dari halaman utama aplikasi
self.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type === 'SHOW_ANDROID_NOTIFICATION') {
        const title = data.title || 'Gageh Surian';
        const options = data.options || {};
        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    }
});

// Saat pengguna mengetuk kartu notifikasi di panel Android / layar kunci
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) || './index.html';

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(targetUrl);
            }
        })
    );
});