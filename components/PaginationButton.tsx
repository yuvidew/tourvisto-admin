"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PaginationProps } from '@/types/type';

export const PaginationButton = ({
    currentPage,
    totalPages,
    onPageChange
} : PaginationProps) => {

    const maxVisiblePages = 4;

    const startPage = Math.max(
        1 ,
        Math.min(currentPage - Math.floor(maxVisiblePages / 2) , totalPages - maxVisiblePages + 1)
    )



    const pages = Array.from({ length: Math.min(maxVisiblePages , totalPages) }, (_, i) => startPage + i);
    return (
        <div className=' flex items-center py-[16px] justify-between'>
            <Button 
                variant={"outline"} 
                className=' flex items-center gap-[4px]'
                disabled = {currentPage === 1}
                onClick={() => {
                    if(currentPage > 1)
                        onPageChange(currentPage - 1)
                }}
            >
                <ArrowLeft />
                Previous
            </Button>
            <div className=' flex items-center justify-center gap-[2px]'>
                {pages.map((item) => (
                    <Button 
                        key={item} 
                        size={"icon"} 
                        variant={item === currentPage ? "default" : "outline"}
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            <Button 
                variant={"outline"} 
                className=' flex items-center gap-[4px]'
                disabled = {currentPage === totalPages}
                onClick={() => {
                    if(currentPage < totalPages)
                        onPageChange(currentPage + 1)
                }}
            >
                Next
                <ArrowRight />
            </Button>
        </div>
    )
}
