import { useState } from 'react'
import { RadioGroup} from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'

// import { XIcon } from '@heroicons/react/outline'
// import { Shop } from '../Shop'
// import { Product } from './Products'

import Image from 'next/image'
import Layout from '../../layout/Layout'


const product = {
    name: 'Redmi 10C 4GB/128GB',
    price: 'TK 14,999',
    rating: 4.0,
    reviewCount: 117,
    href: '#',
    brand: 'Xiaomi',
    imageSrc: '/productss/redmi.jpg',
    imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true }
    ],
    details: [
        { title: 'OS: MIUI 13 based on Android 11' },
        { title: 'Processor: Snapdragon® 680 (6nm)' },
        { title: 'CPU: Octa-core CPU, up to 2.4GHz' },
        { title: 'GPU: Qualcomm® Adreno™ 610 GPU' },
        { title: 'RAM: 4GB LPDDR4X' },
        { title: 'ROM: 128GB UFS 2.2' },
        { title: 'Network: 2G/3G/4G' },
        { title: 'Card Slot: Dual SIM + microSD | Expandable storage up to 1TB' },
        { title: 'Display: 6.71" HD+ Dot Drop display | Corning® Gorilla® Glass' },
        { title: 'Display Resolution: 1650 x 720 pixels' },
        { title: 'Camera: Front: 5MP (f/2.2), Rear: 50MP+2MP' },
        { title: 'Back Camera Mechanism: 50MP (Main camera, f/1.8) + 2MP (Depth Camera, f/2.4)' },
        { title: 'Video (Rear): 1080p | 1920x1080 at 30fps, 720p | 720p | 1280x720 at 30fps' },
        { title: 'Battery: 5000mAh (typ) battery| Supports 18W fast charging | 10W in-box charger | USB-C' },
        { title: 'Network & Connectivity: 802.11a/b/g/n/ac Wi-Fi | Bluetooth: 5.0 | GPS' },
        { title: 'Audio: 3.5mm headphone jack' },
        { title: 'Security: Rear fingerprint sensor | AI face unlock' },
        { title: 'Sensors: Proximity sensor | Ambient light sensor | Accelerometer' },
    ],
    informations: [
        { title: 'Brand', description: 'Xiaomi' },
        { title: 'SKU', description: 'RDMI10C4128GB' },
        { title: 'Express Delivery', description: 'Yes' },
        { title: 'Warranty Information', description: '12 Months' },
        { title: 'Emi Available', description: '0' },
        { title: 'Front Camera', description: '5 MP' },
        { title: 'System Storage', description: '128 GB' },
        { title: 'RAM(GB)', description: '4' },
        { title: 'SIM Card', description: 'Nano-SIM & dual stand-by' },
        { title: 'Processor', description: 'Qualcomm Snapdragon 680' },
        { title: 'CPU Speed(Ghz)', description: 'Octa-core CPU, up to 2.4GHz' },
        { title: 'Connectivity', description: '802.11a/b/g/n/ac Wi-Fi | Bluetooth: 5.0 | GPS' },
        { title: 'Battery mAh', description: '5000mAh (typ) battery| Supports 18W fast charging | 10W in-box charger | USB-C' },
        { title: 'Model', description: 'Redmi 10C' },
    ],
    reviews: [
        {
            name: "Mohammed Ahnaf",
            date: "12 june 2022",
            comment: "Good product. very useful. Delivery was fine. But it takes much time. overall is ok.",
            rating: 4,
        },
        {
            name: "Tanvir",
            date: "13 june 2022",
            comment: "not much good product. very useful. Delivery was fine. But it takes much time. overall is ok.",
            rating: 3,
        },
        {
            name: "Istiak",
            date: "19 june 2022",
            comment: "Very good product. very useful. Delivery was fine. But it takes much time. overall is ok.",
            rating: 5,
        },
    ]
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Details() {

    const [qty, setQty] = useState(1)
    const [star, setStar] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [show, setShow] = useState('details');
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    const incrementQty = () => {
        setQty(count => count + 1);
    }
    const decrementQty = () => {
        setQty(count => count - 1);
    }

    return (

        <div className="max-w-7xl pb-6 mx-auto sm:px-6 lg:px-8">
            <div className="flex text-base text-left transform transition w-full md:px-4 md:my-8">

                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">

                    <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">

                        <div className="aspect-w-4 aspect-h-5 rounded-lg bg-gray-100 overflow-hidden lg:col-span-4">
                            <Image
                                layout='fill'
                                // width={200}
                                // height={500}
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="w-full h-full object-center rounded-lg object-cover lg:w-full lg:h-full"
                            />
                        </div>


                        <div className="col-span-12 lg:col-span-4">
                            <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{product.name}</h2>

                            <section aria-labelledby="information-heading" className="mt-2">
                                <h3 id="information-heading" className="sr-only">
                                    Product information
                                </h3>

                                <p className="text-2xl text-gray-900">{product.price}</p>

                                {/* Reviews */}
                                <div className="mt-6">
                                    <h4 className="sr-only">Reviews</h4>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{product.rating} out of 5 stars</p>
                                        <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {product.reviewCount} reviews
                                        </a>
                                        <a href="#" className="ml-1 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            | Add your review
                                        </a>
                                    </div>
                                    <div className='py-2 grid gap-1'>
                                        <h5 className='text-xs'>Brand: <a href='#' className='text-blue-500'>{product.brand}</a></h5>
                                        <h5 className='text-xs'>Sold By: <a href='#' className='text-blue-500'>{product.brand}</a></h5>
                                    </div>
                                </div>
                            </section>

                            <section aria-labelledby="options-heading" className="mt-10">
                                <h3 id="options-heading" className="sr-only">
                                    Product options
                                </h3>

                                <form>
                                    {/* Colors */}
                                    <div>
                                        <h4 className="text-sm text-gray-900 font-medium">Color</h4>

                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <span className="flex items-center space-x-3">
                                                {product.colors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                color.selectedClass,
                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                !active && checked ? 'ring-2' : '',
                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="span" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                color.class,
                                                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                            )}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </span>
                                        </RadioGroup>
                                    </div>

                                    {/* Sizes */}
                                    {/* <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm text-gray-900 font-medium">Size</h4>
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                Size guide
                                            </a>
                                        </div>

                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                            <div className="grid grid-cols-4 gap-4">
                                                {product.sizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        disabled={!size.inStock}
                                                        className={({ active }) =>
                                                            classNames(
                                                                size.inStock
                                                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                                active ? 'ring-2 ring-indigo-500' : '',
                                                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                            )
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                            <>
                                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                {size.inStock ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'border' : 'border-2',
                                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                                            'absolute -inset-px rounded-md pointer-events-none'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                                                    >
                                                                        <svg
                                                                            className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                                            viewBox="0 0 100 100"
                                                                            preserveAspectRatio="none"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                        </svg>
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div> */}

                                    {/* Qty */}

                                    <>
                                        <div className="custom-number-input h-10 w-32" />
                                        <h4 className="text-sm text-gray-900 font-medium">Qty</h4>
                                        {/* <label for="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Qty</label> */}
                                        <div className="flex flex-row h-12 w-full rounded-md relative bg-transparent mt-1">
                                            <button type='button' onClick={decrementQty} data-action="decrement" className=" bg-gray-400 text-white hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                                <span className="m-auto text-2xl font-thin">−</span>
                                            </button>
                                            <p className="text-center w-full bg-gray-400 font-semibold text-md flex items-center justify-center text-white ">{qty}</p>
                                            {/* <input type="number" className="outline-0 text-center w-full bg-gray-400 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-white outline-none" name="custom-input-number" value={qty}></input> */}
                                            <button type='button' onClick={incrementQty} data-action="increment" className="bg-gray-400 text-white hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </>

                                    <button
                                        type="submit"
                                        className="mt-6 w-full bg-sky-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    >
                                        Add to Cart
                                    </button>
                                </form>
                            </section>
                        </div>

                        <div className='col-span-12 rounded-md w-auto min-h-44'>

                            <>
                                <div className="sm:hidden">
                                    <label htmlFor="tabs" className="sr-only">More Information</label>
                                    <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5">
                                        <option>
                                            Details
                                        </option>
                                        <option>
                                            More Information
                                        </option>
                                        <option>
                                            Reviews
                                        </option>
                                    </select>
                                </div>
                                <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 ring-2 ring-gray-200 shadow sm:flex ">
                                    <li className="w-full">
                                        <button
                                            onClick={() => setShow('details')}
                                            type='button'
                                            className="inline-block p-4 w-full text-gray-900 bg-gray-50 focus:bg-gray-100 rounded-l-lg focus:ring-2 focus:ring-gray-300 active focus:outline-none"
                                        >
                                            Details
                                        </button>
                                    </li>
                                    <li className="w-full">
                                        <button
                                            onClick={() => setShow('info')}
                                            type='button'
                                            className="inline-block p-4 w-full bg-gray-50 focus:bg-gray-100  hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                        >
                                            More Information
                                        </button>
                                    </li>
                                    <li className="w-full">
                                        <button
                                            onClick={() => setShow('reviews')}
                                            type='button'
                                            className="inline-block p-4 w-full bg-gray-50 focus:bg-gray-100  hover:text-gray-700  rounded-r-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                        >
                                            Reviews
                                        </button>
                                    </li>

                                </ul>
                            </>

                            {/* Details */}
                            {(show === 'details') && (
                                <>
                                    <div div className='md:p-5 mt-5 rounded-md bg-gray-50'>
                                        <h2 className='text-xl font-medium'>{product.name}</h2>
                                        {product.details.map((detail, index) => (
                                            <p className='text-sm font-normal py-1 pl-10 text-gray-500'>{index + 1}. {detail.title}</p>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* More Information  */}
                            {(show === 'info') && (
                                <div className='md:p-5 mt-5 rounded-md bg-gray-50'>
                                    <h2 className='text-xl font-medium'>{product.name}</h2>
                                    {product.informations.map((info, index) => (
                                        <div key={index} className='flex  justify-items-start md:w-4/5'>
                                            <p className='text-sm w-56 font-normal py-1 pl-10 text-gray-500'>{index + 1}. {info.title}:</p>
                                            <p className='text-sm font-normal py-1 pl-10 text-gray-500'>{info.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Reviews  */}
                            {(show === 'reviews') && (
                                <div className='md:p-5 mt-5 rounded-md bg-gray-50'>
                                    <h2 className='text-xl font-medium'>Reviews:</h2>
                                    <div className='grid gap-5'>
                                        <div className='flex '>
                                            <h1 className='text-7xl '>{product.rating.toFixed(1)}</h1>
                                            <div className='grid'>
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                product.rating > rating ? 'text-sky-400' : 'text-gray-300',
                                                                'h-8 w-8 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <h2 className='py-1 px-2 text-gray-500'>{product.reviewsrate}5 Reviews</h2>
                                            </div>
                                        </div>
                                        <div className='grid gap-3'>
                                            {product.reviews.map((review, index) => (
                                                <div className='grid md:flex justify-between col-span-1 gap-3'>
                                                    <div className='grid w-1/4 md:px-5 gap-0'>
                                                        <p className='text-sm'>{review.name}</p>
                                                        <p className='text-xs text-gray-400'>{review.date}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    review.rating > rating ? 'text-sky-400' : 'text-gray-300',
                                                                    'h-6 w-6 flex-shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className='flex text-sm w-1/3 items-center text-gray-500'>{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <form>
                                            <div className='px-5'>
                                                <label htmlFor="about" className="block text-xl font-medium text-gray-700">
                                                    Write a Review
                                                </label>
                                                <div className="mt-3">
                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                        placeholder="Write your review"
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                <div className="flex items-center mt-3 bg-sky-100 p-3 rounded-md">
                                                    <p className='text-gray-500 mr-3'>Do You Like It?</p>
                                                    {[0, 1, 2, 3, 4].map((rating, index) => (
                                                        <button type='button' onClick={() => setStar(index + 1)}>
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    star > rating ? 'text-sky-500' : 'text-sky-200',
                                                                    'h-6 w-6 flex-shrink-0 ring-sky-200 ring-2 rounded bg-white mx-1'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                                <button type='submit' className="mt-3 w-15 justify-center bg-sky-500 border border-transparent rounded-md py-2 px-8 flex items-center text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                                    Done
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default function Detail() {
    return (
        <Layout>
            <Details />
        </Layout>
    )
}