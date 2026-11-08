/* FCM 테스트 전용: 운영 앱 캐시/업데이트에 영향 없음 */
// Firebase HTTP v1 웹 푸시: 백그라운드에서도 알림 표시
self.addEventListener('push', event => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; }
  catch (_) { try { payload = { notification: { body: event.data ? event.data.text() : '' } }; } catch (_) {} }
  const n = payload.notification || {};
  const d = payload.data || {};
  const title = n.title || d.title || '풍무동성당';
  const body = n.body || d.body || '새 알림이 도착했습니다.';
  const link = (payload.fcmOptions && payload.fcmOptions.link) ||
               (payload.fcm_options && payload.fcm_options.link) ||
               d.link || '/pungmu-parish-pwa/';
  let target;
  try {
    const u = new URL(link, self.location.origin);
    target = u.origin === self.location.origin && u.pathname.startsWith('/pungmu-parish-pwa/')
      ? u.href : new URL('/pungmu-parish-pwa/', self.location.origin).href;
  } catch (_) { target = new URL('/pungmu-parish-pwa/', self.location.origin).href; }
  event.waitUntil(self.registration.showNotification(title, {
    body,
    icon: '/pungmu-parish-pwa/icons/icon-192.png',
    badge: '/pungmu-parish-pwa/icons/icon-192.png',
    data: { url: target }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) ||
                 new URL('/pungmu-parish-pwa/', self.location.origin).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const existing = windows.find(w => w.url === target);
    if (existing) return existing.focus();
    return self.clients.openWindow(target);
  })());
});
