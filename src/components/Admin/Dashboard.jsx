import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import { ProductsLists } from './products/ProductsList'

function Dashboards() {

  return (
    <div className='grid grid-cols-1 gap-3 justify-around mx-3 my-3 sm:grid-cols-2 lg:grid-cols-4'>
      <div className='p-3 items-center grid mx-auto w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Total Products</h1>
        <h1 className='text-5xl text-gray-500'>10,000</h1>
      </div>
      <div className='p-3 mx-auto grid items-center w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Total Orders</h1>
        <h1 className='text-5xl text-gray-500'>1,000</h1>
      </div>
      <div className='p-3 grid items-center mx-auto w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Total Sell</h1>
        <p className='text-green-500'>(Last 3 Weeks)</p>
        <h1 className='text-5xl text-gray-500'>$ 10,0000</h1>
      </div>
      <div className='p-3 mx-auto grid items-center w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Out of Stock</h1>
        <p className='text-green-500'>(Last 2 Weeks)</p>
        <h1 className='text-5xl text-gray-500'>104</h1>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AdminLayout>
      <Dashboards />
      <ProductsLists />
    </AdminLayout>
  )
}