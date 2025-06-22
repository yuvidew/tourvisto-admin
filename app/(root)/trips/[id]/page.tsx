import React from 'react'
import { Header } from '../../_components/Header'
import { TripDetails } from './_components/TripDetails';

const TripsDetailsPage = () => {
    return (
        <main className=' h-screen w-full overflow-y-auto py-[32px] px-[54px] flex flex-col gap-10 pb-20 bg-neutral-50 dark:bg-neutral-900 '>
            {/* start header */}
            <Header />
            {/* end header */}
            <TripDetails />
        </main>
    )
}

export default TripsDetailsPage
