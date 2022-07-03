import React from 'react'
import Head from 'next/head'
import Detail from '../components/client/products/Details'

function DetailsPage() {
    return (
        <>
            <Head>
                <title>7-Tech | Product Details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Detail />
        </>
    )
}

export default DetailsPage