import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { roomSchema } from "@/lib/seo";
import { buildMetadata } from "@/utils/metadata";
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
  return buildMetadata({
    title: room.meta_title,
    description:
      room.meta_desc || `Book ${room.title} at The Elegance Hotel, Varanasi`,
    path: `/hotel-rooms-in-varanasi/${slug}`,
    image: room.image,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();
  return (
    <>
      <JsonLd data={roomSchema(room, slug)} />
      <RoomDetailPage />
    </>
  );
}
