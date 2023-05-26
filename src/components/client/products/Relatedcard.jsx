import { ShoppingCartIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Relatedcard({ item }) {

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
        <div className='flex h-28 gap-2 justify-start items-center p-2 bg-white hover:bg-pink-50 shadow'>
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

// This App is made by Ahnaf and Tanvir 