import Head from 'next/head'
import React from 'react'
import Dashboard from '../../components/Admin/Dashboard'
import { withAuth } from '../../hook/withAuth'

function AdminPage() {
    return (
            <>
                <Head>
                    <title>SevenTech | Admin</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Dashboard />
            </>
        )      
}


export default withAuth(AdminPage)