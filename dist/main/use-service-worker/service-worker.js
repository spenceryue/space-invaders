/// <reference lib="WebWorker" />
self.addEventListener("activate", () => {
    self.clients.claim();
    console.log("〄 Activated!");
});
self.addEventListener("fetch", (event) => {
    console.log("〄 Fetch!", event);
    event.request.url.startsWith("./") && event.respondWith(fetch(event.request.url.replace("./", "./dist/")));
});
export {};
