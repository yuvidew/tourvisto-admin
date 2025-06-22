"use client";

import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { UserPageHeader } from './UserPageHeader';
import { TripsPageHeader } from './TripsPageHeader';
import { usePathname } from 'next/navigation';
import { CreateTripHeader } from './CreateTripHeader';
import { TripDetailsHeader } from './TripDetailsHeader';

const headerComp = (path: string) => {
    if (path === "/") return <DashboardHeader />;
    if (path === "/users") return <UserPageHeader />;
    if (path === "/trips") return <TripsPageHeader />;
    if (path === "/trips/create-trip") return <CreateTripHeader />;
    if (/^\/trips\/[^\/]+$/.test(path)) return <TripDetailsHeader />;
}

export const Header = () => {
    const path = usePathname();
    return (
        <header className=' flex items-center justify-between w-full'>
            {headerComp(path)}
        </header>
    )
}
