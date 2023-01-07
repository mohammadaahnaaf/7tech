import Head from 'next/head'
import React from 'react'
import { CategoriesList } from '../../../components'
import { withAuth } from '../../../hoc/withAuth'

function CategoryPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Category</title>
                <meta name="description" content="Ahnaf and Tanvir made this site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CategoriesList />
        </>
    )
}

export default withAuth(CategoryPage)