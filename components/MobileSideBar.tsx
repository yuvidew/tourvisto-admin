"use client";
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { SideBar } from '@/app/(root)/_components/SideBar'

export const MobileSideBar = () => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div className=' lg:hidden '>
            <Button variant={"outline"} size={"icon"} onClick={() => setIsShow((prev) => !prev)}>
                <Menu />
            </Button>
            {isShow && (
                <div className=' absolute top-0 left-0 bg-white'>
                    <SideBar />
                </div>
            )}
        </div>
    )
}
