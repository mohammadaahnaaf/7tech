import Image from 'next/image'
import React from 'react'
import Layout from './layout/Layout'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export function Banner() {
    return (
        <div className="max-w-7xl pb-6 mx-auto sm:px-6 lg:px-8">
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
                className='z-20'
            // swipeScrollTolerance
            >
                <img
                    src='/banners/banner-3.jpg'
                    className='rounded-b-md object-cover h-[max(550px,min(55vh,calc(626/1128*100vw)))] select-none cursor-pointer'
                />
                <img
                    src='/banners/banner.jpg'
                    className='rounded-b-md object-cover h-[max(550px,min(55vh,calc(626/1128*100vw)))] select-none cursor-pointer'
                />
                <img
                    src='/banners/banner-2.jpg'
                    className='rounded-b-md object-cover h-[max(550px,min(55vh,calc(626/1128*100vw)))] select-none cursor-pointer'
                />
                {/* <Image
                    src='/banners/banner-3.jpg'
                    layout='fill'
                    className='object-cover h-[max(550px,min(55vh,calc(626/1128*100vw)))] select-none cursor-pointer'
                />
                <Image
                    src='/banners/banner.jpg'
                    layout='fill'
                    className='object-cover h-[max(550px,min(55vh,calc(626/1128*100vw)))] select-none cursor-pointer'
                />
                <Image
                    src='/banners/banner-2.jpg'
                    layout='fill'
                    className='object-cover h-[max(550px,min(55vh,calc(626/1128*100vw)))] select-none cursor-pointer'
                /> */}
            </Carousel>
        </div>
    )
}

export function Homes() {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

            <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

                <div className="col-start-1 col-end-3 sm:max-w-2xl lg:pt-40">
                    <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                        Latest Tech's Arrived
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        This year, our latest collection will service you from the harsh elements of a world that doesn't care
                        if you live or die.
                        This year, our latest collection will service you from the harsh elements of a world that doesn't care
                        if you live or die.
                    </p>
                    <div className='pt-10'>
                        <a
                            href="/shop"
                            className="inline-block text-center bg-yellow-400 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-green-500"
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
        <Layout>
            <Homes />
            {/* <Banner /> */}
        </Layout>
    )
}