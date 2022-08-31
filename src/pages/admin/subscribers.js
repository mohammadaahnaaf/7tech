import Head from 'next/head'
import React from 'react'
import Subscribers from '../../components/Admin/Subscribers'
import { withAuth } from '../../hoc/withAuth'

function SubscribersPage() {
  return (
    <>
    <Head>
        <title>SevenTech | Subscribers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
   <Subscribers />
</>
  )
}

export default withAuth(SubscribersPage)