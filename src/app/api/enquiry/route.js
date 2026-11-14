import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/config";

// Server-side gate in front of the backend's enquiry endpoints.
// Blocks the cheap bots (honeypot, instant submits, link spam, floods) and
// validates input before anything reaches the backend. Browsers post here
// instead of calling the backend directly.
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 2500;           // humans need longer than this to fill a form
const MAX_AGE_MS = 6 * 60 * 60 * 1000;
const WINDOW_MS = 10 * 60 * 1000;   // rate-limit window
const MAX_PER_WINDOW = 5;           // submissions per IP per window
const hits = new Map();             // ip -> timestamps (per server process)

const ENDPOINT = { enquiry: "enquiry", "home-enquiry": "home-enquiry" };
const OK = { status: true, message: "Thank you! We will contact you soon." };

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const linkCount = (s) => (s.match(/https?:\/\/|www\./gi) || []).length;

function validate(kind, body) {
  const errors = {};
  let clean;
  if (kind === "enquiry") {
    clean = {
      title: str(body.title, 100),
      name: str(body.name, 100),
      email: str(body.email, 150),
      subject: str(body.subject, 150),
      message: str(body.message, 2000),
    };
    if (clean.name.length < 3) errors.name = ["Please enter your name (at least 3 characters)"];
    if (clean.subject.length < 3) errors.subject = ["Please enter a subject (at least 3 characters)"];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) errors.email = ["Please enter a valid email address"];
    if (clean.message.length < 10) errors.message = ["Please enter your message (at least 10 characters)"];
  } else {
    clean = {
      arrival: str(body.arrival, 10),
      departure: str(body.departure, 10),
      adult: Number(body.adult) || 1,
      phone: str(body.phone, 15),
    };
    if (!/^[0-9]{8,15}$/.test(clean.phone)) errors.phone = ["Please enter a valid phone number (8-15 digits)"];
    const a = Date.parse(clean.arrival);
    const d = Date.parse(clean.departure);
    if (Number.isNaN(a) || Number.isNaN(d) || d <= a) errors.departure = ["Departure date must be after arrival date"];
    if (clean.adult < 1 || clean.adult > 20) errors.adult = ["Please choose number of adults"];
  }
  return { errors, clean };
}

export async function POST(request) {
  const len = Number(request.headers.get("content-length") || 0);
  if (len > 10_000) return NextResponse.json({ status: false, message: "Request too large." }, { status: 413 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: false, message: "Invalid request." }, { status: 400 });
  }

  const kind = body?.kind;
  if (!ENDPOINT[kind]) return NextResponse.json({ status: false, message: "Invalid request." }, { status: 400 });

  // Bots: pretend it worked so they do not retry or adapt.
  const age = Date.now() - Number(body._t || 0);
  const tooFast = !(age >= MIN_FILL_MS && age <= MAX_AGE_MS);
  const honeypot = typeof body.website === "string" && body.website.trim() !== "";
  if (honeypot || tooFast) return NextResponse.json(OK);

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { status: false, message: "Too many requests. Please try again in a few minutes or call us." },
      { status: 429 }
    );
  }

  const { errors, clean } = validate(kind, body);
  if (Object.keys(errors).length) return NextResponse.json({ status: false, errors }, { status: 422 });

  const text = [clean.name, clean.subject, clean.message].filter(Boolean).join(" ");
  if (kind === "enquiry" && linkCount(text) > 2) return NextResponse.json(OK);

  try {
    const upstream = await fetch(`${API_BASE}/${ENDPOINT[kind]}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-Client-IP": ip },
      body: JSON.stringify(clean),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await upstream.json().catch(() => ({ status: upstream.ok }));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("Enquiry upstream error:", err?.message);
    return NextResponse.json(
      { status: false, message: "We could not send your enquiry right now. Please call us or try again shortly." },
      { status: 502 }
    );
  }
}
