import RestaurantPage from "./RestaurantPage";
import { buildMetadata } from "@/utils/metadata";
export const metadata = buildMetadata({
  title: "Budget Family Restaurant in Varanasi",
  description:
    "Searching for a budget restaurant in Varanasi? Enjoy tasty food, warm ambience, and great service at The Elegance—perfect for families & friends.",
  path: "/budget-restaurant-varanasi",
});
export default function Page() {
  return <RestaurantPage />;
}
