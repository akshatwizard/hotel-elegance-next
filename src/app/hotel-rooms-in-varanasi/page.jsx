import RoomsListPage from "./RoomList";
import { buildMetadata } from "@/utils/metadata";
import SeoGuide from "@/components/SeoGuide/SeoGuide";
import { roomsGuide } from "@/data/seoContent";
export const metadata = buildMetadata({
  title: "Hotel Rooms in Varanasi near Banaras Railway Station",
  description:
    "27 AC rooms near Banaras Railway Station and BHU, from ₹5,000 a night with breakfast included. Standard, Premium and Suite rooms at The Elegance, Varanasi.",
  path: "/hotel-rooms-in-varanasi",
  image: "/assets/dev-img/room/suite-room.jpg",
});
export default function Page() {
  return (
    <>
      <RoomsListPage />
      <SeoGuide content={roomsGuide} />
    </>
  );
}
