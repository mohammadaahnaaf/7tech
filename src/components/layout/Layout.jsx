import React from 'react'
import { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'
import { CategoryBar } from '../client/Categories';

function Layout({ children, setSearchTerm }) {

    // const { setSearchTerm } = props;
    return (
        <>
            <Navbar setSearchTerm={setSearchTerm}/>
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