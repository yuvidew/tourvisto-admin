"use client";

import { TripCard } from '@/components/TripCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTrips } from '@/hooks/useGetTrips';
import React from 'react'

export const TripsList = () => {
    const { allTrips, loading } = useGetTrips();
    return (
        <section className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 '>
            {loading && Array(5).fill(null).map((_, i) => (
                <Skeleton key={i} className=' h-[22rem]' />
            ))}

            {!loading && allTrips.length === 0 && (
                <h2 className=' text-md text-[#7F7E83]'>All trips is empty</h2>
            )}

            {!loading && allTrips.length > 0 && allTrips.slice(0, 4).map((item, i) => (
                <TripCard
                    key={i}
                    imageUrl={item?.images?.split(',').map((img: string) => img.trim()) || []}
                    id={item.id}
                    result={item.result}
                />
            ))}

        </section>
    )
}
