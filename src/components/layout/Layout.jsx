import React from 'react'
import { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'
import { CategoryBar } from '../client/Categories';
import { CartProvider } from 'react-use-cart';

function Layout({ children, setSearchTerm }) {

    return (
        <CartProvider>
            <Navbar setSearchTerm={setSearchTerm} />
            <CategoryBar />
            <div className='border-b-2 border-t-2 border-red-600'>
                {children}
            </div>
            <Footers />
        </CartProvider>
    )
}

export default Layout