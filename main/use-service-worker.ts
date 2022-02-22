// Unused right now. Couldn't figure out how to make SW play nicely with TS.

export function useServiceWorker(): Promise<void> {
    return navigator.serviceWorker.register("./use-service-worker/service-worker.js").then(
        (registration) => console.log("Registered!", registration),
        (reason) => console.error("Failed!", reason)
    );
}
