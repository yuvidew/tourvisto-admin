"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MobileSideBar } from '@/components/MobileSideBar';

export const TripsPageHeader = () => {
    const router = useRouter()
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <div className=' flex items-center justify-between w-full'>
            <div className=' flex flex-col gap-2'>
                <h2 className=' font-semibold text-[24px] text-[#1F1F36] dark:text-white'>
                    Trips
                </h2>
                <p className=' font-normal text-[#7F7E83] dark:text-neutral-100 text-[18px]'>
                    View and edit AI-generated travel plans
                </p>
            </div>
            <div className=' flex gap-[8px]'>
                <Button size={!isDesktop ? "default" :"icon"} onClick={() => router.replace("/trips/create-trip")} className=' w-[233px]'>
                    <Image
                        src={"/assets/icons/plus.svg"}
                        alt='plus'
                        width={200}
                        height={200}
                        className=' size-5'
                    />
                    <h2 className=' text-[16px] font-semibold'>Create a trip</h2>
                </Button>

                <MobileSideBar/>
            </div>
        </div>
    )
}
