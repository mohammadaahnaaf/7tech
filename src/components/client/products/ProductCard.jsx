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
        <div className="group hover:scale-90 duration-300 bg-red-600 relative bg-opacity-20">
            <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white bg-red-600 hover:bg-black">
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
            <div>
                {product.images.slice(0, 1).map((item, index) => (
                    <div key={index} className="min-h-80 bg-gradient-to-b from-pink-800 to-purple-500 aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <Image
                            layout='responsive'
                            width={500}
                            height={520}
                            src={item}
                            alt='product image'
                            className="h-full w-full z-20 object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                ))}
            </div>
            <div className="grid w-full p-2 border-t-2 border-red-600">
                <div className='h-20 hidden md:grid content-between'>
                    <Link href={`/product/${product?._id}`}>
                        <a className="w-full font-normal text-sm text-gray-200">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product?.name?.substring(0, 60)}
                        </a>
                    </Link>
                    <p className="mt-1 w-full flex justify-end items-center text-end text-sm gap-2 text-green-500">
                        <span className='text-red-500 line-through'> ৳ {product.regularPrice}</span> ৳ {product.onlinePrice}
                    </p>
                </div>
                <div className='h-20 grid md:hidden content-between'>
                    <Link href={`/product/${product?._id}`}>
                        <a className="text-xs w-full font-normal text-gray-200">
                            <span aria-hidden="true" className="absolute inset-0" />
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
                                "hover:text-red-600 text-white block 2xl:hidden"
                            )}
                        >
                            <ShoppingCartIcon className='h-5 w-5' />
                        </button>
                        <p className="mt-1 w-full flex justify-end items-center text-end text-xs gap-2 text-green-500">
                            <span className='text-red-500 line-through'> ৳ {product.regularPrice}</span> ৳ {product.onlinePrice}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}