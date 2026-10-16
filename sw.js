// Service worker Presensi KB RA At Tibyan
// Naikkan angka versi (absen-v2, v3, ...) bila ingin memaksa HP mengambil file baru.
var CACHE = "absen-v2";
var FILES = [
  "./", "./index.html", "./manifest.json", "./logo.png",
  "./icon-192.png", "./icon-512.png", "./bunyi.mp3", "./masuk.mp3", "./salam.mp3"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // file yang belum ada (mis. mp3) dilewati, tidak menggagalkan instalasi
      return Promise.all(FILES.map(function (f) { return c.add(f).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Hanya file aplikasi (satu domain, GET). Apps Script, CDN face-api, dan suara online tidak disentuh.
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var salinan = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, salinan); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match("./index.html"); });
    })
  );
});
