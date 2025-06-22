"use client";

import { calculateTrendPercentage, cn } from '@/lib/utils';
import { StaticCardProps } from '@/types/type'
import React, { JSX } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

/**
 * StaticCard component displays a summary card with statistics and trend comparison.
 *
 * @param {Object} props - Component props
 * @param {string} props.headerTitle - Title displayed in the card header
 * @param {number | string} props.total - Total value to display (e.g., total users, sales)
 * @param {number} props.currentMonth - Current month's value for trend comparison
 * @param {number} props.lastMonth - Last month's value for trend comparison
 *
 * @returns {JSX.Element} The rendered static summary card component
 */

export const StaticCard = ({
    headerTitle,
    total,
    currentMonth,
    lastMonth
}: StaticCardProps) : JSX.Element => {

    const { trend, percentage } = calculateTrendPercentage(currentMonth, lastMonth);

    const isDecrement = trend === "decrement";

    return (
        <Card>
            <CardHeader>
                <CardTitle className=' text-[#2E2C48] text-base font-medium'>{headerTitle}</CardTitle>
            </CardHeader>
            <div className=' flex items-start gap-[16px]'>
                <CardContent className=' flex flex-row w-full justify-between gap-4'>
                    <div className='flex flex-col gap-4'>

                    <h2 className=' text-4xl font-semibold'>{total}</h2>

                    <div className='flex items-center  gap-2'>
                        <figure className=' flex items-center gap-4'>
                            <Image
                                src={`/assets/icons/${isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
                                alt={"arrow"}
                                width={300}
                                height={300}
                                className='size-4'
                            />
                        </figure>

                        <figcaption className={cn("text-sm font-medium" , isDecrement ? "text-red-500" : "text-green-600")}>
                            {Math.round(percentage)}%
                        </figcaption>
                        <p className='text-sm font-medium text-gray-400 truncate'>vs last month</p>
                    </div>
                    </div>

                    <Image
                        src={`/assets/icons/${isDecrement ? "decrement.svg" : "increment.svg"}`}
                        alt={headerTitle}
                        width={300}
                        height={300}
                        className='size-24'
                    />
                </CardContent>
            </div>
        </Card>
    )
}
