export const SITE_URL = "https://www.theelegance.co.in";
export const SITE_NAME = "The Elegance Hotel";
export const DEFAULT_OG_IMAGE = {
  url: "/og-default.jpg", // resolved against metadataBase in app/layout.js
  width: 1200,
  height: 630,
  alt: "The Elegance Hotel, Varanasi - hotel near Banaras Railway Station",
};

/**
 * Build a complete metadata object (title, description, canonical, Open Graph,
 * Twitter). Pass the page title WITHOUT the site suffix: app/layout.js adds
 * " | The Elegance" through title.template.
 *
 * Next.js replaces (not merges) openGraph/twitter objects per page, so every
 * page has to carry its own - this helper keeps that in one place.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
}) {
  const img = image
    ? { url: image, alt: title }
    : DEFAULT_OG_IMAGE;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url || SITE_URL },
    openGraph: {
      title,
      description,
      url: url || SITE_URL,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img.url],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

// Back-compat wrapper for older call sites.
export function pageMeta(title, description, path = "/") {
  return buildMetadata({ title, description, path });
}
