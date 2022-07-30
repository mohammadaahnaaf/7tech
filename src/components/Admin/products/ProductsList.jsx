import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import React from 'react'
import { products } from '../../../data/ProductsData'
import AdminLayout from '../../layout/AdminLayout'

export function ProductsLists() {

  // const [checked, setChecked] = React.useState(false)
  // const [checkedAll, setCheckedAll] = React.useState(false)
  const [selected, setSelected] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false)

  function handleAllChecked(event) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.id);
      setSelected(newSelecteds);
      setAllSelected(true)
      return;
    }
    setSelected([]);
    setAllSelected(false)
  }

  const handleChecked = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1 || allSelected;

  // function handleChecked() {
  //   !checked ? setChecked(true) : setChecked(false)
  // }

  return (

    <div className="mx-3 mt-3 overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" onChange={handleAllChecked} type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              ID
            </th>
            <th scope="col" className="py-3 px-6">
              Product name
            </th>
            <th scope="col" className="py-3 px-6">
              Qty
            </th>
            <th scope="col" className="py-3 px-6">
              Category
            </th>
            <th scope="col" className="py-3 px-6">
              Price
            </th>
            <th scope="col" className="py-3 px-6">
              {selected != 0 && (
                <button type='button'>
                  <TrashIcon className='h-5 w-5 text-red-600' />
                </button>
              )}
              <span className="sr-only">Edit</span>
              {/* Action */}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const isItemSelected = isSelected(product.id);
            return (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td class="p-4 w-4">
                  <div className="flex items-center">
                    <input onChange={(event) => handleChecked(event, product.id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                    <label htmlFor="checkbox" className="sr-only">checkbox</label>
                  </div>
                </td>
                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.id}
                </td>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.name}
                </th>
                <td className="py-4 px-6">
                  {product.quantity}
                </td>
                <td className="py-4 px-6">
                  {product.category}
                </td>
                <td className="py-4 px-6">
                  ${product.price}
                </td>
                <td className="py-4 px-6 text-right">
                  <a href="/admin/products/details" className="font-medium text-gray-400 hover:underline"><PencilAltIcon className='h-5 w-5' /> </a>
                </td>
              </tr>
            )
          })}
          {/* <tr className="bg-white border-b hover:bg-gray-50">
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
          </tr> */}
          {/* <tr className="bg-white hover:bg-gray-50">
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
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default function ProductsList() {
  return (
    <AdminLayout>
      <ProductsLists />
    </AdminLayout>
  )
}