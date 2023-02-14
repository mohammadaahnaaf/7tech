import React from 'react'
import { CategoryBar } from '../client/categories/CategoryBar'
import { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'

function Layout({ children, setSearchTerm }) {

    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Navbar setOpen={setOpen} setSearchTerm={setSearchTerm} />
            <CategoryBar open={open} setOpen={setOpen} />
            <div className='border-0 border-red-600'>
                {children}
            </div>
            <Footers />
        </>
    )
}

export default Layout