import Image from 'next/image'
import React, { useState } from 'react'
import Layout from '../layout/Layout'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BasicNavbar } from '../shared/Navbar';
import Footer from '../shared/Footer';
import axiosRoot from '../utils/axios-root';


export function Banner() {

    const [banners, setBanners] = useState([])

    // get images data 
    React.useEffect(() => {
        async function getBanners() {
            const res = await axiosRoot.get('/banner');
            setBanners(res.data)
            console.log(res.data)
        }
        getBanners()
    }, []);

    return (
        <div className="max-w-full border-b-2 border-red-600 mx-auto">
            {banners?.slice(0, 1).map((item) =>
                <Carousel
                    autoPlay
                    infiniteLoop
                    animationHandler="fade"
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    interval={2500}
                    transitionTime={500}
                    swipeable={false}
                    emulateTouch
                    className='z-50'
                // swipeScrollTolerance
                >
                    <img
                        src={item.images[0]}
                        className='z-50 object-cover h-[20vh] md:h-[55vh] select-none cursor-pointer'
                    />
                    <img
                        src={item.images[2]}
                        className='z-50 object-cover h-[20vh] md:h-[55vh] select-none cursor-pointer'
                    />
                    <img
                        src={item.images[1]}
                        className='z-50 object-cover h-[20vh] md:h-[55vh] select-none cursor-pointer'
                    />
                </Carousel>
            )}
        </div>
    )
}

export function Homes() {
    return (
        <div className="max-w-7xl min-h-screen mx-auto py-6 sm:px-6 lg:px-8">

            <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

                <div className="col-start-1 col-end-3 sm:max-w-2xl lg:pt-40">
                    <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                        Opss!
                    </h1>
                    <p className="mt-4 text-2xl text-gray-500">
                        The SevenTech website is under maintenance now. Stay connected with our social sites. We shall arrive very soon.
                    </p>
                    <div className='pt-10'>
                        <a
                            href="/"
                            className="inline-block text-center bg-red-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-green-500"
                        >
                            Shop Collection
                        </a>
                    </div>
                </div>

                <div className="col-end-7 col-span-2 z-0">

                    {/* Decorative image grid */}
                    <div className="flex items-center space-x-6 lg:space-x-5">
                        <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="w-40 h-64 rounded-lg overflow-hidden">
                                <Image
                                    height={640}
                                    width={400}
                                    // layout='fill'
                                    // src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                                    src="/features/lady-airpod.jpg"
                                    alt=""
                                    className="w-full h-full object-center z-0 object-cover"
                                />
                            </div>
                            <div className="w-40 h-64 rounded-lg overflow-hidden">
                                <Image
                                    height={640}
                                    width={400}
                                    src="/features/man-headphone.jpg"
                                    // layout='responsive'
                                    // src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                                    alt=""
                                    className="w-full h-full z-0 object-center object-cover"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">

                            <div className="w-40 h-64 rounded-lg overflow-hidden">
                                <Image
                                    height={640}
                                    width={400}
                                    src="/features/lady-headphone.jpg"
                                    // src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                                    alt=""
                                    className="w-full h-full z-0 object-center object-cover "
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="w-40 h-64 rounded-lg overflow-hidden">
                                <Image
                                    height={640}
                                    width={400}
                                    src="/features/lady-headphone2.jpg"
                                    // src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                                    alt=""
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="w-40 h-64 rounded-lg overflow-hidden">
                                <Image
                                    height={640}
                                    width={400}
                                    src="/features/lady2-headphone.jpg"
                                    // src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                                    alt=""
                                    className="w-full h-full z-0 object-center object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <BasicNavbar />
            <Homes />
            <Footer />
        </>
    )
}