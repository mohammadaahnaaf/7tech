import React from 'react'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

function Cart() {
    return (
        <>
            <Navbar headerTitle={'Cart'} />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-[100vh]" />
                    </div>
                    {/* /End replace */}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Cart