"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

// One delegated click listener covers every WhatsApp, phone, email and
// booking-engine link on the site (header, footer, banners, room pages),
// including links added in future.
function classify(href) {
  const h = href.toLowerCase();
  if (h.includes("wa.me") || h.includes("api.whatsapp.com") || h.includes("web.whatsapp.com")) return "whatsapp_click";
  if (h.startsWith("tel:")) return "phone_click";
  if (h.startsWith("mailto:")) return "email_click";
  if (h.includes("bookingengine.maximojo.com")) return "booking_engine_click";
  return null;
}

export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const event = classify(href);
      if (!event) return;
      trackEvent(event, {
        link_url: href.split("&text=")[0],
        link_text: (a.textContent || "").trim().slice(0, 60),
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
