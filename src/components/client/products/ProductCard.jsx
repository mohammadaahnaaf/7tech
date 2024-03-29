import { ShoppingCartIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function ProductCards({ product }) {

    const { addItem } = useCart();

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
        <div className="group ring-black ring-2 hover:scale-90 duration-300 bg-white relative">
            <div className="absolute z-40 grid items-center justify-items-center top-0 right-0 p-1 text-white hover:bg-[#005DAB] bg-black">
                <button
                    type='button'
                    disabled={!product.inStock || product.quantity === 0}
                    onClick={() => addItem(cartProduct)}
                    className={classNames(
                        !product.inStock ? "cursor-not-allowed" : "",
                        "hover:text-[#005DAB]"
                    )}
                >
                    <ShoppingCartIcon className='lg:h-7 lg:w-7 h-5 w-5' />
                </button>
            </div>
            <div>
                {product.images.slice(0, 1).map((item, index) => (
                    <div key={index} className="min-h-80 bg-white w-full group-hover:opacity-75">
                        <div className='relative h-40 md:h-56 lg:h-80 w-full'>
                            <Image
                                layout='fill'
                                // height={512}
                                // width={512}
                                src={item}
                                alt='product-images'
                                className="mx-auto w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid bg-gray-200 w-full p-2 border-t-2 border-black">
                <div className='h-20 hidden md:grid content-between'>
                    <Link href={`/product/${product?._id}`}>
                        <a className="w-full font-normal text-sm text-black">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product?.name}
                        </a>
                    </Link>
                    <p className="mt-1 w-full flex justify-end items-center text-end text-sm gap-2 text-green-800">
                        <span className='text-[#005DAB] line-through'> ৳ {product.regularPrice}</span> ৳ {product.onlinePrice}
                    </p>
                </div>
                <div className='h-10 grid md:hidden content-between'>
                    <Link href={`/product/${product?._id}`}>
                        <a className="text-xs w-full font-normal text-black">
                            {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                            {product?.name?.substring(0, 40)}
                        </a>
                    </Link>
                    <div className='flex items-center justify-between'>
                        <button
                            type='button'
                            disabled={!product.inStock || product.quantity === 0}
                            onClick={() => addItem(cartProduct)}
                            className={classNames(
                                !product.inStock ? "cursor-not-allowed" : "",
                                "hover:text-[#005DAB] text-black block 2xl:hidden"
                            )}
                        >
                            <ShoppingCartIcon className='h-5 w-5' />
                        </button>
                        <p className="mt-1 w-full flex justify-end items-center text-end text-sm font-semibold gap-2 text-green-500">
                            <span className='text-[#005DAB] line-through'> ৳ {product.regularPrice}</span> ৳ {product.offerPrice || product.onlinePrice}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
// This App is made by Ahnaf and Tanvir 