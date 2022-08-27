import React from 'react'
import { headsets, keyboards, mouses } from '../../data/ProductsData'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'

function Main() {
    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
                <Shop term={searchTerm} items={mouses} title={'MADE FOR GAMING'} />
                <Shop term={searchTerm} items={keyboards} title={'BEST FOR GAMING'} />
                <Shop term={searchTerm} items={headsets} title={'DEDICATED FOR GAMING'} />
        </Layout>
    )
}

export default Main