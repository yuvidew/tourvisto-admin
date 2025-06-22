import React, { ReactNode } from 'react';
import { SideBar } from './_components/SideBar';

export default function DashboardLayout ({children} : {children : ReactNode}){
    return (
        <main className=' flex items-start'>
            <div className='lg:flex hidden'>
                <SideBar/>
            </div>
            {children}
        </main>
    )
}
