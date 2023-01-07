import { StarIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useRef, useState } from 'react'

import Router, { useRouter } from 'next/router'
import Layout from '../../layout/Layout'
import axiosAPI from '../../utils/axios-api'
import axiosRoot from '../../utils/axios-root'
import Image from 'next/image'
import { useCart } from 'react-use-cart'
import { Dialog, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Details() {

    const router = useRouter()
    const itemId = router.query.id
    const myRef = useRef()

    // const [reviews, setReviews] = useState([])
    const [details, setDetails] = useState([])
    const [qty, setQty] = useState(1)
    const [star, setStar] = useState(0)
    const [show, setShow] = useState('details');
    const [info, setInfo] = useState([])
    const [moreInfo, setMoreInfo] = useState([])
    const [images, setImages] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [view, setView] = useState(1)
    const [openImage, setOpenImage] = useState(false)
    const [viewImage, setViewImage] = useState()
    const [isUser, setIsUser] = useState(false)

    // const [selectedSize, setSelectedSize] = useState('')
    // const [selectedColor, setSelectedColor] = useState('')
    // const total = (items) => items.reduce((acc, curr) => acc + curr.rating, 0);

    const { addItem } = useCart();
    const ratings = details?.reviews?.reduce((acc, curr) => acc + curr.rating, 0) / details?.reviews?.length

    // get data 
    useEffect(() => {
        async function getProduct() {
            let token = localStorage.getItem("access_token");
            setIsUser(!!token)
            const res = await axiosRoot.get(`/products/${itemId}`);
            setDetails(res.data)
            setInfo(res.data.details)
            setMoreInfo(res.data.information)
            setImages(res.data.images)
            // setReviews(res.data.reviews)
        }
        getProduct()
    }, [router, success]);

    // submit review data
    const handleSubmit = async (event) => {

        if (isUser) {
            try {
                event.preventDefault()
                const data = new FormData(event.currentTarget);

                const reqData = {
                    comment: data.get('comment'),
                    rating: +star
                }
                await axiosAPI.post(`/products/${itemId}/review`, reqData);
                // router.reload()
                setSuccess('Your review added')
                setTimeout(() => { setSuccess('') }, 2000)

            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message)
            }
        } else {
            Router.push('/login')
        }
    }

    // const incrementQty = () => {
    //     setQty(count => count + 1);
    // }
    // const decrementQty = () => {
    //     setQty(count => count - 1);
    // }

    function handleScroll(e) {
        e.preventDefault()
        setShow('reviews')
        myRef.current?.scrollIntoView()
    }

    const cartProduct = {
        id: details._id,
        imageSrc: images[0],
        name: details.name,
        price: details.price,
        category: details.category,
        quantity: 1
    }

    function handleViewImage(item) {
        setOpenImage(true)
        setViewImage(item)
    }

    function nextImage() {
        images.map((item, index) => {
            if (item === viewImage && 1 + index !== images.length) {
                setViewImage(images[index + 1])
            }
        })
    }

    function prevImage() {
        images.map((item, index) => {
            if (item === viewImage && index !== 0) {
                setViewImage(images[index - 1])
            }
        })
    }

    return (
        <>

            <Transition appear show={openImage} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpenImage(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-50"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Image Preview
                                    </Dialog.Title>
                                    <div className="mt-2 mx-auto">
                                        <div className='mx-auto cursor-pointer'>
                                            {viewImage && (
                                                <Image
                                                    height={480}
                                                    width={480}
                                                    src={`${viewImage}`}
                                                    alt='product-images'
                                                    className="mx-auto w-[40vh] h-[40vh]"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-2 flex justify-between ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={prevImage}
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={nextImage}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="px-3 mx-auto bg-gray-100 shadow md:py-8 md:px-8">

                <div className="grid max-w-5xl col-span-12 gap-4 mx-auto">

                    <div className="w-full grid justify-center col-span-12 lg:col-span-3">
                        {images.slice(view - 1, view).map((item, index) => (
                            <div className='relative mx-auto cursor-pointer' key={index}>
                                <Image
                                    height={400}
                                    width={400}
                                    src={`${item}`}
                                    alt='product-images'
                                    className="mx-auto w-[40vh] h-[40vh]"
                                />
                                <button onClick={() => handleViewImage(item)} className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-2xl text-red-500 font-semibold">
                                    View Image
                                </button>
                            </div>
                        ))}
                        <div className='flex gap-2 mt-2 mx-auto items-center justify-center'>
                            {images.map((item, index) => (
                                <button type='button' onClick={() => setView(index + 1)} key={index}>
                                    <Image
                                        height={100}
                                        width={100}
                                        src={`${item}`}
                                        alt='product-images'
                                        className="w-[10vh] h-[10vh] "
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="col-span-12 lg:col-span-2">
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
                                                    ratings > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{ratings} out of 5 stars</p>
                                    <button type='button' onClick={handleScroll} className="ml-3 text-sm font-medium text-red-600 hover:text-red-500">
                                        {details.reviews?.length} reviews
                                    </button>
                                    <button type='button' onClick={handleScroll} className="ml-1 text-sm font-medium text-red-600 hover:text-red-500">
                                        | Add your review
                                    </button>
                                </div>
                                <div className='grid gap-1 py-2'>
                                    {/* <h5 className='text-xs'>Brand: <a href='#' className='text-red-500'>{details.brand}</a></h5> */}
                                    <h5 className='text-sm'>Brand: <a href='#' className='text-red-500'>Redragon</a></h5>
                                </div>
                            </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-3">
                            <h3 id="options-heading" className="sr-only">
                                Product options
                            </h3>


                            <div className='grid grid-cols-1 gap-2'>

                                {/* Colors */}
                                {/* <div>
                                    <h4 className="text-sm font-medium text-gray-900">Color</h4>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="p-2 mt-1 ring-black ring-2">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <span className="flex items-center space-x-3">
                                            {colors?.map((color) => (
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
                                </div> */}

                                {/* Qty */}
                                <div>

                                    <h4 className="text-sm font-medium text-gray-900">Qty</h4>
                                    <div className="relative flex flex-row w-full h-12 mt-1 bg-transparent ring-black ring-2">
                                        <button type='button' onClick={() => setQty(count => count - 1)} data-action="decrement" className="w-20 h-full text-black bg-white cursor-pointer ">
                                            <span className="m-auto text-2xl font-semibold">−</span>
                                        </button>
                                        <p className="flex items-center justify-center w-full font-semibold text-center text-black bg-white border-black border-x-2 text-md">{qty}</p>
                                        <button type='button' onClick={() => setQty(count => count + 1)} data-action="increment" className="w-20 h-full text-black bg-white cursor-pointer">
                                            <span className="m-auto text-2xl font-semibold">+</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Cart Add  */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => addItem(cartProduct, qty)}
                                        className="flex items-center justify-center w-full px-8 py-3 mt-6 text-base font-medium bg-red-600 ring-2 ring-black"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div ref={myRef} className='w-auto col-span-12 rounded-md min-h-44'>

                        <>
                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">More Information</label>
                                <select value={show || ''} onChange={(e) => setShow(e.target.value)} id="tabs" className="bg-red-50 border border-red-300 text-gray-700 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                                    <option value='details'>
                                        Details
                                    </option>
                                    <option value='info'>
                                        More Information
                                    </option>
                                    <option value='reviews'>
                                        Reviews
                                    </option>
                                </select>
                            </div>
                            <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow ring-2 ring-gray-200 sm:flex ">
                                <li className="w-full">
                                    <button
                                        onClick={() => setShow('details')}
                                        type='button'
                                        className="inline-block w-full p-4 text-gray-900 rounded-l-lg bg-gray-50 focus:bg-gray-100 focus:ring-2 focus:ring-gray-300 active focus:outline-none"
                                    >
                                        Details
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        onClick={() => setShow('info')}
                                        type='button'
                                        className="inline-block w-full p-4 bg-gray-50 focus:bg-gray-100 hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    >
                                        More Information
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        onClick={() => setShow('reviews')}
                                        type='button'
                                        className="inline-block w-full p-4 rounded-r-lg bg-gray-50 focus:bg-gray-100 hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                    >
                                        Reviews
                                    </button>
                                </li>
                            </ul>
                        </>

                        {/* Details */}
                        {(show === 'details') && (
                            <>
                                <div div className='mt-5 rounded-md md:p-5 bg-gray-50'>
                                    <h2 className='text-xl font-medium'>{details.name}</h2>
                                    {info?.map((detail, index) => (
                                        <p className='py-1 pl-10 text-sm font-normal text-gray-500'>{index + 1}. {detail.title}</p>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* More Information  */}
                        {(show === 'info') && (
                            <div className='mt-5 rounded-md md:p-5 bg-gray-50'>
                                <h2 className='text-xl font-medium'>{details.name}</h2>
                                {moreInfo.map((info, index) => (
                                    <div key={index} className='flex justify-items-start md:w-4/5'>
                                        <p className='w-56 py-1 pl-10 text-sm font-normal text-gray-500'>{index + 1}. {info.title}:</p>
                                        <p className='py-1 pl-10 text-sm font-normal text-gray-500'>{info.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reviews  */}
                        {(show === 'reviews') && (
                            <div className='mt-5 rounded-md md:p-5 bg-gray-50'>
                                <h2 className='text-xl py-4 px-2 font-medium'>Reviews:</h2>
                                <div className='grid gap-5'>
                                    <div className='flex px-2'>
                                        <h1 className='text-7xl '>{details.reviews?.length === 0 ? '0.0' : ratings.toFixed(1)}</h1>
                                        <div className='grid'>
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            ratings > rating ? 'text-red-400' : 'text-gray-300',
                                                            'h-8 w-8 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <h2 className='px-2 py-1 text-gray-500'>{details.reviews?.length} Reviews</h2>
                                        </div>
                                    </div>
                                    <div className='px-2 grid gap-3'>
                                        {details.reviews?.map((review, index) => (
                                            <div className='grid justify-between col-span-1 gap-3 md:flex'>
                                                <div className='grid w-1/4 gap-0 md:px-5'>
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
                                                <p className='flex items-center w-1/3 text-sm text-gray-500'>{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* white a review  */}
                                    <form onSubmit={handleSubmit}>
                                        <div className='px-2 md:px-5'>
                                            {error && (
                                                <p className='mr-3 p-3 bg-yellow-200 rounded-lg text-red-500'>{error}</p>
                                            )}
                                            {success && (
                                                <div class="p-3 my-2 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                                                    <span class="font-medium">Success!</span> {success}
                                                </div>
                                            )}
                                            <label htmlFor="comment" className="block text-xl font-medium text-gray-700">
                                                Write a Review
                                            </label>
                                            <div className="mt-3">
                                                <textarea
                                                    id="comment"
                                                    name="comment"
                                                    type='text'
                                                    rows={3}
                                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-red-600 focus:border-red-600 sm:text-sm"
                                                    placeholder="Write your review"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <div className="flex items-center p-3 mt-3 bg-red-100 rounded-md">
                                                <p className='mr-3 text-gray-500'>Do You Like It?</p>
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
                                            <button type='submit' className="flex items-center justify-center px-8 py-2 mt-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md w-15 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
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
        </>

    )
}

export function Detail() {
    return (
        <Layout>
            <Details />
        </Layout>
    )
}