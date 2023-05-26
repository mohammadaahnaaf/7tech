import React from 'react';
import { TrashIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart'
import Link from 'next/link';
import { Layout } from '@seventech/layout';

export function Carts() {

    const router = useRouter()
    const { removeItem, items, totalUniqueItems, updateItem } = useCart()
    const countSubtotal = (i) => i.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    const subtotal = countSubtotal(items)

    function handleIncrement(id, count) {
        let qty = count + 1
        // setQty(count => count + 1)
        updateItem(id, {
            quantity: qty,
        });
    }
    function handleDecrement(id, count) {
        let qty = count - 1
        // setQty(count => count - 1)
        updateItem(id, {
            quantity: qty,
        });
    }

    return (
        <div className="min-h-screen bg-black py-6 sm:px-6 lg:px-8">
            {/* container begains from here */}
            <div className="max-w-5xl mx-auto mt-5 flex max-h-screen flex-col overflow-y-auto ring-2 ring-red-600 shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <h2 className="text-xl lg:text-4xl text-center w-full font-large text-red-600"> Shopping Cart </h2>
                    <div className="mt-8">
                        <div className="flow-root">
                            {totalUniqueItems === 0 &&
                                <div className='pb-5'>
                                    <h2 className="text-xl lg:text-2xl text-center w-full font-large text-red-600">
                                        Your cart is empty.{' '}
                                        <span>Please add few products</span>
                                    </h2>
                                </div>
                            }
                            <ul role="list" className="-my-6 divide-y divide-red-200">
                                {items.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                                            <img
                                                alt='product image'
                                                src={product.imageSrc}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium hover:text-white text-red-600">
                                                    <button type='button' onClick={() => router.push(`/product/${product.id}`)}>
                                                        {product.name}
                                                    </button>
                                                    <p className="ml-4 text-green-500">৳ {product.price}</p>
                                                </div>
                                                <Link href={`/category/${product.category}`}>
                                                    <a className="mt-1 hover:text-white text-sm text-red-500">{product.category}</a>
                                                </Link>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">

                                                <div className='flex gap-2 items-center'>
                                                    <h4 className="text-sm font-medium text-red-600">Qty: </h4>
                                                    <div className="flex h-5 w-full mt-1 bg-transparent ring-red-600 ring-2">
                                                        <button disabled={product.quantity === 1} type='button' onClick={() => handleDecrement(product.id, product.quantity)} data-action="decrement" className="w-full font-bold text-md h-full px-2 hover:bg-red-600 hover:text-black text-red-600 cursor-pointer">
                                                            −
                                                        </button>
                                                        <p className="flex items-center justify-center w-full font-semibold text-center text-red-600 border-red-600 px-2 border-x-2 text-sm">{product.quantity}</p>
                                                        <button disabled={product.quantity === product.stock} type='button' onClick={() => handleIncrement(product.id, product.quantity)} data-action="increment" className="font-bold text-md w-full px-2 h-full hover:bg-red-600 hover:text-black text-red-600 cursor-pointer">
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* <p className="text-red-500">Qty {product.quantity}</p> */}

                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(product.id)}
                                                        className="font-medium"
                                                    >
                                                        <TrashIcon className="h-6 w-6 text-red-600 hover:text-red-300" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-red-200 py-6 px-4 sm:px-6">
                    {totalUniqueItems !== 0 && (
                        <>
                            <div className="flex items-end justify-between text-base font-medium text-green-500">
                                <p>Subtotal :</p>
                                <p>৳ {subtotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-red-500">Shipping cost shall be calculated at checkout.</p>
                            <div className="mt-6">
                                <Link href="/checkout">
                                    <a className="flex items-center justify-center border-red-600 border-2 bg-red-600 bg-opacity-10 px-6 py-3 text-base font-medium text-red-600 shadow-sm hover:bg-black">
                                        Checkout
                                    </a>
                                </Link>
                            </div>
                        </>
                    )}
                    <div className="mt-6 flex justify-center text-center text-md text-red-600">

                        <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                            onClick={() => router.push('/')}

                        >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export function Cart() {
    return (
        <Layout>
            <Carts />
        </Layout>
    )
}

// This App is made by Ahnaf and Tanvir 