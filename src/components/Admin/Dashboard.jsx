import React from 'react'
import AdminLayout from '../layout/AdminLayout'

function Dashboards() {

  return (
    <div className='grid w-[100%] grid-cols-1 gap-3 justify-around m-3 sm:grid-cols-2 lg:grid-cols-4'>
      <div className='p-3 mx-auto w-[100%] h-40 rounded-md bg-gray-200'>

      </div>
      <div className='p-3 mx-auto w-[100%] h-40 rounded-md bg-gray-200'>

      </div>
      <div className='p-3 mx-auto w-[100%] h-40 rounded-md bg-gray-200'>

      </div>
      <div className='p-3 mx-auto w-[100%] h-40 rounded-md bg-gray-200'>

      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AdminLayout>
      <Dashboards />
    </AdminLayout>
  )
}