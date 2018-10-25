
export default function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then(sw => console.log("Service Worker Registered"))
            .catch(error => console.log("Error registering service worker:", error));
    }
    return;
}

