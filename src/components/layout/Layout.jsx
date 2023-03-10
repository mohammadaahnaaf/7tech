import React from 'react'
import { Footers, Navbar } from '@seventech/shared'
import { CategoryBar } from '@seventech/client'
import { Transition } from '@headlessui/react'

export function Layout({ children, setSearchTerm }) {

    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Navbar setOpen={setOpen} setSearchTerm={setSearchTerm} />
            <CategoryBar open={open} setOpen={setOpen} />
            <div className='border-0 border-red-600'>
                {children}
            </div>
            <Footers />
            <video className='opacity-20 z-40' id='background-video' width="2900" height="240" loop autoPlay>
                <source src="/Qaramadi.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>

        </>
    )
}