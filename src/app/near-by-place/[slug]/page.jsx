import { API_BASE, REVALIDATE_SECONDS } from "@/lib/config";
import React from 'react';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata';
import 'aos/dist/aos.css';
import NearByPlaceDetailsPage from './NearByPlaceDetailsPage';

async function getNearByPlaceDetails(slug) {
    try {
        const res = await fetch(
            `${API_BASE}/near-by-pace-list/${slug}`,
            {
                next: { revalidate: REVALIDATE_SECONDS },
            }
        );
        if (res.status === 404) return { status: false };
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        // Backend unreachable: throw so the response is a retryable error,
        // not an indexable "not found" page.
        console.error('Error fetching data:', error.message);
        throw error;
    }
}
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const data = await getNearByPlaceDetails(slug);
    if (!data?.status) {
      return { title: "Place Not Found | The Elegance Hotel", robots: { index: false } };
    }
    return buildMetadata({
      title: data.data.meta_title || data.data.title,
      description: data.data.meta_description || data.data.short_desc,
      path: `/near-by-place/${slug}`,
      image: data.data.image_url || undefined,
    });

  } catch (error) {
    return {
      title: "Nearby Place - Hotel Elegance",
      description: "Explore nearby places from Hotel Elegance",
    };
  }
}

export default async function page({ params }) {
    const { slug } = await params;
    const placeData = await getNearByPlaceDetails(slug);
    if (!placeData?.status) notFound();
    return <NearByPlaceDetailsPage initialData={placeData} />;
}
