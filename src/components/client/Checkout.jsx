import { TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCart } from 'react-use-cart'
import Layout from '../layout/Layout'
import Success from './Success'
// import { products } from '../../data/ProductsData'


const countries = ['Afghanistan', 'Bangladesh', "India", "Pakistan", "Nepal", "Srilanka"]

function Checkouts({ handleSubmit }) {

    const [order, setOrder] = useState({
        name: '',
        phone: '',
        email: '',
        area: '',
        city: '',
        address: '',
        zone: '',
    })

    let { items, cartTotal, removeItem } = useCart()
    let vat = (cartTotal * (7 / 100)).toFixed(2)
    let shipping = items.length * 100
    let total = (+ vat + shipping + cartTotal)

    // const countSubtotal = (items) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    // const subtotal = countSubtotal(items)
    // const cartTotal = countSubtotal(products)

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-3 h-auto md:flex justify-between max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                {/* Account and delevary details */}
                <div className="shadow h-full bg-red-50 sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <h2 className='text-center col-span-6 font-medium text-2xl'>Checkout</h2>
                            <div className="col-span-6">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    autoComplete="email"
                                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    pattern="[+]{1}[0-9]{11,14}"
                                    required
                                    autoComplete="phone"
                                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    Zone
                                </label>
                                <input
                                    type="text"
                                    name="region"
                                    id="region"
                                    autoComplete="address-level1"
                                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                    Area
                                </label>
                                <input
                                    type="text"
                                    name="area"
                                    id="area"
                                    autoComplete="postal-code"
                                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-6">
                                <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
                                    Payment Mathod
                                </label>
                                <select
                                    id="payment"
                                    name="payment"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                >
                                    <option value='cod'>Cash on delevary</option>
                                    <option value='bkash'>BKash</option>
                                </select>
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Street address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    className="shadow-sm focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    placeholder="Address"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-4 md:rounded-b-lg bg-red-200 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white hover:bg-red-600 bg-black"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>

                {/* Cart Products details */}
                <div className='md:w-1/3 h-auto shadow bg-red-50 overflow-y-scroll sm:rounded-lg'>
                    <div className="h-auto bg-red-100 py-3 px-2">
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {items.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={product.imageSrc}
                                                    // alt={product.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <button type='button' onClick={() => router.push(`/products/${product.id}`)}>
                                                            <h3> {product.name} </h3>
                                                        </button>
                                                        <p className="ml-1">৳{product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            className="font-medium"
                                                            onClick={() => removeItem(product.id)}
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
                    <div className="border-t-2 py-3 border-red-600 px-4 sm:px-6">
                        <div className="flex py-1 justify-between text-base font-medium text-gray-900">
                            <p>Subtotal :</p>
                            <p>৳ {cartTotal}</p>
                        </div>
                        <div className="flex py-1 justify-between text-base font-medium text-gray-900">
                            <p>Shipping :</p>
                            <p>৳ {shipping}</p>
                        </div>
                        <div className="flex py-1 justify-between text-base font-medium text-gray-900">
                            <p>VAT (7%) :</p>
                            <p>৳ {vat}</p>
                        </div>
                        <div className="flex border-t-2 py-1 justify-between text-base font-medium text-gray-900">
                            <p>Total :</p>
                            <p>৳ {total}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes are included</p>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default function Checkout() {


    const [success, setSuccess] = React.useState(false)
    function handleSubmit() {
        setSuccess(true)
        // emptyCart(true)
    }

    return (
        <Layout>
            {!success ?
                <Checkouts handleSubmit={handleSubmit} />
                :
                <Success />
            }
        </Layout>
    )
}