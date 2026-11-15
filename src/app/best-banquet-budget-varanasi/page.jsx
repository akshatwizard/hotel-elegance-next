import { buildMetadata } from "@/utils/metadata";
import { API_BASE, REVALIDATE_SECONDS } from "@/lib/config";
import React from 'react';
import OnexBanquet from './OnexBanquet'; 
import SapphireBanquet from './SapphireBanquet'; 
import AssociatedBanquetHall from './AssociatedBanquetHall';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import SeoGuide from '@/components/SeoGuide/SeoGuide';
import { banquetGuide } from '@/data/seoContent';
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
    title: 'Banquet Hall in Varanasi near BHU & DLW for Weddings',
    description: 'Indoor AC banquet halls in Varanasi for 300 to 500 guests, near BHU and Banaras Railway Station. Veg and non-veg menus, décor options, DJ, parking and rooms for guests.',
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
                title="Banquets" heading="Banquet Halls in Varanasi near BHU & DLW" 
                backgroundImage="/assets/dev-img/bread-banner/Banquet.jpg"
                mobileBackgroundImage="/assets/dev-img/bread-banner/mobile/Banquets.jpg"
                subtitle=""
            />
            
            {/* Pass fetched data as props */}
            <OnexBanquet onexData={onexData} />
            <SapphireBanquet sapphireData={sapphireData} />
            <AssociatedBanquetHall />
            <SeoGuide content={banquetGuide} />
        </>
    );
}