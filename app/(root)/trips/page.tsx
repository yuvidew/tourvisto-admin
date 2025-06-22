import React from 'react'
import { Header } from '../_components/Header'
import { TripCardWrapper } from './_components/TripCardWrapper'

const TripsPage = () => {
    return (
        <main className=' h-screen w-full flex flex-col gap-[38px] overflow-y-auto py-[32px] px-[54px] bg-neutral-50 dark:bg-neutral-900'>
            {/* start to header */}
            <Header/>
            {/* end to header */}

            {/* start all trips cards  */}
            <TripCardWrapper/>
            {/* end all trips cards  */}
        </main>
    )
}

export default TripsPage