"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { IAd } from '@/types/IAd';
import { recordClick, recordImpression } from '@/services/adService';
import { useRecaptchaToken } from '@/hooks/use-recaptcha-ready';

interface AdBannerProps {
    ads: IAd[];
    className?: string;
}

export default function AdBanner({ ads, className = '' }: AdBannerProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recordedImpressions, setRecordedImpressions] = useState<Set<string>>(new Set());
    const { getToken } = useRecaptchaToken();

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);



    // Flatten all banner URLs from all ads
    const allBanners = ads.flatMap(ad =>
        ad.bannerUrls.map(url => ({
            url,
            targetUrl: ad.targetUrl,
            title: ad.title,
            adId: ad.id
        }))
    );

    useEffect(() => {
        if (allBanners.length === 0) return;

        const currentBanner = allBanners[selectedIndex];
        if (!currentBanner) return;

        // Check if impression already recorded for this ad
        const impressionKey = `ad_impression_${currentBanner.adId}`;
        const alreadyRecorded = sessionStorage.getItem(impressionKey);

        if (!alreadyRecorded && !recordedImpressions.has(currentBanner.adId)) {
            const recordImpressions = async () => {
                try {
                    const token = await getToken('ad_impression');
                    if (token) {
                        await recordImpression(currentBanner.adId, token);
                        // Mark as recorded in both state and sessionStorage
                        setRecordedImpressions(prev => new Set(prev).add(currentBanner.adId));
                        sessionStorage.setItem(impressionKey, 'true');
                    }
                } catch (error) {
                    console.error('Error recording impression:', error);
                }
            };
            recordImpressions();
        }
    }, [selectedIndex, allBanners, getToken, recordedImpressions]);
    // Track impression for currently visible banner

    if (allBanners.length === 0) {
        return null;
    }

    const handleAdClick = async (adId: string, targetUrl: string) => {
        try {
            const token = await getToken('ad_click');
            if (token) {
                await recordClick(adId, token);
            } else {
                console.warn('Failed to get reCAPTCHA token');
            }
        } catch (error) {
            console.error('Error recording click:', error);
        }

        // Open target URL
        if (targetUrl) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
    };




    return (
        <div className={`max-w-7xl rounded-xs sm:rounded-md mb-4 h-32 md:h-45 overflow-hidden sm:mt-2 relative ${className}`}>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container flex">
                    {allBanners.map((banner, index) => (
                        <div
                            key={`${banner.adId}-${index}`}
                            className="embla__slide flex-[0_0_100%] min-w-0 relative h-32 md:h-45"
                        >
                            <div
                                className="relative w-full h-full cursor-pointer"
                                onClick={() => handleAdClick(banner.adId, banner.targetUrl)}
                            >
                                <Image
                                    src={banner.url}
                                    fill
                                    alt={banner.title}
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots indicator */}
            {allBanners.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {allBanners.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex
                                ? 'bg-white w-6'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
