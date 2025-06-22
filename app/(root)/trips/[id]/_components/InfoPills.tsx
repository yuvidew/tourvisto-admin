import Image from 'next/image'
import React from 'react'

export const InfoPills = (
    {
        text,
        imageSrc,
    } :  {
        text : string,
        imageSrc: string,
    }
) => {
    return (
        <div className=' flex items-center gap-[6px]'>
            <Image
                src={imageSrc}
                alt={`${text} icon`}
                width={100}
                height={100}
                className=' w-[20px] h-[20px]'
            />
            <p className=' text-[#7F7E83] font-normal text-[18px]'>
                {text}
            </p>
        </div>
    )
}
