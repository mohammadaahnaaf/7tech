import React from 'react'
import AdminLayout from '../../layout/AdminLayout'

function Order() {
  return (
    <div className="mx-3 mt-3 overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Order ID
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Qty
            </th>
            <th scope="col" className="py-3 px-6">
              Price
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Edit</span>
              {/* Action */}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b hover:bg-gray-50">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
              #01
            </th>
            <td className="py-4 px-6">
              Paid
            </td>
            <td className="py-4 px-6">
              3 Products
            </td>
            <td className="py-4 px-6">
              $2999
            </td>
            <td className="py-4 px-6 text-right">
              <a href="#" className="font-medium text-red-600 hover:underline">Edit</a>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
              #02
            </th>
            <td className="py-4 px-6">
              Paid
            </td>
            <td className="py-4 px-6">
              2 Products
            </td>
            <td className="py-4 px-6">
              $1999
            </td>
            <td className="py-4 px-6 text-right">
              <a href="#" className="font-medium text-red-600 hover:underline">Edit</a>
            </td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
              #03
            </th>
            <td className="py-4 px-6">
              Shipped
            </td>
            <td className="py-4 px-6">
              1 Products
            </td>
            <td className="py-4 px-6">
              $99
            </td>
            <td className="py-4 px-6 text-right">
              <a href="#" className="font-medium text-red-600 hover:underline">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function Orders() {
  return (
    <AdminLayout>
      <Order />
    </AdminLayout>
  )
}