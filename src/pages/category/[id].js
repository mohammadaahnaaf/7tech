import Head from 'next/head'
import React from 'react'
import Details from '../../components/client/categories/Details'

function CategoryOne() {
  return (
    <>
      <Head>
        <title>SevenTech | Categories</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Details />
    </>
  )
}

export default CategoryOne;