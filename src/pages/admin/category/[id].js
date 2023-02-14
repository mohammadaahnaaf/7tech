import { CategoryDetail } from '@seventech/Admin'
import Head from 'next/head'
import React from 'react'
import { withAuth } from 'src/hoc/withAuth'

function CategoryDetailsPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Category Details</title>
                <meta name="description" content="Ahnaf and Tanvir made this site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CategoryDetail />
        </>
    )

}

export default withAuth(CategoryDetailsPage)