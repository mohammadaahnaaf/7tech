import React from 'react'
import { Banner } from './Home'
import Layout from './layout/Layout'
import Modal from './products/Details'

function Main() {
    return (
        <Layout>
            <Banner />
            <Modal />
            <Modal />
            <Modal />
        </Layout>
    )
}

export default Main