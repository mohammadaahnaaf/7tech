import React, { useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart';
import Router from 'next/router'
// import { products } from '../../data/ProductsData'


function Success({order}) {

    const { emptyCart, cartTotal } = useCart();
    // const cartTotal = 172300;

    function handleSuccess() {

        const { pathname } = Router
        if (pathname == '/checkout') {
            Router.push('/')
        }

        emptyCart(true)
    }

    return (
        <div className="grid min-h-screen overflow-scroll bg-black justify-centerpy-6 sm:px-6 lg:px-8">
            <div className=' max-w-5xl mx-auto bg-gray-600 bg-opacity-50 my-4 rounded-lg shadow-md px-10'>
                <div>
                    <CheckIcon className='bg-green-500 mx-auto text-white rounded-full h-20 w-20 my-10' />
                    <h1 className='text-green-500 text-4xl text-center'>Thank you</h1>
                    <h1 className='text-gray-200 text-sm py-2 text-center'>Your order has been recived</h1>

                </div>
                {/* <Link href='/' className='text-center'>
                    <a className='text-center py-3'>Back to home</a>
                </Link> */}
                <div className='grid grid-cols-1 mx-auto mt-3 gap-3 justify-between items-center sm:grid-cols-2 lg:grid-cols-4'>
                    <div className='p-3 mx-auto w-36 rounded-md bg-green-500 bg-opacity-20'>
                        <h1 className='text-center text-xs text-gray-200'>Order nunmer:</h1>
                        <h1 className='text-center text-gray-100 text-sm'>{order._id}</h1>
                    </div>
                    <div className='p-3 mx-auto w-36 rounded-md bg-green-500 bg-opacity-20'>
                        <h1 className='text-center text-xs text-gray-200'>Created at:</h1>
                        <h1 className='text-center text-gray-100 text-sm'>Just now</h1>
                    </div>

                    <div className='p-3 mx-auto w-36 rounded-md bg-green-500 bg-opacity-20'>
                        <h1 className='text-center text-xs text-gray-200'>Subtotal:</h1>
                        <h1 className='text-center text-gray-100 text-sm'>৳ {cartTotal}</h1>
                    </div>

                    <div className='p-3 mx-auto w-36 rounded-md bg-green-500 bg-opacity-20'>
                        <h1 className='text-center text-xs text-gray-200'>Status:</h1>
                        <h1 className='text-center text-gray-100 text-sm'>Pending</h1>
                    </div>
                </div>
                <ProductsViews />
                <div className='py-3 flex items-center justify-center bg-green-400 bg-opacity-20 mx-auto'>
                    <button className='text-sm hover:text-red-600 text-center text-green-600' type='button' onClick={handleSuccess}>Back to home</button>
                </div>
            </div>
        </div>
    )
}

const ProductsViews = () => {
    const { items, cartTotal, totalItems } = useCart()
    let vat = (cartTotal * (7 / 100)).toFixed(2)
    let shipping = items.length * 100
    let total = (+ vat + shipping + cartTotal)

    return (
        <div className="overflow-y-scroll relative my-5">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-200 uppercase bg-green-500 bg-opacity-20">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Product name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Qty
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="border-b">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-100 whitespace-nowrap">
                                {index + 1}{'.  '} {item.name}
                            </th>
                            <td className="py-4 px-6">
                                {item.quantity}
                            </td>
                            <td className="py-4 px-6">
                                ৳ {item.price}
                            </td>
                        </tr>
                    ))}
                    <tr className=' bg-green-400 text-gray-200 bg-opacity-10 border-b'>
                        <th className='py-4 px-6 font-medium whitespace-nowrap'>Subtotal:</th>
                        <td className="py-4 px-6">{totalItems}</td>
                        <td className="py-4 px-6">৳ {cartTotal}</td>
                    </tr>
                    <tr>
                        <th className='py-4 px-6 font-medium text-gray-200 whitespace-nowrap'>Total: (with shipping cost)</th>
                        <td className="text-gray-200 py-4 px-6">{''}</td>
                        <td className="text-gray-200 py-4 px-6">৳ {total}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Success;