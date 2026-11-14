import { buildMetadata } from "@/utils/metadata";
export const metadata = buildMetadata({
  title: "Hotel Room Tariff in Varanasi",
  description:
    "Check hotel room tariffs in Varanasi at The Elegance. Affordable pricing, premium comfort, and great value for business and leisure stays.",
  path: "/tariff",
});

export default function TariffLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}