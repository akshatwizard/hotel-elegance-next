import RoomsListPage from "./RoomList";
import { buildMetadata } from "@/utils/metadata";
import SeoGuide from "@/components/SeoGuide/SeoGuide";
import { roomsGuide } from "@/data/seoContent";
export const metadata = buildMetadata({
  title: "3 Star Hotel Rooms in Varanasi near Railway Station",
  description:
    "3-star hotel near Banaras Railway Station and BHU. 27 AC rooms from ₹5,000 a night with breakfast included: Standard, Premium (twin) and Suite rooms.",
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
