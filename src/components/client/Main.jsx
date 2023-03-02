import React from 'react'
import { Banner } from './Home'
import { Shop } from './Shop'
import axiosRoot from '../utils/axios-root'
import { Layout } from '@seventech/layout'
// import ReactPlayer from 'react-player'

export function Main() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [home, setHome] = React.useState([]);

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products/featured-on-home');
            setHome(res.data)
        }
        getProducts()
    }, []);

    // const titles = ['MADE FOR GAMING', 'BEST FOR GAMING', 'DEDICATED FOR GAMING', 'BUILD FOR GAMING', 'ALL PRODUCTS']
    //filter((x, index) => x.index === index + 1)

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            <div className='pb-4 bg-black'>
                {home?.map((item, index) => (
                    <Shop qey={index} term={searchTerm} items={item.products.slice(0, 12)} title={item.tagline} />
                ))}
            </div>

            {/* {home.length === 0 ? (
                <div className='h-screen'>
                    <ReactPlayer
                        loop playing
                        width='100%'
                        height='100%'
                        url='https://youtu.be/CMQ3ofd7JSY'
                    />
                </div>
            ) : null} */}

        </Layout>
    )
}