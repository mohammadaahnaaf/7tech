import React, { useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart';
import Router from 'next/router'
// import { products } from '../../data/ProductsData'


function Success() {

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
        <div className="grid min-h-screen justify-center max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className='ring-4 overflow-scroll rounded-lg ring-gray-300 px-10'>
                <div>
                    <CheckIcon className='bg-green-500 mx-auto text-white rounded-full h-20 w-20 my-10' />
                    <h1 className='text-green-500 text-4xl text-center'>Thank you</h1>
                    <h1 className='text-gray-500 text-sm py-2 text-center'>Your order has been recived</h1>

                </div>
                {/* <Link href='/' className='text-center'>
                    <a className='text-center py-3'>Back to home</a>
                </Link> */}
                <div className='grid grid-cols-1 mx-auto mt-3 gap-3 justify-between items-center sm:grid-cols-2 lg:grid-cols-4'>
                    <div className='p-3 mx-auto w-36 rounded-md bg-gray-200'>
                        <h1 className='text-center text-xs text-gray-500'>Order nunmer:</h1>
                        <h1 className='text-center text-sm'>#1</h1>
                    </div>
                    <div className='p-3 mx-auto w-36 rounded-md bg-gray-200'>
                        <h1 className='text-center text-xs text-gray-500'>Created at:</h1>
                        <h1 className='text-center text-sm'>3 days ago</h1>
                    </div>

                    <div className='p-3 mx-auto w-36 rounded-md bg-gray-200'>
                        <h1 className='text-center text-xs text-gray-500'>Total:</h1>
                        <h1 className='text-center text-sm'>$ {cartTotal}</h1>
                    </div>
                    
                    <div className='p-3 mx-auto w-36 rounded-md bg-gray-200'>
                        <h1 className='text-center text-xs text-gray-500'>Status:</h1>
                        <h1 className='text-center text-sm'>Paid</h1>
                    </div>
                </div>
                <ProductsViews />
                <div>
                    <button className='text-sm hover:text-red-600 text-green-600' type='button' onClick={handleSuccess}>Back to home</button>
                </div>
            </div>
        </div>
    )
}

const ProductsViews = () => {
    const { items, cartTotal, totalItems } = useCart()
    // const totalItems = 12;
    // const cartTotal = 172300;

    return (
        <div className="overflow-x-auto relative my-5">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-green-100">
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
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {item.name}
                            </th>
                            <td className="py-4 px-6">
                                {item.quantity}
                            </td>
                            <td className="py-4 px-6">
                                $ {item.price}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>Total</th>
                        <td className="py-4 px-6">{totalItems}</td>
                        <td className="py-4 px-6">৳ {cartTotal}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Success;