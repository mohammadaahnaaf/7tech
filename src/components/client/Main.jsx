import React from 'react'
// import { headsets, keyboards, products } from '../../data/ProductsData'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'

function Main({ setIntro }) {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [products, setProducts] = React.useState([]);
    const [category, setCategory] = React.useState([]);

    const filter21 = category[0]?.name;
    const filterI = category[1]?.name;
    const filter3 = category[2]?.name;
    const filter31 = category[3]?.name;

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products');
            setProducts(res.data)
            setIntro(false)
        }
        getProducts()
    }, []);

    // get filter category 
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');

            const cats = res.data.filter(cat => cat.isFeatured === true).map((i) => {
                return i
            })
            setCategory(cats);

            // setCategory([...category, i]);

            // res.data.map((x) => {
            //     if (x.isFeatured === true) {
            //         setCategory([...category, x])
            //         console.log(x)
            //     } return
            // })
        }
        getCategory()
    }, []);

    const titles = ['MADE FOR GAMING', 'BEST FOR GAMING', 'DEDICATED FOR GAMING', 'BUILD FOR GAMING', 'ALL PRODUCTS']
    //filter((x, index) => x.index === index + 1)

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            {category.slice(0, 4).map((s, index) => (
                <Shop term={searchTerm} filters={s.name} items={products.slice(0, 12)} title={titles[index]} />
            ))}
        </Layout>
    )
}

export default Main