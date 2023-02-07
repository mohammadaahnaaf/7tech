import { StarIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useRef, useState } from 'react'

import Router, { useRouter } from 'next/router'
import Layout from '../../layout/Layout'
import axiosAPI from '../../utils/axios-api'
import axiosRoot from '../../utils/axios-root'
import Image from 'next/image'
import { useCart } from 'react-use-cart'
import { Dialog, Transition } from '@headlessui/react'
import Product from './Product'
// import { ProductCard } from '../Shop'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Details() {

    const router = useRouter()
    const itemId = router.query.id
    const myRef = useRef()
    const { addItem } = useCart();

    const [product, setProduct] = useState([])
    const [qty, setQty] = useState(1)
    const [star, setStar] = useState(0)
    const [show, setShow] = useState('details');
    const [images, setImages] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [view, setView] = useState(1)
    const [openImage, setOpenImage] = useState(false)
    const [viewImage, setViewImage] = useState()
    const [isUser, setIsUser] = useState(false)
    const [relatedProductsId, setRelatedProductsId] = useState([])
    
    // const total = (items) => items.reduce((acc, curr) => acc + curr.rating, 0);

    // const ratings = product?.reviews?.reduce((acc, curr) => acc + curr.rating, 0) / product?.reviewCount

    // get data 
    useEffect(() => {
        async function getProduct() {
            let token = localStorage.getItem("access_token");
            setIsUser(!!token)
            const res = await axiosRoot.get(`/products/${itemId}`);
            setProduct(res.data)
            setImages(res.data.images)
            setRelatedProductsId(res.data.relatedProducts)
        }
        itemId && getProduct()
        
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
        id: product?._id,
        imageSrc: images[0],
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.quantity,
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

    const overview = (
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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Image Preview
                                </Dialog.Title>
                                <div className="mt-2 mx-auto">
                                    <div className='mx-auto cursor-pointer '>
                                        {viewImage && (
                                            <Image
                                                height={640}
                                                width={640}
                                                src={`${viewImage}`}
                                                alt='product-images'
                                                className="mx-auto w-[40vh] rounded-lg h-[40vh]"
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
    )

    return (
        <>
            {overview}
            <div className='md:p-8 grid w-full md:max-w-7xl mx-auto gap-4'>
                <div className='grid grid-cols-5 gap-4 w-full'>

                    <div className='rounded-lg ring-2 ring-gray-200 col-span-5 lg:col-span-2'>

                        <div className='grid p-4 gap-1 mt-2 items-center'>
                            {images.slice(view - 1, view).map((item, index) => (
                                <div className='relative cursor-pointer flex items-center mx-auto' key={index}>
                                    <Image
                                        height={500}
                                        width={500}
                                        src={`${item}`}
                                        alt='product-images'
                                        className="mx-auto rounded-md"
                                    />
                                    <div className='absolute backdrop-blur-sm inset-0 z-10 opacity-0 hover:opacity-100 duration-300 flex justify-center items-center'>
                                        <button onClick={() => handleViewImage(item)} className="bg-red-600 text-white rounded-md p-3 text-2xl font-semibold">
                                            View Image
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className='flex gap-3 mt-2 items-center mx-auto justify-center'>
                                {images.map((item, index) => (
                                    <button type='button' className='ring-2 items-center flex ring-gray-200 rounded-md w-full' onClick={() => setView(index + 1)} key={index}>
                                        <Image
                                            height={120}
                                            width={120}
                                            src={`${item}`}
                                            alt='product-images'
                                            className="min-w-full h-[10vh] rounded-md"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Side info  */}
                    <div className='p-4 rounded-lg bg-white col-span-5 lg:col-span-3'>
                        <h1 className='text-xl font-semibold text-left'>{product.name}</h1>
                        <div>

                            {/* side info table */}
                            <div className="relative mt-4">
                                <table className="w-full text-sm text-left p-3">

                                    <tbody>
                                        <tr className="bg-white w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className=" w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Regular Price:
                                            </th>
                                            <td className=" py-2">
                                                {product.regularPrice}
                                            </td>
                                        </tr>
                                        <tr className="bg-white w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className=" w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Product Price:
                                            </th>
                                            <td className=" py-2">
                                                {product.onlinePrice}
                                            </td>
                                        </tr>
                                        <tr className="bg-white w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className=" w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Offer Price:
                                            </th>
                                            <td className=" py-2">
                                                {product.offerPrice}
                                            </td>
                                        </tr>
                                        <tr className="bg-white w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className=" w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Stock Status:
                                            </th>
                                            <td className=" py-2">
                                                {product.quantity === 0 ? 'Stock Out' : 'In Stock'}
                                            </td>
                                        </tr>
                                        <tr className="bg-white w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className=" w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Brand:
                                            </th>
                                            <td className=" py-2">
                                                {/* {product.brand ? product.brand : 'Unknown'} */}
                                                {product.brand || 'Unknown'}
                                            </td>
                                        </tr>
                                        <tr className="bg-white w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className=" w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Total Reviews:
                                            </th>
                                            <td className="grid md:flex py-2">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            product.averageRating > rating ? 'text-red-600' : 'text-gray-200',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                                <span className='px-2'> {product.reviewCount} Reviews</span>
                                                <button type='button' onClick={handleScroll}>
                                                    <a className='hover:text-red-600'>| Write A Review</a>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* short description  */}
                            <div className='grid gap-2 mt-4'>
                                <h2 className='text-sm font-semibold'>Short Description:</h2>
                                <p className='text-sm'>{product.shortDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ipsum et dui efficitur euismod non vitae ipsum. Aliquam erat volutpat. Sed eu lacinia lorem. Cras lobortis nisl nisl, in vulputate nibh ullamcorper feugiat. Nunc malesuada condimentum luctus. Nulla tellus mi, porttitor eu tempus vitae, viverra vitae dui. Maecenas vulputate eros ante, et venenatis tortor consequat quis. Nullam vehicula non leo et congue. In vel nisl ligula."}</p>
                            </div>

                            {/* Add to cart button  */}
                            <div className='grid grid-cols-2 my-3 w-full gap-3'>
                                {/* Qty */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Qty</h4>
                                    <div className="relative flex flex-row w-full h-12 mt-1 bg-transparent ring-black ring-2">
                                        <button disabled={qty === 1} type='button' onClick={() => setQty(count => count - 1)} data-action="decrement" className="w-20 h-full hover:text-white hover:bg-black text-black bg-white cursor-pointer ">
                                            <span className="m-auto text-2xl font-semibold">−</span>
                                        </button>
                                        <p className="flex items-center justify-center w-full font-semibold text-center text-black bg-white border-black border-x-2 text-md">{qty}</p>
                                        <button disabled={qty === cartProduct.stock} type='button' onClick={() => setQty(count => count + 1)} data-action="increment" className="w-20 h-full hover:bg-black hover:text-white text-black bg-white cursor-pointer">
                                            <span className="m-auto text-2xl font-semibold">+</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart  */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => addItem(cartProduct, qty)}
                                        className="flex items-center justify-center w-full px-8 py-3 mt-6 text-base font-medium bg-red-600 hover:bg-black hover:text-white ring-2 ring-black"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Specifications More info Reviews  */}
                <div ref={myRef} className='rounded-lg w-full'>
                    <div className='w-auto col-span-12 rounded-md'>
                        <>
                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">More Information</label>
                                <select value={show || ''} onChange={(e) => setShow(e.target.value)} id="tabs" className="bg-red-50 border border-red-300 text-gray-700 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                                    <option value='details'>
                                        Specifications
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
                                        Specifications
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
                                    <h2 className='text-xl font-medium'>{product.name}</h2>
                                    {product.details?.map((detail, index) => (
                                        <p key={index} className='py-1 pl-10 text-sm font-normal text-gray-500'>{index + 1}. {detail.title}</p>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* More Information  */}
                        {(show === 'info') && (
                            <div className='mt-5 rounded-md md:p-5 bg-gray-50'>
                                <h2 className='text-xl font-medium'>{product.name}</h2>
                                {product.information.map((info, index) => (
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
                                        <h1 className='text-7xl '>{product?.averageRating?.toFixed(1) || '0.0'}</h1>
                                        <div className='grid'>
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            product.averageRating > rating ? 'text-red-400' : 'text-gray-300',
                                                            'h-8 w-8 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <h2 className='px-2 py-1 text-gray-500'>{product.averageRating || '0'} Reviews</h2>
                                        </div>
                                    </div>
                                    <div className='px-2 grid gap-3'>
                                        {product.reviews?.map((review, index) => (
                                            <div key={index} className='border-b md:mx-5 border-gray-200 items-center pb-2 grid justify-between col-span-1 gap-3 md:flex'>
                                                <div className='grid w-1/4 gap-0'>
                                                    <p className='text-sm'>{review.name}</p>
                                                    <p className='text-xs text-gray-400'>@ {review.date}</p>
                                                    {/* <p className='text-xs text-gray-400'>{fToNow(review.date)}</p> */}
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

                {/* Realted Products  */}
                <div className='ring-2 ring-gray-300 bg-white rounded-md p-3 mt-2 md:max-w-7xl mx-auto w-full'>
                    <h1 className='py-4 text-center font-bold text-2xl text-black'>Related Products</h1>
                    <div className='grid grid-cols-10 w-full gap-2 p-3'>
                        {relatedProductsId.map((id, index) =>
                            <div key={index} className='col-span-5 sm:col-span-3 md:col-span-2 '>
                                <Product productId={id} />
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

// export const relatedProducts = [
//     {
//         name: 'ReDragon Keyboard',
//         "images": ["https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-01-500x500-1672822103678.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-04-500x500-1672822104084.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-02-500x500-1672822104263.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-03-500x500-1672822104405.jpeg"],
//         price: 100,
//         _id: '63d4aaa2950803a7a4c6403d',
//     },
//     {
//         name: 'ReDragon Keyboard',
//         "images": ["https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-01-500x500-1672822103678.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-04-500x500-1672822104084.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-02-500x500-1672822104263.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-03-500x500-1672822104405.jpeg"],
//         _id: '63d4aaa2950803a7a4c6403d',
//         price: 100,

//     },
//     {
//         name: 'ReDragon Keyboard',
//         "images": ["https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-01-500x500-1672822103678.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-04-500x500-1672822104084.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-02-500x500-1672822104263.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-03-500x500-1672822104405.jpeg"],
//         price: 100,
//         _id: '63d4aaa2950803a7a4c6403d',

//     },
//     {
//         name: 'ReDragon Keyboard',
//         price: 100,

//         "images": ["https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-01-500x500-1672822103678.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-04-500x500-1672822104084.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-02-500x500-1672822104263.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-03-500x500-1672822104405.jpeg"],
//         _id: '63d4aaa2950803a7a4c6403d',
//     },
//     {
//         name: 'ReDragon Keyboard',
//         price: 100,

//         "images": ["https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-01-500x500-1672822103678.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-04-500x500-1672822104084.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-02-500x500-1672822104263.jpeg", "https://seventech.s3.ap-southeast-1.amazonaws.com/gaia-c211-white-03-500x500-1672822104405.jpeg"],
//         _id: '63d4aaa2950803a7a4c6403d',
//     },
// ]