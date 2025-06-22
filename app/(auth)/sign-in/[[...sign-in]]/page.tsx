

import Image from 'next/image'
import React from 'react'
import { ModeToggle } from '@/components/ModeToggle'
import { SignInForm } from '../../_components/SignInFrom'

const SignInPage = () => {

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <div className=' flex items-center w-full gap-2'>
                        <div className="bg-transparent text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <Image
                                src={"/assets/icons/logo.svg"}
                                alt='logo'
                                width={200}
                                height={200}
                                className='size-12 object-contain'
                            />
                        </div>
                        <p className=' text-xl font-medium'>
                            Tourvisto
                        </p>
                    </div>
                    <ModeToggle/>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignInForm/>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/assets/images/auth-img.webp"
                    alt="Image"
                    width={1000}
                    height={1000}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    )
}

export default SignInPage
