import { OrderDetails } from '@seventech/admin'
import Head from 'next/head'
import React from 'react'
import { withAuth } from 'src/hoc/withAuth'

function OrderEditPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Order Edit</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           <OrderDetails />
        </>
    )
}

export default withAuth(OrderEditPage)