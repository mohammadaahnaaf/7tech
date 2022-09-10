import { useRef, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'

// import { XIcon } from '@heroicons/react/outline'
// import { Shop } from '../Shop'
// import { Product } from './Products'

import Image from 'next/image'
import Layout from '../../layout/Layout'
import { details } from '../../../data/ProductsData'
import { useRouter } from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Details() {
    const router = useRouter()
    const itemId = router.query.id

    const myRef = useRef()
    const [qty, setQty] = useState(1)
    const [star, setStar] = useState(0)
    const [selectedColor, setSelectedColor] = useState(details.colors[0])
    const [show, setShow] = useState('details');
    const [selectedSize, setSelectedSize] = useState(details.sizes[2])

    const incrementQty = () => {
        setQty(count => count + 1);
    }
    const decrementQty = () => {
        setQty(count => count - 1);
    }

    function handleScroll(e) {
        e.preventDefault()
        setShow('reviews')
        myRef.current?.scrollIntoView()
    }

    return (
        <div className="md:py-8 bg-gray-100 mx-auto shadow md:px-8 px-3">

            <div className="max-w-5xl mx-auto col-span-12 grid gap-4">

                <div className="w-full col-span-12 lg:col-span-3">
                    {/* <img
                        src={details.imageSrc}
                        alt={details.imageAlt}
                    // className="w-[40vh] h-[40vh]"
                    /> */}
                    <Image
                        height={500}
                        width={500}
                        src={details.imageSrc}
                        alt={details.imageAlt}
                    // className="w-[40vh] h-[40vh]"
                    />
                </div>


                <div className="col-span-12 lg:col-span-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{details.name}</h2>

                    <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                            Product information
                        </h3>

                        <p className="text-2xl text-gray-900">{details.price} Tk</p>

                        {/* Top Reviews */}
                        <div className="mt-6">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                details.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{details.rating} out of 5 stars</p>
                                <button type='button' onClick={handleScroll} className="ml-3 text-sm font-medium text-red-600 hover:text-red-500">
                                    {details.reviews.length} reviews
                                </button>
                                <button type='button' onClick={handleScroll} className="ml-1 text-sm font-medium text-red-600 hover:text-red-500">
                                    | Add your review
                                </button>
                            </div>
                            <div className='py-2 grid gap-1'>
                                {/* <h5 className='text-xs'>Brand: <a href='#' className='text-red-500'>{details.brand}</a></h5> */}
                                <h5 className='text-xs'>Sold By: <a href='#' className='text-red-500'>7Tech</a></h5>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="options-heading" className="mt-3">
                        <h3 id="options-heading" className="sr-only">
                            Product options
                        </h3>

                        <form>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                {/* Colors */}
                                <div>
                                    <h4 className="text-sm text-gray-900 font-medium">Color</h4>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-1 p-2 ring-black ring-2">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <span className="flex items-center space-x-3">
                                            {details.colors.map((color) => (
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

                                {/* Qty */}
                                <div>

                                    <h4 className="text-sm text-gray-900 font-medium">Qty</h4>
                                    <div className="flex flex-row h-12 w-full ring-black ring-2 relative bg-transparent mt-1">
                                        <button type='button' onClick={decrementQty} data-action="decrement" className=" bg-white text-black h-full w-20 cursor-pointer">
                                            <span className="m-auto text-2xl font-semibold">−</span>
                                        </button>
                                        <p className="text-center w-full bg-white border-x-2 border-black font-semibold text-md flex items-center justify-center text-black">{qty}</p>
                                        <button type='button' onClick={incrementQty} data-action="increment" className="bg-white text-black h-full w-20 cursor-pointer">
                                            <span className="m-auto text-2xl font-semibold">+</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="mt-6 w-full bg-red-600 ring-2 ring-black py-3 px-8 flex items-center justify-center text-base font-medium"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>


                            {/* Sizes */}
                            {/* <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm text-gray-900 font-medium">Size</h4>
                                            <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">
                                                Size guide
                                            </a>
                                        </div>

                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                            <div className="grid grid-cols-4 gap-4">
                                                {details.sizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        disabled={!size.inStock}
                                                        className={({ active }) =>
                                                            classNames(
                                                                size.inStock
                                                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                                active ? 'ring-2 ring-red-500' : '',
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
                                                                            checked ? 'border-red-500' : 'border-transparent',
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
                        </form>
                    </section>
                </div>

                <div ref={myRef} className='col-span-12 rounded-md w-auto min-h-44'>

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
                                <h2 className='text-xl font-medium'>{details.name}</h2>
                                {details.details.map((detail, index) => (
                                    <p className='text-sm font-normal py-1 pl-10 text-gray-500'>{index + 1}. {detail.title}</p>
                                ))}
                            </div>
                        </>
                    )}

                    {/* More Information  */}
                    {(show === 'info') && (
                        <div className='md:p-5 mt-5 rounded-md bg-gray-50'>
                            <h2 className='text-xl font-medium'>{details.name}</h2>
                            {details.informations.map((info, index) => (
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
                                    <h1 className='text-7xl '>{details.rating.toFixed(1)}</h1>
                                    <div className='grid'>
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        details.rating > rating ? 'text-red-400' : 'text-gray-300',
                                                        'h-8 w-8 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <h2 className='py-1 px-2 text-gray-500'>{details.reviewsrate}5 Reviews</h2>
                                    </div>
                                </div>
                                <div className='grid gap-3'>
                                    {details.reviews.map((review, index) => (
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
                                                            review.rating > rating ? 'text-red-400' : 'text-gray-300',
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
                                                className="shadow-sm focus:ring-red-600 focus:border-red-600 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Write your review"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <div className="flex items-center mt-3 bg-red-100 p-3 rounded-md">
                                            <p className='text-gray-500 mr-3'>Do You Like It?</p>
                                            {[0, 1, 2, 3, 4].map((rating, index) => (
                                                <button type='button' onClick={() => setStar(index + 1)}>
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            star > rating ? 'text-red-600' : 'text-red-200',
                                                            'h-6 w-6 flex-shrink-0 ring-red-200 ring-2 rounded bg-white mx-1'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <button type='submit' className="mt-3 w-15 justify-center bg-red-600 border border-transparent rounded-md py-2 px-8 flex items-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
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
    )
}

export default function Detail() {
    return (
        <Layout>
            <Details />
        </Layout>
    )
}