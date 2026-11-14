import { notFound } from "next/navigation";
import RoomDetailPage from "./RoomsDeails";
import { getRoomBySlug, roomsData } from "@/data/roomsData";

export const dynamicParams = false; // unknown room slugs return a real 404

export function generateStaticParams() {
  return roomsData.rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) {
    return { title: "Room not found | The Elegance Hotel" };
  }
  return {
    title: room.meta_title,
    description:
      room.meta_desc || `Book ${room.title} at The Elegance Hotel, Varanasi`,
    alternates: {
      canonical: `https://www.theelegance.co.in/hotel-rooms-in-varanasi/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!getRoomBySlug(slug)) notFound();
  return <RoomDetailPage />;
}
