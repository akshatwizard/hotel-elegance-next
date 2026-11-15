import Banner from "@/components/Banner/Banner";
import JsonLd from "@/components/JsonLd";
import { hotelSchema } from "@/lib/seo";
import { buildMetadata } from "@/utils/metadata";
import { HomeAboutUs } from "@/components/HomeAboutUs/HomeAboutUs";
import { OurBestServices } from "@/components/OurBestServices/OurBestServices";
import { AccommodationDining } from "@/components/AccommodationDining/AccommodationDining";
import { BestRoom } from "@/components/Rooms/BestRooms/BestRoom";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { NearByPlace } from "@/components/NearByPlace/NearByPlace";
import { PositionedUnique } from "@/components/PositionedUnique/PositionedUnique";
import { NearbyByAttraction } from "@/components/NearbyByAttraction/NearbyByAttraction";
import { Flyers } from "@/components/Flyers/Flyers";
import { Suspense } from "react";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import NearByPlaceWrapper from "@/components/NearByPlace/NearByPlaceWrapper";
import NearByAttractionWrapper from "@/components/NearbyByAttraction/NearByAttractionWrapper";
import FlyersWrapper from "@/components/Flyers/FlyersWrapper";
import TestimonialsWrapper from "@/components/Testimonials/TestimonialsWrapper";
import HomeBlogWrapper from "@/components/HomeBlog/HomeBlogWrapper";
import OtherHotelsSection from "@/components/OtherHotelsSection/OtherHotelsSection";
export const metadata = {
  ...buildMetadata({
    title: "Best Hotel in Varanasi near Railway Station | The Elegance",
    description:
      "The Elegance is a 3-star boutique hotel in Varanasi near Banaras Railway Station and BHU, with 27 AC rooms, breakfast included, a rooftop restaurant and banquet halls.",
    path: "/",
  }),
  title: { absolute: "Best Hotel in Varanasi near Railway Station | The Elegance" },
};
export default function Home() {
  return (
    <>
      <JsonLd data={hotelSchema()} />
      <Suspense fallback="loading">
        <BannerWrapper /> 
      </Suspense> 
      <OtherHotelsSection/>     
      <HomeAboutUs />
      <OurBestServices/>
      <AccommodationDining/>
      <BestRoom/>
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <TestimonialsWrapper/>
      </Suspense>
      <Suspense fallback={<div>Loading Nearby Places...</div>}>
        <NearByPlaceWrapper/>
      </Suspense>
      <PositionedUnique/>
      <Suspense fallback={<div>Loading Nearby Attractions...</div>}>
        <NearByAttractionWrapper/>
      </Suspense> 
           
      <Suspense fallback={<div>Loading Blog...</div>}>
        <HomeBlogWrapper/>
      </Suspense>
      <Suspense fallback={<div>Loading Flyers...</div>}>
        <FlyersWrapper/>
      </Suspense>

    </>
  );
}
