import { buildMetadata } from "@/utils/metadata";
import { API_BASE, REVALIDATE_SECONDS } from "@/lib/config";
import React from 'react';
import AlbumGallery from './AlbumGallery';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

async function getAlbumGallery(albumId = null) {
    try {
        let url = API_BASE + '/album-gallery';
        let fetchOptions = { next: { revalidate: REVALIDATE_SECONDS } };
        if (albumId) {
            url += `?album_id=${albumId}`;
        }
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
            throw new Error(`Failed to fetch gallery data: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return null;
    }
}

export async function generateMetadata({ searchParams }) {
    const base = {
        title: 'Photo Gallery - Rooms, Dining & Events',
        description: 'Take a visual tour of The Elegance Varanasi. View hotel rooms, restaurant, banquet halls, and event spaces that define comfort and style.',
        path: '/gallery',
    };
    try {
        const params = await searchParams;
        const data = await getAlbumGallery(params?.album_id || null);
        if (!data?.status || !data?.data?.selected_album) return buildMetadata(base);
        return buildMetadata({
            ...base,
            title: `${data.data.selected_album.title} Gallery`,
            description: `Browse ${data.data.total_images} images from our ${data.data.selected_album.title} gallery at The Elegance Varanasi.`,
        });
    } catch (error) {
        return buildMetadata(base);
    }
}

export default async function GalleryPage({ searchParams }) {
    const params = await searchParams;
    const albumId = params?.album_id || null;
    const galleryData = await getAlbumGallery(albumId);

    return (
        <>
            <Breadcrumb
                title="Gallery"
                backgroundImage="/assets/dev-img/bread-banner/elegance-best-hotel-varanasi.jpeg"
                mobileBackgroundImage="/assets/dev-img/bread-banner/mobile/Gallery.jpg"
                subtitle=""
            />
            <AlbumGallery
                initialData={galleryData}
                currentAlbumId={albumId}
            />
        </>
    );
}