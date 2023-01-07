import Head from 'next/head'
import React from 'react'
import Details from '../../../components/Admin/categories/Details'
import { withAuth } from '../../../hoc/withAuth'

function CategoryDetailsPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Category Details</title>
                <meta name="description" content="Ahnaf and Tanvir made this site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Details />
        </>
    )

}

export default withAuth(CategoryDetailsPage)