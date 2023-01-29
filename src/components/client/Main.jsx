import React from 'react'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'

export function Main({ setIntro }) {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [home, setHome] = React.useState([]);

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products/featured-on-home');
            setHome(res.data)
            // setProducts(res.data)
            console.log(res.data)
            setIntro(false)
        }
        getProducts()
    }, []);

    // get filter category 
    // React.useEffect(() => {
    //     async function getCategory() {

    //         const res = await axiosRoot.get('/categories');
    //         const cats = res.data.filter(cat => !!cat.isFeatured).sort((a, b) => a.index - b.index)

    //         setCategory(cats);
    //     }
    //     getCategory()

    // }, []);

    const titles = ['MADE FOR GAMING', 'BEST FOR GAMING', 'DEDICATED FOR GAMING', 'BUILD FOR GAMING', 'ALL PRODUCTS']
    //filter((x, index) => x.index === index + 1)

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            {home?.map((item, index) => (
                <Shop term={searchTerm} items={item.products.slice(0, 12)} title={item.tagline} />
            ))}
        </Layout>
    )
}