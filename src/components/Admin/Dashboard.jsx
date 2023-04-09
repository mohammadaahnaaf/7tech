import React from 'react'
import { Order } from './orders/OrderList';
import { AdminLayout } from '@seventech/layout';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import axiosAPI from '@seventech/utils/axios-api';

function Dashboards() {

  const router = useRouter()

  // const total = (items) => items?.reduce((acc, curr) => acc + curr.total, 0);

  const [datas, setDatas] = React.useState({
    totalProducts: 0,
    totalOutOfStockProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0
  })

  React.useEffect(() => {
    async function getDashboard() {
      try {
        const res = await axiosAPI.get('/analytics');
        setDatas(res.data)
      } catch (error) {
        Router.push('/login')
        console.log(error)
      }
    }
    getDashboard()

  }, [router]);


  return (
    <div className='grid grid-cols-1 gap-3 justify-around mx-3 my-3 sm:grid-cols-2 lg:grid-cols-4'>

      <Card
        title='Total Products'
        // subtitle=''
        link='/admin/products'
        cardData={datas.totalProducts || 0}
      />
      <Card
        title='Total Orders'
        // subtitle=''
        link='/admin/orders'
        cardData={datas.totalOrders || 0}
      />
      <Card
        title='Total Customers'
        // subtitle=''
        link='/admin/subscribers'
        cardData={datas.totalUsers || 0}
      />
      <RedCard
        title='Out of Stock'
        // subtitle=''
        link='/admin/products'
        cardData={datas.totalOutOfStockProducts || 0}
      />
    </div>
  )
}

function Card({ cardData, title, link }) {
  return (
    <div className='p-3 items-center grid mx-auto w-[100%] h-40 rounded-md ring-white cursor-pointer ring-2 hover:ring-green-600 bg-white'>
      <Link href={link}>
        <a className='text-2xl hover:text-green-500 text-gray-500'>{title}</a>
      </Link>
      {/* <p className='text-green-500'>(Last 3 Weeks)</p> */}
      <h1 className='text-5xl text-green-500'>{cardData}</h1>
    </div>
  )
}
function RedCard({ cardData, title, link }) {
  return (
    <div className='p-3 items-center grid mx-auto w-[100%] h-40 rounded-md ring-white cursor-pointer ring-2 hover:ring-red-600 bg-white'>
      <Link href={link}>
        <a className='text-2xl hover:text-red-500 text-gray-500'>{title}</a>
      </Link>
      <h1 className='text-5xl text-red-500'>{cardData}</h1>
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