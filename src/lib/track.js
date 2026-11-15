// Thin wrapper over GA4 gtag. Safe on the server and when gtag is blocked.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, {
      page_path: window.location.pathname,
      ...params,
    });
  } catch (_) {
    /* analytics must never break the page */
  }
}
