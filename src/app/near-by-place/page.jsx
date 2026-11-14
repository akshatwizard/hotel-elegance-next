import NearByPlaceWrapper from './NearByPlaceWrapper';
import { buildMetadata } from "@/utils/metadata";
export const metadata = buildMetadata({
    title: "Places to Visit Near Our Varanasi Hotel",
    description:
        "Explore popular nearby places to visit in Varanasi including temples, ghats, and attractions located close to our hotel for easy sightseeing.",
    path: "/near-by-place",
});
export default function page({ initialNearByPlace }) {
    return (
        <>
            <NearByPlaceWrapper />
        </>
    );
}