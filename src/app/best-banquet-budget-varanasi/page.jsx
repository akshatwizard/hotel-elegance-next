import { buildMetadata } from "@/utils/metadata";
import { API_BASE, REVALIDATE_SECONDS } from "@/lib/config";
import React from 'react';
import OnexBanquet from './OnexBanquet'; 
import SapphireBanquet from './SapphireBanquet'; 
import AssociatedBanquetHall from './AssociatedBanquetHall';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
async function getOnexBanquetData() {
    try {
        const res = await fetch(
            API_BASE + '/banquets/onex-banquet',
            {
                next: { revalidate: REVALIDATE_SECONDS },
            }
        ); 
        if (!res.ok) {
            throw new Error(`Failed to fetch Onex Banquet data: ${res.status}`);
        }        
        return await res.json();
    } catch (error) {
        console.error('Error fetching Onex Banquet:', error);
        return null;
    }
}

async function getSapphireBanquetData() {
    try {
        const res = await fetch(
            API_BASE + '/banquets/sapphire-banquet',
            {
                next: { revalidate: REVALIDATE_SECONDS },
            }
        );
        
        if (!res.ok) {
            throw new Error(`Failed to fetch Sapphire Banquet data: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error fetching Sapphire Banquet:', error);
        return null;
    }
}
export const metadata = buildMetadata({
    title: 'Budget Banquet Hall in Varanasi',
    description: 'Find the best budget banquet hall in Varanasi for weddings, parties, and corporate events with spacious halls, great service, and elegant décor.',
    path: '/best-banquet-budget-varanasi',
});


export default async function BanquetsPage() {
    const [onexData, sapphireData] = await Promise.all([
        getOnexBanquetData(),
        getSapphireBanquetData(),
    ]);  
    return (
        <>
            <Breadcrumb 
                title="Banquets" heading="Budget Banquet Halls in Varanasi" 
                backgroundImage="/assets/dev-img/bread-banner/Banquet.jpg"
                mobileBackgroundImage="/assets/dev-img/bread-banner/mobile/Banquets.jpg"
                subtitle=""
            />
            
            {/* Pass fetched data as props */}
            <OnexBanquet onexData={onexData} />
            <SapphireBanquet sapphireData={sapphireData} />
            <AssociatedBanquetHall />
        </>
    );
}