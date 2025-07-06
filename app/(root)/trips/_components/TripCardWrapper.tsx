"use client";

import { PaginationButton } from '@/components/PaginationButton';
import { TripCard } from '@/components/TripCard'
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTrips } from '@/hooks/useGetTrips';

import React, { useState } from 'react'

export const TripCardWrapper = () => {
  const {allTrips , loading} = useGetTrips();
  const [currentPage , setCurrentPage] = useState(1);

  const itemPerPage = 8;

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const currentTrips = allTrips.slice(startIndex, endIndex);

  return (
    <div className=' flex flex-col gap-[12px]'>
      {/* start to show all trip cards  */}
      <section className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3  '>
        {loading  && Array(5).fill(null).map((_, i) => (
          <Skeleton key={i} className=' h-[22rem]' />
        ))}

        {!loading && allTrips.length === 0 && (
          <h2 className=' text-md text-[#7F7E83]'>All trips is empty</h2>
        )}

        {!loading && allTrips.length > 0 && currentTrips.map((item , i) => (
          <TripCard 
            key={i} 
            imageUrl={item?.images?.split(',').map((img: string) => img.trim()) || []}
            id = {item.id}
            result={item.result}
          /> 
        ))}

      </section>
      {/* end to show all trip cards  */}

      {/* start to pagination */}
      <PaginationButton
        totalPages={Math.ceil(allTrips.length/8)}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {/* end to pagination */}
    </div>
  )
}
