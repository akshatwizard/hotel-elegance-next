"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export default function Breadcrumb({
    title,
    heading,
    backgroundImage = "/assets/img/banner/banner.jpg",
    mobileBackgroundImage = "/assets/img/banner/banner.jpg",
    subtitle = ""
}) {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const imageToUse = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage;
    return (
        <section className="section-breadcrumb padding-b-50">
            <JsonLd data={breadcrumbSchema(pathname, title)} />
            <div
                className="rx-breadcrumb-image"
                style={{ 
                    backgroundImage: `url('${imageToUse}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? 'center' : 'center'
                }}
            >
                <div className="rx-breadcrumb-overlay" />
                <div className="inner-breadcrumb-contact sub_header_content">
                    <div className="main-breadcrumb-contact">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="rx-banner-contact">
                                        <h1>{heading || title}</h1>
                                        {subtitle && <p className="mt-2">{subtitle}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}