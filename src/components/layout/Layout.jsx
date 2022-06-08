import React from 'react'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'
import {Categories} from '../Categories';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Categories />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout