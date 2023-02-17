import { CategoriesList } from '@seventech/Admin'
import Head from 'next/head'
import React from 'react'
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