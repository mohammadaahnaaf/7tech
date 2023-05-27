import React from 'react'
import { Footers, Navbar } from '@seventech/shared'
import { CategoryBar, NewCatBar } from '@seventech/client'

export function Layout({ children, setSearchTerm }) {

    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Navbar setOpen={setOpen} setSearchTerm={setSearchTerm} />
            {/* <CategoryBar open={open} setOpen={setOpen} /> */}
            <NewCatBar open={open} setOpen={setOpen} />
            <div>
                {children}
            </div>
            <Footers />
        </>
    )
}