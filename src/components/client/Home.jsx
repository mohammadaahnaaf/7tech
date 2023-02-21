import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosRoot from '../utils/axios-root';

export function Banner() {

    const [banners, setBanners] = useState([])

    // get images data 
    React.useEffect(() => {
        async function getBanners() {
            const res = await axiosRoot.get('/banner');
            setBanners(res.data)
        }
        getBanners()
    }, []);

    return (
        <div className="max-w-full border-b-2 border-red-600 mx-auto">
            {banners?.map((item, index) => (
                <Carousel
                    // key={index}
                    autoPlay
                    infiniteLoop
                    animationHandler="fade"
                    stopOnHover={false}
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
                    {item.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className='z-50 object-cover h-[20vh] md:h-[55vh] select-none cursor-pointer'
                        />
                    ))}
                </Carousel>
            )

            )}
        </div>
    )
}