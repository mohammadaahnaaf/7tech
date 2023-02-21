import { AdminLayout } from '@seventech/layout'
import { useRouter } from 'next/router'
import React from 'react'

export function Details() {

    const router = useRouter()
    let itemId = router.query.id

    return (
        <div>
            SubscribersDetails
            {itemId}
        </div>
    )
}

export function SubscribersDetails() {
    return (
        <AdminLayout>
            <Details />
        </AdminLayout>
    )
}