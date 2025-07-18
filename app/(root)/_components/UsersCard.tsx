import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'


export const UsersSignUpCard = () => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='border-b-[2px] border-[#E5E5EF] py-3'>
                    <CardTitle className=' text-[#1F1F36] font-semibold text-[20px]'>Latest user signups</CardTitle>
                </div>
            </CardHeader>
            <CardContent className=' flex flex-col gap-2'>
                {/* start to table label */}
                <div className=' flex items-center h-[54px]'>
                    <div className=' flex items-center w-[65%] h-full'>
                        <h2 className=' text-neutral-700 uppercase text-[12px]'>Name</h2>
                    </div>
                    <div className=' flex items-center  w-[35%] h-full'>
                        <h2 className=' text-neutral-700 uppercase text-[12px]'>Itinerary Created</h2>
                    </div>
                </div>
                {/* end to table label */}

                {/* start to table list */}
                <div className=' flex items-center h-[65px]'>
                    <div className=' flex items-center gap-[12px] w-[65%] h-full'>
                        <Image 
                            src = {"/assets/images/man.png"}
                            width={200}
                            height={200}
                            alt='user image'
                            className=' w-10 h-10 object-cover rounded-full'
                        />

                        <h3 className=' font-semibold text-[#1F1F36] text-[14px]'>
                            James Anderson
                        </h3>
                    </div>
                    <div className=' flex items-center  w-[35%] h-full'>
                        <h2 className=' text-neutral-700 uppercase font-normal text-[14px]'>12</h2>
                    </div>
                </div>
                {/* end to table list */}

            </CardContent>
        </Card>
    )
}
