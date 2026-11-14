import JsonLd from "@/components/JsonLd";
import { hotelSchema } from "@/lib/seo";
import { buildMetadata } from "@/utils/metadata";

export const metadata = buildMetadata({
  title: "Contact & Location in Varanasi",
  description:
    "Contact The Elegance Hotel in Varanasi - address near Banaras Railway Station, phone numbers, email and a map to plan your stay or event.",
  path: "/contact",
});

export default function ContactUsLayout({ children }) {
  return (
    <>
      <JsonLd data={hotelSchema()} />
      {children}
    </>
  );
}
