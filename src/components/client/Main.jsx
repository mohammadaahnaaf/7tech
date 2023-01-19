import React from 'react'
// import { headsets, keyboards, products } from '../../data/ProductsData'
import { Banner } from './Home'
import Layout from '../layout/Layout'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'

export function Main({ setIntro }) {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [products, setProducts] = React.useState([]);
    const [category, setCategory] = React.useState([]);

    // const filter21 = category[0]?.name;
    // const filterI = category[1]?.name;
    // const filter3 = category[2]?.name;
    // const filter31 = category[3]?.name;

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
            const cats = res.data.filter(cat => !!cat.isFeatured).sort((a, b) => a.index - b.index)

            setCategory(cats);
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

// const homeItems = [
//     {
//         id: 1,
//         title: 'BEST FOR GAMING',
//         category: 'Mouse',
//         products: [
//             {
//                 averageRating: 5,
//                 category: "Webcam",
//                 code: "s",
//                 createdAt: "2023-01-07T20:36:54.071Z",
//                 details: [{ title: "this is a test", _id: "63bdcae5b03711589e834564" }],
//                 imageAlt: "Product",
//                 images: ["https://seventech.s3.ap-southeast-1.amazonaws.com/shirazi-%282%29-1673123813648.png"],
//                 information: [{ title: "title", description: "description", _id: "63bdcaf8b03711589e83456a" }],
//                 isFeatured: true,
//                 keys: ["shirazi-(2)-1673123813648.png"],
//                 name: "s",
//                 price: 2,
//                 quantity: 2,
//                 reviewCount: 1,
//                 reviews: [{ userId: "630ce91d6148e81158f33c1a", name: "Ahnaf", comment: "hi", rating: 5 }],
//                 subCategory: "unknown",
//                 tags: ["f", "h"],
//                 _id: "63b9d7e6773fe6a9283a2294",
//             }
//         ]
//     },
//     {
//         id: 2,
//         title: 'DEDICATED FOR GAMING',
//         category: 'Keyboard',
//         products: []
//     },
//     {
//         id: 3,
//         title: 'BUILD FOR GAMING',
//         category: 'Gamming chair',
//         products: []
//     },
// ]