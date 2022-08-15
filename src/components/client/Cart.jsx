// import { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { useNavigate } from "react-router-dom";

import { TrashIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart'
import Layout from '../layout/Layout'
// import { products } from '../../data/ProductsData'

// const navigate = useNavigate()

// const routeChange = () => {
//     navigate('/')
// }

export function Carts() {
    const { removeItem, items } = useCart()
    const countSubtotal = (i) => i.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    const subtotal = countSubtotal(items)
    return (
        <>
            <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* container begains from here */}
                <div className="flex h-full flex-col bg-gray-100 rounded-md shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-xl lg:text-4xl text-center w-full font-large text-gray-900"> Shopping Cart </h2>
                            <div className="ml-3 flex h-7 items-center">
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {items.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={product.imageSrc}
                                                    alt={product.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={product.href}> {product.name} </a>
                                                        </h3>
                                                        <p className="ml-4">{product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(product.id)}
                                                            className="font-medium"
                                                        >
                                                            <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-300" aria-hidden="true" />
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

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex items-end justify-between text-base font-medium text-gray-900">
                            <p>Subtotal :</p>
                            <p>{subtotal}</p>
                        </div>
                        {/* <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Delevery :</p>
                            <p>$ 12.00</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Discount :</p>
                            <p>$ 30.00</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total :</p>
                            <p>$ 104.00</p>
                        </div> */}
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a
                                href="/checkout"
                                className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black"
                            >
                                Checkout
                            </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <button
                                    type="button"
                                    className="font-medium text-red-600 hover:text-red-300"
                                // onClick={() => setOpen(false)}

                                >
                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Cart() {
    return (
        <Layout>
            <Carts />
        </Layout>
    )
}