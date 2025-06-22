"use client";
import { MobileSideBar } from '@/components/MobileSideBar';
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

export const TripDetailsHeader = () => {
    const router = useRouter();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    return (
        <div className=' flex items-center justify-between w-full'>
            <div className=' flex items-center gap-2'>
                <Button onClick={() => router.replace("/trips")} variant={"outline"} size={"icon"} >
                    <ChevronLeft />
                </Button>


            </div>
            <div className=' flex gap-[8px]'>
                <Button
                    size={!isDesktop ? "default" : "icon"}
                    className=' lg:w-[233px] '
                    onClick={() => router.replace("/trips/create-trip")}
                >
                    <Image
                        src={"/assets/icons/plus.svg"}
                        alt='plus'
                        width={200}
                        height={200}
                        className=' size-5'
                    />
                    <h2 className=' text-[16px] font-semibold lg:flex hidden'>Create a trip</h2>
                </Button>

                <MobileSideBar />
            </div>
        </div>
    )
}
