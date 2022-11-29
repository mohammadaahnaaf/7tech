import React from 'react'
// import { headsets, keyboards, products } from '../../data/ProductsData'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'

function Main({setIntro}) {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [products, setProducts] = React.useState([]);

    const filterI = 'Mouse';
    const filter2 = 'Keyboard';
    const filter21 = 'Keyboards';
    const filter3 = 'Headset';

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products');
            setProducts(res.data)
            setIntro(false)
        }
        getProducts()
    }, []);


    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            <Shop term={searchTerm} filters={filterI} items={products.slice(0, 10)} title={'MADE FOR GAMING'} />
            <Shop term={searchTerm} filters={filter21} items={products.slice(0, 10)} title={'BEST FOR GAMING'} />
            <Shop term={searchTerm} filters={filter3} items={products.slice(0, 10)} title={'DEDICATED FOR GAMING'} />
            <Shop term={searchTerm} items={products.slice(0, 10)} title={'ALL PRODUCTS'} />
        </Layout>
    )
}

export default Main