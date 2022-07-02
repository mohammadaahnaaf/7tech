import React from 'react'
import Head from 'next/head'
import Profile from '../components/client/Profile'
// import Products from '../components/products/Products'

function ProfilePage() {
    return (
        <>
            <Head>
                <title>7-Tech | Profile</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Products /> */}
            <Profile />
        </>
    )
}

export default ProfilePage