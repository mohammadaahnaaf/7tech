import { TrashIcon } from '@heroicons/react/solid'
// import Link from 'next/link'
import React from 'react'
import { useCart } from 'react-use-cart'
import Layout from '../layout/Layout'
import axiosAPI from '../utils/axios-api'
import Success from './Success'
// import { products } from '../../data/ProductsData'


const countries = ['Afghanistan', 'Bangladesh', "India", "Pakistan", "Nepal", "Srilanka"]

function Checkouts({ setSuccess }) {

    let { items, cartTotal, removeItem } = useCart()
    let vat = (cartTotal * (7 / 100)).toFixed(2)
    let shipping = items.length * 100
    let total = (+ vat + shipping + cartTotal)

    // post data 
    const handleSubmit = async (event) => {

        try {
            event.preventDefault()

            const data = new FormData(event.currentTarget);

            const reqData = {
                customer_name: data.get('name'),
                customer_number: data.get('phone'),
                city: data.get('city'),
                zone: data.get('zone'),
                address: data.get('address'),
                payment_method: data.get('payment'),

                products: items.map(value => (
                    {
                        productId: value.id,
                        quantity: value.quantity
                    }
                ))
            }
            await axiosAPI.post('/orders', reqData);
            //   Router.push('/admin/category')
            setSuccess(true)

        } catch (error) {
            setIsLoading(false);
            console.log(error)
            setError(error.response?.data?.message)
        }
    }

    // const countSubtotal = (items) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    // const subtotal = countSubtotal(items)
    // const cartTotal = countSubtotal(products)

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-h-auto bg-black py-6 sm:px-6 lg:px-8">
                <div className='max-w-7xl mx-auto grid md:flex justify-center gap-5'>

                    {/* Account and delevary details */}
                    <div className="shadow h-full ring-2 ring-red-600">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <h2 className='text-center col-span-6 text-red-600 font-medium text-2xl'>Checkout</h2>
                                <div className="col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-red-600">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="given-name"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-red-600">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        disabled
                                        autoComplete="email"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="phone" className="block text-sm font-medium text-red-600">
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        pattern="[+]{1}[0-9]{11,14}"
                                        required
                                        autoComplete="phone"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-red-600">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="zone" className="block text-sm font-medium text-red-600">
                                        Zone
                                    </label>
                                    <input
                                        type="text"
                                        name="zone"
                                        id="zone"
                                        autoComplete="address-level1"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="area" className="block text-sm font-medium text-red-600">
                                        Area
                                    </label>
                                    <input
                                        type="text"
                                        name="area"
                                        id="area"
                                        disabled
                                        autoComplete="postal-code"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="payment" className="block text-sm font-medium text-red-600">
                                        Payment Mathod
                                    </label>
                                    <select
                                        id="payment"
                                        name="payment"
                                        className="mt-1 bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                    >
                                        <option value='cash-on-delivery'>Cash on delevary</option>
                                        <option value='bkash'>BKash</option>
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-red-600">
                                        Street address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={3}
                                        className="bg-red-600 bg-opacity-20 focus:ring-red-600 text-red-600 ring-white border-white focus:border-red-600 block w-full shadow-sm sm:text-sm"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-4 md:rounded-b-lg bg-red-600 bg-opacity-10 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-red-600 hover:bg-black focus:outline-none ring-2 ring-red-600"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>

                    {/* Cart Products details */}
                    <div className='md:w-1/3 h-auto shadow ring-red-600 ring-2 overflow-y-scroll'>
                        <div className="h-auto py-3 px-2">
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
                                                        <div className="flex justify-between text-base font-medium text-red-600">
                                                            <button type='button' onClick={() => router.push(`/products/${product.id}`)}>
                                                                <h3 className='text-left'> {product.name.substring(0, 35)} </h3>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="font-medium h-10 bg-opacity-10 w-8 m-1 bg-red-600 p-1"
                                                                onClick={() => removeItem(product.id)}
                                                            >
                                                                <TrashIcon className="h-6 w-6 text-red-600 hover:text-red-500" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <p className="mt-1 text-sm text-red-500">{product.color}</p>
                                                    </div>
                                                    <div className="flex items-end flex-1 justify-between">
                                                        <p className="text-red-500 text-sm">Qty {product.quantity}</p>
                                                        <p className="mx-2 text-md text-green-500">৳{product.price}</p>

                                                        {/* <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium"
                                                                onClick={() => removeItem(product.id)}
                                                            >
                                                                <TrashIcon className="h-6 w-6 text-red-600 hover:text-red-500" aria-hidden="true" />
                                                            </button>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 py-1 border-red-600 px-4 sm:px-6">
                            <div className="flex py-1 justify-between text-base font-medium text-red-700">
                                <p>Subtotal :</p>
                                <p className='text-green-500'>৳ {cartTotal}</p>
                            </div>
                            <div className="flex py-1 justify-between text-base font-medium text-red-700">
                                <p>Shipping :</p>
                                <p className='text-green-500'>৳ {shipping}</p>
                            </div>
                            <div className="flex py-1 justify-between text-base font-medium text-red-700">
                                <p>VAT (7%) :</p>
                                <p className='text-green-500'>৳ {vat}</p>
                            </div>
                            <div className="flex border-t-2 py-1 justify-between text-base font-medium text-red-700">
                                <p>Total :</p>
                                <p className='text-green-500'>৳ {total}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-red-500">Shipping and taxes are included</p>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default function Checkout() {

    const [success, setSuccess] = React.useState(false)

    return (
        <Layout>
            {!success ?
                <Checkouts setSuccess={setSuccess} />
                :
                <Success />
            }
        </Layout>
    )
}