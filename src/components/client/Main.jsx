import React from 'react'
import { Banner } from './Home'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'
import { Layout } from '@seventech/layout'
import { Loading } from '..'

export function Main() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [home, setHome] = React.useState([]);

    // get featured products data
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products/featured-on-home');
            setHome(res.data)
        }
        getProducts()
    }, []);

    // const mapArrayByIndex = home?.sort((a, b) => a.index - b.index).map(item => item.name);

    return home.length !== 0 ? (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            <div className='pb-4 min-h-screen bg-white'>
                {home?.map((item, index) => (
                    <Shop key={index} term={searchTerm} items={item.products.slice(0, 12)} title={item.tagline} />
                ))}
            </div>
        </Layout>
    ) : (
        <Layout>
            <Loading bg='white' />
        </Layout>
    )
}

// This App is made by Ahnaf and Tanvir 