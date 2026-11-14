// Browsers post enquiries to our own /api/enquiry route (spam checks +
// validation), which forwards to the backend. Returns the fetch Response so
// callers keep their existing `response.ok` / `await response.json()` logic.
export function postEnquiry(kind, payload, guard) {
  return fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ kind, ...payload, website: guard.website, _t: guard.startedAt }),
  });
}
