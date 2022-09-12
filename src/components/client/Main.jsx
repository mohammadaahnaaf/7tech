import React from 'react'
// import { headsets, keyboards, products } from '../../data/ProductsData'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'

function Main() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [products, setProducts] = React.useState([]);

    const filterI = 'Mouse';
    const filter2 = 'Keyboard';
    const filter3 = 'Headset';

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products');
            setProducts(res.data)
        }
        getProducts()
    }, []);

    // const mouses = products.filter((item) => {

    //     if (item.category === filterI) {
    //         return item;
    //     } else if (item.isFeatured === true) {
    //         return item;
    //     }
    //     return ''
    // })
    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            <Shop nItems={1} term={searchTerm} filters={filterI} items={products.slice(0, 10)} title={'MADE FOR GAMING'} />
            <Shop nItems={1} term={searchTerm} filters={filter2} items={products.slice(0, 10)} title={'BEST FOR GAMING'} />
            <Shop nItems={1} term={searchTerm} filters={filter3} items={products.slice(0, 10)} title={'DEDICATED FOR GAMING'} />
        </Layout>
    )
}

export default Main