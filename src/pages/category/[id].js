import { CategoryDetails } from '@seventech/client';
import Head from 'next/head'
import React from 'react'

function CategoryDetailsPage() {
  return (
    <>
      <Head>
        <title>SevenTech | Categories</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CategoryDetails />
    </>
  )
}

export default CategoryDetailsPage;