import { trackEvent } from "@/lib/track";

// Browsers post enquiries to our own /api/enquiry route (spam checks +
// validation), which forwards to the backend. Returns the fetch Response so
// callers keep their existing `response.ok` / `await response.json()` logic.
export async function postEnquiry(kind, payload, guard) {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ kind, ...payload, website: guard.website, _t: guard.startedAt }),
  });
  if (response.ok) {
    // GA4 recommended lead event; mark as a key event in GA4.
    trackEvent("generate_lead", {
      form_type: kind === "home-enquiry" ? "home_booking_bar" : "enquiry_form",
      form_title: payload && payload.title ? String(payload.title).slice(0, 20) : undefined,
    });
  }
  return response;
}
