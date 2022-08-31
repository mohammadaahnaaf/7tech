import Head from 'next/head'
import React from 'react'
import Settings from '../../components/Admin/Settings'
import { withAuth } from '../../hoc/withAuth'

function SettingsPage() {
    return (
        <>
            <Head>
                <title>SevenTech | Settings</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           <Settings />
        </>
    )
}

export default withAuth(SettingsPage)