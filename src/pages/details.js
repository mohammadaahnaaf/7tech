import React from 'react'
import Head from 'next/head'
import Detail from '../components/client/products/Details'
// import { withAuth } from '../hoc/withAuth'

function DetailsPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Product Details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Detail />
        </>
    )
}

export default DetailsPage