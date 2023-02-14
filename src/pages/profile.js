import React from 'react'
import Head from 'next/head'
import { withAuth } from '../hoc/withAuth'
import { Profile } from '@seventech/client'

function ProfilePage() {
    return (
        <>
            <Head>
                <title>SevenTech | Profile</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Profile />
        </>
    )
}

export default withAuth(ProfilePage)