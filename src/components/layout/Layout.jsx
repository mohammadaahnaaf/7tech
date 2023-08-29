import React from 'react'
import { Footers, Navbar } from '@seventech/shared'
import { NewCatBar } from '@seventech/client'
import { isServer } from '@seventech/utils/isServer'

export function Layout({ children, setSearchTerm }) {

    const [open, setOpen] = React.useState(false)
    const [view, setView] = React.useState(false)

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <>
            <Navbar setOpen={setOpen} setSearchTerm={setSearchTerm} />
            {/* <CategoryBar open={open} setOpen={setOpen} /> */}
            <NewCatBar open={open} setOpen={setOpen} />
            <div>
                {children}
            </div>
            <Footers />
        </>
    ) : null
}