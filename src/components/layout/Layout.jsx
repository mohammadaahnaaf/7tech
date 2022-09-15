import React from 'react'
import { CategoryBar } from '../client/categories/CategoryBar'
import { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'

function Layout({ children, setSearchTerm }) {

    return (
        <>
            <Navbar setSearchTerm={setSearchTerm} />
            <CategoryBar />
            <div className='border-0 border-red-600'>
                {children}
            </div>
            <Footers />
        </>
    )
}

export default Layout