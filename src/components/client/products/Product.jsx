import { ShoppingCartIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';

function Product({ item, key }) {

    const { addItem } = useCart();

    let cartProduct = {
        id: item?._id,
        imageSrc: item.images.slice(0, 1).map(x => x),
        name: item.name,
        price: item.onlinePrice,
        category: item.category,
        stock: item.quantity,
        quantity: 1
    }

    return (
        <div key={key} className="group hover:scale-90 duration-300 bg-black relative hover:ring-white ring-red-600 ring-2">
            <div className="absolute z-10 grid items-center justify-items-center top-0 right-0 h-10 w-10 text-white hover:bg-opacity-50 ring-2 ring-red-600 ring-opacity-30 bg-black bg-opacity-30">
                <button
                    type='button'
                    disabled={item.stock === 0}
                    onClick={() => addItem(cartProduct)}
                >
                    <ShoppingCartIcon className='h-7 w-7' />
                </button>
            </div>
            {item?.images?.slice(0, 1).map((image, index) => (
                <div key={index} className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                        src={image}
                        alt='product image'
                        className="h-full w-full z-20 object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className="flex w-full p-2 justify-between border-t-2 border-red-600 bg-red-600 bg-opacity-10">
                <div className='w-full'>
                    <Link href={`/product/${item?._id}`}>
                        <a className="text-gray-200 text-sm ">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {item?.name?.substring(0, 45) + ' ...'}
                        </a>
                    </Link>
                    <div className='flex gap-2 justify-end items-center'>
                        <p className="mt-1 text-end text-sm line-through text-red-500">৳ {item.regularPrice}</p>
                        <p className="mt-1 text-end text-sm text-green-500">৳ {item.onlinePrice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Relatedcard({ item, qey }) {

    const { addItem } = useCart();

    let cartProduct = {
        id: item?._id,
        imageSrc: item.images.slice(0, 1).map(x => x),
        name: item.name,
        price: item.onlinePrice,
        category: item.category,
        stock: item.quantity,
        quantity: 1
    }

    return (
        <div key={qey} className='flex h-28 gap-2 justify-start items-center p-2 bg-white hover:bg-opacity-5 rounded-md hover:bg-black shadow'>
            {item?.images?.slice(0, 1).map((image, index) => (
                <div key={index} className="flex items-center rounded-md group-hover:opacity-75">
                    <Image
                        src={image}
                        // layout='fill'
                        width={120}
                        height={120}
                        alt='product image'
                        className="h-20 w-full z-20 object-cover rounded-md object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className='grid h-full w-full content-between'>
                <Link href={`/product/${item?._id}`}>
                    <a className='text-sm font-normal hover:text-red-600'>{item.name}</a>
                </Link>
                <div className='flex items-center justify-between gap-2'>

                    <div className='flex gap-2 justify-end items-center'>
                        <p className="mt-1 text-end text-sm line-through text-red-500">৳ {item.regularPrice}</p>
                        <p className="mt-1 text-end text-sm text-green-500">৳ {item.onlinePrice}</p>
                    </div>
                    <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                    item.averageRating > rating ? 'text-red-600' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                        <span className='px-2'> {item.reviewCount}</span>
                    </div>
                    <button
                        className='p-1 flex items-center justify-center bg-red-600 bg-opacity-10 rounded-md text-red-600 hover:text-black'
                        type='button'
                        disabled={item.stock === 0}
                        onClick={() => addItem(cartProduct)}
                    >
                        <ShoppingCartIcon className='h-6 w-6' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product