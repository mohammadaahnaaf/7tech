import React from 'react'
import AdminLayout from '../../layout/AdminLayout'

function ProductsLists() {
  return (

    <div className="mx-3 mt-3 overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Product name
            </th>
            <th scope="col" className="py-3 px-6">
              Color
            </th>
            <th scope="col" className="py-3 px-6">
              Category
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
              Apple MacBook Pro 17"
            </th>
            <td className="py-4 px-6">
              Sliver
            </td>
            <td className="py-4 px-6">
              Laptop
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
              Microsoft Surface Pro
            </th>
            <td className="py-4 px-6">
              White
            </td>
            <td className="py-4 px-6">
              Laptop PC
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
              Magic Mouse 2
            </th>
            <td className="py-4 px-6">
              Black
            </td>
            <td className="py-4 px-6">
              Accessories
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

export default function ProductsList() {
  return(
    <AdminLayout>
      <ProductsLists />
    </AdminLayout>
  )
}