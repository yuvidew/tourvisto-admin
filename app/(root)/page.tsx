import React from 'react'
import { Header } from './_components/Header'
import { StaticCard } from './_components/StaticCard'
import { TripsList } from './_components/TripsList'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const Dashboard = () => {
    const dashboardStats = {
        totalUsers : 12450,
        usersJoined : {
            currentMonth: 150,
            lastMonth: 120,
        },
        totalTrips : 3210,
        tripsCreated : {
            currentMonth: 45,
            lastMonth: 30,
        },
        userRole : {
            total : 62 , 
            currentMonth: 25,
            lastMonths : 25
        }
    }
    return (
        <main className=' h-screen w-full overflow-y-auto py-[32px] px-[54px] bg-neutral-50'>
            {/* start to header */}
            <Header/>
            {/* end to header */}

            <div className=' flex flex-col gap-[24px]'>
                {/* start to stats card */}
                <section className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px] mt-[32px]'>
                    <StaticCard
                        headerTitle = "Total Users"
                        total = {dashboardStats.totalUsers}
                        currentMonth = {dashboardStats.usersJoined.currentMonth}
                        lastMonth = {dashboardStats.usersJoined.lastMonth}
                    />
                    <StaticCard
                        headerTitle = "Total Trips"
                        total = {dashboardStats.totalTrips}
                        currentMonth = {dashboardStats.tripsCreated.currentMonth}
                        lastMonth = {dashboardStats.tripsCreated.lastMonth}
                    />
                    <StaticCard
                        headerTitle = "Active Users Today"
                        total = {dashboardStats.userRole.total}
                        currentMonth = {dashboardStats.userRole.currentMonth}
                        lastMonth = {dashboardStats.userRole.lastMonths}
                    />
                </section>
                {/* end to stats card */}

                {/* start to trips card */}
                <div className=' flex flex-col gap-[16px]'>
                    <h2 className='text-[#1F1F36] text-[20px] font-semibold'>Trips</h2>
                    <TripsList/>
                </div>
                {/* end to trips card */}

                {/* start to latest sign up and booked trips */}
                <div className=' flex gap-[16px]'>
                    <Card className='w-full'>
                        <CardHeader>
                            <div className='border-b-[2px] border-[#E5E5EF] py-3'>
                                <CardTitle>Latest user signups</CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className='w-full'>
                        <CardHeader>
                            <div className='border-b-[2px] border-[#E5E5EF] py-3'>
                                <CardTitle>Latest trip bookings</CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                {/* end to latest sign up and booked trips */}
            </div>
        </main>
    )
}

export default Dashboard