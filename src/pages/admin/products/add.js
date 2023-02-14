import { AddProduct } from '@seventech/Admin'
import Head from 'next/head'
import React from 'react'
import { withAuth } from 'src/hoc/withAuth'

function AddProductPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Product Add</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AddProduct />
        </>
    )

}

export default withAuth(AddProductPage)