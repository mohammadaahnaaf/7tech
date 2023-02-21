import React from 'react'
import axiosRoot from '../utils/axios-root';
import axiosAPI from '../utils/axios-api';
import { Order } from './orders/OrderList';
import { AdminLayout } from '@seventech/layout';
import { useRouter } from 'next/router';

function Dashboards() {

  const router = useRouter()

  const [orders, setOrders] = React.useState([])
  const total = (items) => items?.reduce((acc, curr) => acc + curr.total, 0);
  const totalSell = total(orders)

  const [datas, setDatas] = React.useState({
    totalProducts: 0,
    totalOutOfStockProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    // totalSells: 0,
    totalUsers: 0
  })

  React.useEffect(() => {
    async function getDashboard() {
      const res = await axiosRoot.get('/anaytics');
      setDatas(res.data)
    }
    async function getOrders() {
      const res = await axiosAPI.get('/orders');
      setOrders(res.data.orders)
    }
    getDashboard()
    getOrders()

  }, [router]);


  return (
    <div className='grid grid-cols-1 gap-3 justify-around mx-3 my-3 sm:grid-cols-2 lg:grid-cols-4'>
      <div className='p-3 items-center grid mx-auto w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Total Products</h1>
        <h1 className='text-5xl text-gray-500'>{datas.totalProducts || 0}</h1>
      </div>
      <div className='p-3 mx-auto grid items-center w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Total Orders</h1>
        <h1 className='text-5xl text-gray-500'>{datas.totalOrders || 0}</h1>
      </div>
      <div className='p-3 grid items-center mx-auto w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Total Sell</h1>
        <p className='text-green-500'>(Last 3 Weeks)</p>
        <h1 className='text-5xl text-gray-500'>৳ {totalSell}</h1>
      </div>
      <div className='p-3 mx-auto grid items-center w-[100%] h-40 rounded-md bg-white'>
        <h1 className='text-2xl text-gray-500'>Out of Stock</h1>
        <p className='text-green-500'>(Last 2 Weeks)</p>
        <h1 className='text-5xl text-red-500'>{datas.totalOutOfStockProducts}</h1>
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <AdminLayout>
      <Dashboards />
      <Order />
    </AdminLayout>
  )
}