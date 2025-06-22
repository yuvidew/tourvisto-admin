"use client";

import { MobileSideBar } from '@/components/MobileSideBar';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const DashboardHeader = () => {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [mounted, setMounted] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("tourvisto-admin-users");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                console.log(e);
                setUser(null);
            }
        }
    }, []);

    const greeting = mounted ? `Welcome ${user?.name || ""} 👋` : "Welcome 👋";
    return (
        <div className=' flex lg:items-center justify-between w-full'>
            <div className=' flex flex-col gap-2'>
                <h2 className=' font-semibold text-[24px] text-[#1F1F36]  dark:text-white'>{greeting}</h2>
                <p className=' font-normal text-[#7F7E83] dark:text-neutral-100 text-[18px]'>Track activity, trends, and popular destinations in real time</p>
            </div>
            <div className=' flex gap-[8px]'>
                <Button 
                    size={!isDesktop ? "default" :"icon"} 
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

                <MobileSideBar/>
            </div>
        </div>
    )
}
