import React from 'react'
import { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'
import { CategoryBar } from '../client/Categories';
import { CartProvider } from 'react-use-cart';

function Layout({ children, setSearchTerm }) {

    return (
        <>
            <Navbar setSearchTerm={setSearchTerm} />
            <CategoryBar />
            <div>
                {children}
            </div>
            <Footers />
        </>
    )
}

export default Layout