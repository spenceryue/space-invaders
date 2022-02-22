/// <reference lib="WebWorker" />

// Unused right now. Couldn't figure out how to make SW play nicely with TS.

declare var self: ServiceWorkerGlobalScope;

self.addEventListener("activate", () => {
    self.clients.claim();
    console.log("〄 Activated!");
});

self.addEventListener("fetch", (event) => {
    console.log("〄 Fetch!", event);

    event.request.url.startsWith("./") && event.respondWith(fetch(event.request.url.replace("./", "./dist/")));
});

export {};
