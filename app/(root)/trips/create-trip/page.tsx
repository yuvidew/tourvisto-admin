import React from 'react'
import { Header } from '../../_components/Header'
import { CreateTripForm } from './_components/CreateTripForm'

const CreateTripPage = () => {
    return (
        <main className=' h-screen w-full overflow-y-auto py-[32px] px-[54px] flex flex-col gap-10 pb-20 bg-neutral-50 dark:bg-neutral-900'>
            {/* start to header */}
            <Header/>
            {/* end to header */}

            {/* start to form section */}
            <section className=' flex items-center justify-center'>
                <CreateTripForm/>
            </section>
            {/* end to form section */}
        </main>
    )
}

export default CreateTripPage