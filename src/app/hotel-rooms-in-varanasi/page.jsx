import RoomsListPage from "./RoomList";
import { buildMetadata } from "@/utils/metadata";
export const metadata = buildMetadata({
  title: "Luxury Hotel Rooms in Varanasi",
  description:
    "Discover luxury hotel rooms in Varanasi offering modern amenities, spacious interiors, and a prime location near major attractions for a comfortable stay.",
  path: "/hotel-rooms-in-varanasi",
  image: "/assets/dev-img/room/suite-room.jpg",
});
export default function Page() {
  return <RoomsListPage />;
}
