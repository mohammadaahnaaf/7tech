import React from 'react'
import Footer from '../shared/Footer'
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
            <Footer />
        </>
    )
}

export default Layout