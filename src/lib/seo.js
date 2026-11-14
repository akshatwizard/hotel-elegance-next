import { SITE_INFO } from "@/lib/siteInfo";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/utils/metadata";

// Names shown in breadcrumbs for top-level sections.
const SECTION_NAMES = {
  "hotel-rooms-in-varanasi": "Rooms",
  "budget-restaurant-varanasi": "Restaurant",
  "best-banquet-budget-varanasi": "Banquets",
  "best-lounge-varansasi-tafri-elegance": "Lounge",
  facilities: "Facilities",
  gallery: "Gallery",
  tariff: "Tariff",
  blog: "Blog",
  "near-by-place": "Nearby Places",
  contact: "Contact",
};

export const HOTEL_ID = `${SITE_URL}/#hotel`;

// Details are taken from the site's own footer/contact page. Do not add
// ratings, star class, coordinates or price range here until they are
// confirmed against the Google Business Profile.
export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": HOTEL_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: [`${SITE_URL}${DEFAULT_OG_IMAGE.url}`],
    description:
      "Boutique hotel in Varanasi near Banaras Railway Station and BHU, close to BLW, with rooms, a restaurant, banquet halls and a lounge.",
    telephone: SITE_INFO.primaryPhone,
    email: SITE_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE_INFO.streetLine1} ${SITE_INFO.streetLine2}`.replace(/,\s+/g, ", "),
      addressLocality: SITE_INFO.city,
      addressRegion: SITE_INFO.region,
      postalCode: SITE_INFO.postalCode,
      addressCountry: SITE_INFO.country,
    },
    sameAs: [
      "https://www.facebook.com/theelegancehotel/",
      "https://www.instagram.com/theelegancehotel/",
      "https://www.tripadvisor.in/Hotel_Review-g297685-d23708537-Reviews-The_Elegance_Hotel-Varanasi_Varanasi_District_Uttar_Pradesh.html",
    ],
  };
}

export function breadcrumbSchema(pathname, title) {
  const segments = (pathname || "/").split("/").filter(Boolean);
  const items = [{ name: "Home", url: SITE_URL }];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const last = i === segments.length - 1;
    items.push({
      name: last ? title : SECTION_NAMES[seg] || title,
      url: `${SITE_URL}${acc}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function roomSchema(room, slug) {
  const url = `${SITE_URL}/hotel-rooms-in-varanasi/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.title,
    description: room.description,
    url,
    image: room.gallery?.length
      ? room.gallery.slice(0, 6).map((p) => `${SITE_URL}${p}`)
      : [`${SITE_URL}${room.image}`],
    bed: { "@type": "BedDetails", typeOfBed: room.bedType },
    occupancy: { "@type": "QuantitativeValue", value: parseInt(room.occupancy) || undefined },
    containedInPlace: { "@id": HOTEL_ID },
    offers: {
      "@type": "Offer",
      price: room.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function blogPostSchema(blog, slug) {
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.meta_description || blog.short_desc,
    image: blog.featured_image ? [blog.featured_image] : undefined,
    mainEntityOfPage: url,
    datePublished: blog.published_at || blog.created_at || undefined,
    dateModified: blog.updated_at || blog.published_at || blog.created_at || undefined,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
