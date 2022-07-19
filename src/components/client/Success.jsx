import { CheckIcon } from '@heroicons/react/outline'
// import Link from 'next/link'
import React from 'react'

function Success() {
    return (
        <div className="grid min-h-screen justify-center max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className='ring-4 rounded-lg ring-gray-300 px-10'>
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
                        <h1 className='text-center text-sm'>$ 2001</h1>
                    </div>
                    <div className='p-3 mx-auto w-36 rounded-md bg-gray-200'>
                        <h1 className='text-center text-xs text-gray-500'>Status:</h1>
                        <h1 className='text-center text-sm'>Paid</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Success