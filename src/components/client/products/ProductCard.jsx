import { ShoppingCartIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';
import axiosRoot from '../../utils/axios-root';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function ProductCards({ product, key }) {

    const { addItem } = useCart();
    // const [images, setImages] = React.useState([]);
    // const [error, setError] = React.useState('');

    // get product data 
    // React.useEffect(() => {
    //     async function getImages() {
    //         try {
    //             const res = await axiosRoot.get(`/products/${product._id}`);
    //             setImages(res.data.images)
    //         } catch (error) {
    //             console.log(error)
    //             setError(error.response?.data?.message)
    //         }
    //     }
    //     product._id && getImages()
    // }, []);

    const cartProduct = {
        id: product?._id,
        imageSrc: product.images[0],
        name: product.name,
        price: product.onlinePrice,
        category: product.category,
        stock: product.quantity,
        quantity: 1
    }

    return (
        <div key={key} className="group hover:scale-90 duration-300 bg-black relative hover:ring-white ring-red-600 ring-2">
            <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white ring-2 ring-white ring-opacity-20 bg-black hover:bg-opacity-5 bg-opacity-30">
                <button
                    type='button'
                    disabled={!product.inStock || product.quantity === 0}
                    onClick={() => addItem(cartProduct)}
                    className={classNames(
                        !product.inStock ? "cursor-not-allowed" : "",
                        "hover:text-red-600"
                    )}
                >
                    <ShoppingCartIcon className='h-7 w-7' />
                </button>
            </div>
            {product.images.slice(0, 1).map((item, index) => (
                <div key={index} className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                        src={`${item}` || product?.imageSrc}
                        alt='product image'
                        className="h-full w-full z-20 object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className="flex w-full p-2 justify-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
                <div className='w-full'>
                    <h3 className="text-sm font-normal overflow-hidden md:text-md text-gray-200">
                        <Link href={`/product/${product?._id}`}>
                            <a>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {/* {product?.name} */}
                                {product?.name?.substring(0, 60) + ' ...'}
                            </a>
                        </Link>
                    </h3>
                    <p className="mt-1 flex justify-end items-center text-end text-md gap-2 text-green-500">
                        <span className='text-red-500 line-through'> ৳ {product.regularPrice}</span> ৳ {product.onlinePrice}</p>
                    {/* <p className="mt-1 text-end text-md text-green-500">৳ {product.onlinePrice}</p> */}
                </div>
            </div>
        </div>
    )
}