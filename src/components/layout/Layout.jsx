import React from 'react'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'

function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout