/* Serum — Service Worker
   Legt die App im Geraetespeicher ab und meldet der Seite, wenn eine neue Fassung bereitliegt.
   Bei jeder Aenderung an index.html die Versionsnummer hochzaehlen. */
const CACHE = "serum-v6";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

/* Bewusst ohne skipWaiting: Die neue Fassung wartet, bis die Seite grünes Licht gibt.
   Sonst würde sie mitten in einer Eingabe übernehmen. */
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* Anfragen an die Claude-API niemals zwischenspeichern. */
  if (url.hostname === "api.anthropic.com") return;

  if (url.origin === location.origin) {
    /* Eigene Dateien: erst Netz, damit Updates ankommen; Cache als Rückfall. */
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
  } else {
    /* Schriften und pdf.js: erst Cache, damit die App offline gleich aussieht. */
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }))
    );
  }
});
