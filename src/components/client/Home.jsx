import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosRoot from '../utils/axios-root';
import Image from 'next/image';

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
        <div className="max-w-full border-b border-pink-900 shadow mx-auto">
            {banners?.slice(0, 1).map((item, index) => (
                <Carousel
                    key={index}
                    autoPlay
                    infiniteLoop
                    animationHandler="fade"
                    stopOnHover={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    interval={2500}
                    transitionTime={700}
                    swipeable={false}
                    emulateTouch
                    className='z-50'
                // swipeScrollTolerance
                >
                    {item.images.map((image, index) => (
                        <div key={index} className='h-[20vh] md:h-[65vh] w-full'>
                            <Image
                                layout='fill'
                                src={image}
                                alt={`banner-image-${1 + index}`}
                                className='z-50 object-cover h-[20vh] md:h-[65vh] select-none cursor-pointer'
                            />
                        </div>
                    ))}
                </Carousel>
            )

            )}
        </div>
    )
}

// This App is made by Ahnaf and Tanvir 


// const banners = [
//     {
//         "_id": "64d6d561996934bfea92c009",
//         "images": [
//             "https://seventech-images.s3.ap-southeast-1.amazonaws.com/banner-1691800929711.jpg",
//             "https://seventech-images.s3.ap-southeast-1.amazonaws.com/banner2-1691800929787.png",
//             "https://seventech-images.s3.ap-southeast-1.amazonaws.com/banner3-1691800929855.jpg"
//         ],
//         "keys": [
//             "banner-1691800929711.jpg",
//             "banner2-1691800929787.png",
//             "banner3-1691800929855.jpg"
//         ],
//         "createdAt": "2023-08-12T00:42:09.999Z",
//         "updatedAt": "2023-08-12T00:42:09.999Z",
//         "__v": 0
//     }
// ]