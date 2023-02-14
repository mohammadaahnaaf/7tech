import { ProductsDetails } from '@seventech/Admin'
import Head from 'next/head'
import React from 'react'
import { withAuth } from 'src/hoc/withAuth'

function ProductsDetailsPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Product Details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           <ProductsDetails />
        </>
    )
}

export default withAuth(ProductsDetailsPage)