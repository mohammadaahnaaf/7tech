import React from 'react'
import { Footers } from '../shared/Footer'
import Navbar from '../shared/Navbar'

function Dashboards() {
  return (
    <div className='h-[100vh]'>
      <h1 className='py-10 text-red-600 text-center text-5xl'>Admin Dashboard</h1>
    </div>
  )
}

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Dashboards />
      <Footers />
    </>
  )
}