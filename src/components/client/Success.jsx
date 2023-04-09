import React from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { useCart } from 'react-use-cart';
import Router from 'next/router'


export function Success({ order }) {

    const { emptyCart, cartTotal, totalUniqueItems } = useCart();

    function handleSuccess() {

        const { pathname } = Router
        if (pathname === '/checkout') {
            Router.push('/')
        }

        emptyCart(true)
    }

    return (
        <div className='min-h-screen py-6 bg-black'>
            <div className='bg-red-600 mx-auto rounded-lg bg-opacity-10 max-w-5xl h-full p-2 md:p-6'>
                <div className='grid gap-2 items-center'>
                    <CheckIcon className='bg-green-500 justify-self-center text-white rounded-full h-20 w-20' />
                    <h1 className='text-green-500 text-4xl text-center'>Thank You</h1>
                    <h1 className='text-gray-200 text-sm py-2 text-center'>Your order has been recived</h1>

                </div>

                <div className='grid gap-4 items-center grid-cols-2 p-4 lg:grid-cols-5'>
                    <div className='cols-span-1 text-center text-gray-100 bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Order ID</h2>
                        <h2>#01</h2>
                    </div>
                    <div className='cols-span-1 text-center text-gray-100 bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Total Price</h2>
                        <h2>TK {cartTotal}</h2>
                    </div>
                    <div className='cols-span-1 text-center text-gray-100 bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Ordered At</h2>
                        <h2>Just Now</h2>
                    </div>
                    <div className='cols-span-1 text-center text-gray-100 bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Order Status</h2>
                        <h2>Pending</h2>
                    </div>
                    <div className='cols-span-1 text-center text-gray-100 bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Total Products</h2>
                        <h2>{totalUniqueItems}</h2>
                    </div>
                </div>

                <ProductsViews order={order} />

                <div className='p-4 mx-4 flex items-center justify-center bg-green-400 bg-opacity-20'>
                    <button className='text-sm hover:text-red-600 text-center text-green-600' type='button' onClick={handleSuccess}>Back to home</button>
                </div>
            </div>
        </div>
    )
}

function ProductsViews({ order }) {
    const { items, cartTotal, totalItems } = useCart()
    const [ship, setShip] = React.useState(0)
    React.useEffect(() => {
        if (order.city === 'Dhaka') {
            setShip(60)
        } else {
            setShip(120)
        }
    }, [order])

    // let shipping = items.length * ship
    // let total = (shipping + cartTotal)

    return (
        <div className="overflow-y-auto relative p-4">
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
                        <th className='py-4 px-6 font-medium text-gray-200 '>Total: (with shipping cost)</th>
                        <td className="text-gray-200 py-4 px-6">{''}</td>
                        <td className="text-gray-200 py-4 px-6">৳ {+cartTotal + ship}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}