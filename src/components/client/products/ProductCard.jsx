import { ShoppingCartIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function ProductCards({ product, key }) {

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
                        src={item}
                        alt='product image'
                        className="h-full w-full z-20 object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className="grid relative w-full p-2 min-h-20 content-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
                {/* <div className='w-full grid min-h-16'> */}
                        <Link href={`/product/${product?._id}`}>
                            <a className="text-sm w-full font-normal md:text-md text-gray-200">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product?.name?.substring(0, 60)}
                            </a>
                        </Link>
                    <p className="mt-1 w-full flex justify-end items-center text-end text-md gap-2 text-green-500">
                        <span className='text-red-500 line-through'> ৳ {product.regularPrice}</span> ৳ {product.onlinePrice}
                    </p>
                {/* </div> */}
            </div>
        </div>
    )
}