import React from 'react';
import { TrashIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart'
import Layout from '../layout/Layout'
import axiosAPI from '../utils/axios-api';

export function Carts() {

    const router = useRouter()
    const { removeItem, items } = useCart()
    const countSubtotal = (i) => i.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    const subtotal = countSubtotal(items)
    // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    // const [user, setUser] = React.useState({})
    // const subtotal = countSubtotal(products)

    // React.useEffect(() => {
    //     if (!isLoggedIn) {

    //         axiosAPI
    //             .get('/auth/get-me')
    //             .then(res => {
    //                 setIsLoggedIn(!!res.data.email);
    //                 setUser(res.data);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }, [isLoggedIn]);

    return (
        <div className="min-h-screen bg-black py-6 sm:px-6 lg:px-8">
            {/* container begains from here */}
            <div className="max-w-5xl mx-auto mt-5 flex max-h-screen flex-col overflow-y-scroll bg-red-600 bg-opacity-10 ring-2 ring-red-600 shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <h2 className="text-xl lg:text-4xl text-center w-full font-large text-red-600"> Shopping Cart </h2>
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-red-200">
                                {items.map((product) => (<li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            alt='product image'
                                            src={product.imageSrc}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-red-600">
                                                <button type='button' onClick={() => router.push(`/products/${product.id}`)}>
                                                    <h3> {product.name} </h3>
                                                </button>
                                                <p className="ml-4 text-green-500">৳ {product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-red-500">{product.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-red-500">Qty {product.quantity}</p>

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
                    <div className="flex items-end justify-between text-base font-medium text-green-500">
                        <p>Subtotal :</p>
                        <p>৳ {subtotal}</p>
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
                    <p className="mt-0.5 text-sm text-red-500">Shipping and taxes shall be calculated at checkout.</p>
                    <div className="mt-6">
                        <a
                            href="/checkout"
                            className="flex items-center justify-center border-red-600 border-2 bg-red-600 bg-opacity-10 px-6 py-3 text-base font-medium text-red-600 shadow-sm hover:bg-black"
                        >
                            Checkout
                        </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-md text-red-600">
                        <p>
                            Or{' '}
                            <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                            // onClick={() => setOpen(false)}

                            >
                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Cart() {
    return (
        <Layout>
            <Carts />
        </Layout>
    )
}