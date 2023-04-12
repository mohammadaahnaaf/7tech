import { AddCategory } from '@seventech/Admin'
import Head from 'next/head'
import React from 'react'
import { withAuth } from 'src/hoc/withAuth'

function AddCategoryPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Add Category</title>
                <meta name="description" content="Ahnaf and Tanvir made this site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           <AddCategory />
        </>
    )

}

export default withAuth(AddCategoryPage)