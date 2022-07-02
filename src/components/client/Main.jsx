import React from 'react'
import { headsets, keyboards, mouses } from '../../data/ProductsData'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'

function Main() {
    return (
        <Layout>
            <Banner />
            <Shop items={mouses} title={'MADE FOR GAMING'} />
            <Shop items={keyboards} title={'BEST FOR GAMING'} />
            <Shop items={headsets} title={'DEDICATED FOR GAMING'} />
        </Layout>
    )
}

export default Main