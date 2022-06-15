import React from 'react'
import Footer, { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'
import { CategoryBar } from '../Categories';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <CategoryBar />
            <main>
                {children}
            </main>
            {/* <Footer /> */}
            <Footers />
        </>
    )
}

export default Layout