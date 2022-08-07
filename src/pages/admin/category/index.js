import Head from 'next/head'
import React from 'react'
import { CategoriesList } from '../../../components'
// import CategoriesList from '../../../components/Admin/categories/CategoriesList'

function CategoryPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Category</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CategoriesList />
        </>)
}

export default CategoryPage