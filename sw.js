const CACHE_NAME = "tsz-cache-v4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Telepítéskor azonnal át akarjuk venni az irányítást: skipWaiting.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

// Aktiváláskor töröljük a régi cache-eket, és azonnal átveszünk minden klienst.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      ),
      self.clients.claim()
    ])
  );
});

// Ha új SW aktiválódott, szólunk a kliensnek, hogy töltsön újra (így mindig a friss verzió jön).
self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      clients.forEach((client) => client.postMessage({ type: "NEW_VERSION" }));
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const isHTML = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    // Hálózat-elsőbbség: mindig a legfrissebb oldalt próbáljuk betölteni,
    // a gyorsítótár csak offline esetén lép életbe.
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone)).catch(() => {});
          }
          return networkRes;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Egyéb erőforrásoknál (betűtípusok, ikonok): gyorsítótár-elsőbbség, háttérben frissítve.
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200 && networkRes.type !== "opaque") {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone)).catch(() => {});
          }
          return networkRes;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
