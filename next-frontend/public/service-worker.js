self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (evt) => evt.waitUntil(self.clients.claim()));

self.addEventListener("message", (event) => {
  const { type, payload } = event.data || {};
  if (type === "SHOW_NOTIFICATION" && payload) {
    const options = {
      body: payload.message || "",
      icon: payload.icon || "/favicon.ico",
      data: payload.data || { url: payload.url || "/" },
      tag: `notif-${payload.id || Date.now()}`,
      renotify: true,
    };
    self.registration.showNotification(payload.title || "Notification", options);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
