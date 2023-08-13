import React from 'react'
import { Banner } from './Home'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'
import { Layout } from '@seventech/layout'
// import { Loading } from '..'

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

    return home?.length !== 0 ? (
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
            {/* <Loading bg='white' /> */}
            <div className='h-screen w-full bg-white' />
        </Layout>
    )
}

// This App is made by Ahnaf and Tanvir 


// const home = [
//     {
//         "tagline": "Build For Gamers",
//         "products": [
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             }
//         ]
//     },

//     {
//         "tagline": "Build For Gamers",
//         "products": [
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "64d66ad1996934bfea92bb1f",
//                 "name": "Product 1",
//                 "code": "1",
//                 "regularPrice": 20,
//                 "onlinePrice": 19,
//                 "offerPrice": 12,
//                 "offerEndDate": "2023-08-31",
//                 "averageRating": 2.5,
//                 "reviewCount": 4,
//                 "quantity": 3,
//                 "category": "Headset",
//                 "subCategory": "Headphone",
//                 "images": [
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-1-1691800479216.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-2-1691800479420.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-3-1691800479481.png",
//                     "https://seventech-images.s3.ap-southeast-1.amazonaws.com/redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "keys": [
//                     "redragon-h710-helios-headset-1-1691800479216.png",
//                     "redragon-h710-helios-headset-2-1691800479420.png",
//                     "redragon-h710-helios-headset-3-1691800479481.png",
//                     "redragon-h710-helios-headset-5-1691800479611.png"
//                 ],
//                 "tags": [],
//                 "isFeatured": true,
//                 "inStock": true,
//                 "isActive": true,
//                 "imageAlt": "Redragon",
//                 "shortDescription": "This is a description ",
//                 "details": [
//                     {
//                         "title": "A",
//                         "description": "A",
//                         "_id": "64d66ad1996934bfea92bb20"
//                     }
//                 ],
//                 "information": [
//                     {
//                         "title": "Aa ",
//                         "description": "Aa",
//                         "_id": "64d66ad1996934bfea92bb21"
//                     }
//                 ],
//                 "relatedProducts": [
//                     "64d66ad1996934bfea92bb1f"
//                 ],
//                 "offerStartDate": "1691773649740",
//                 "reviews": [
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "r",
//                         "rating": 4,
//                         "_id": "64d731f8996934bfea92c5f0",
//                         "date": "1691824632087"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ro",
//                         "rating": 2,
//                         "_id": "64d73202996934bfea92c608",
//                         "date": "1691824642004"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 3,
//                         "_id": "64d73213996934bfea92c625",
//                         "date": "1691824659256"
//                     },
//                     {
//                         "userId": "64d6124b79ea9f9617afd91a",
//                         "name": "Mohammed Ahnaf",
//                         "comment": "ros",
//                         "rating": 1,
//                         "_id": "64d7321e996934bfea92c647",
//                         "date": "1691824670066"
//                     }
//                 ],
//                 "createdAt": "2023-08-11T17:07:29.744Z",
//                 "updatedAt": "2023-08-12T07:17:50.069Z",
//                 "__v": 0
//             }
//         ]
//     },
// ]