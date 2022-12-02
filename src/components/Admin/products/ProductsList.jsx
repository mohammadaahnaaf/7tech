import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Router, { useRouter } from 'next/router';
import React from 'react'
import { products } from '../../../data/ProductsData'
import AdminLayout from '../../layout/AdminLayout'
import Search from '../../shared/Search';
import axiosAPI from '../../utils/axios-api';
import axiosRoot from '../../utils/axios-root';

export function ProductsLists() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selected, setSelected] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false)
  const [rows, setRows] = React.useState([]);
  const [success, setSuccess] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)

  // get product data 
  React.useEffect(() => {
    async function getProducts() {
      const res = await axiosRoot.get('/products');
      setRows(res.data)
    }
    getProducts()
  }, [router, success]);

  // Delete Product 
  function handleDelete(e) {
    e.preventDefault()
    setIsOpen(false)
    // await axiosAPI.delete(`/products/${selected}`);
    selected.map((item) =>
      axiosAPI.delete(`/products/${item}`)
    )
    setSuccess('Product deleted.')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  function handleAllChecked(event) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n._id);
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
  const slugs = ['name', 'category', 'tags', 'price', 'code', 'quantity']

  const search = (data) => {
    return data.filter((item) =>
      slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
    )
  }

  const modal = (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-red-600"
                >
                  Delete Category
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete selected category?
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )

  return (

    <div className="mx-3 mt-3 overflow-x-auto bg-red-100 relative shadow-md sm:rounded-lg">
      <div className='flex justify-center py-1 bg-black'>
        <Search setSearchTerm={setSearchTerm} />
      </div>
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
                <button type='submit' onClick={() => setIsOpen(true)}>
                  <TrashIcon className='h-5 w-5 text-red-600' />
                </button>
              )}
              <span className="sr-only">Edit</span>
              {/* Action */}
            </th>
          </tr>
        </thead>
        <tbody>
          {search(rows).map((product, index) => {
            const isItemSelected = isSelected(product._id);
            return (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td class="p-4 w-4">
                  <div className="flex items-center">
                    <input onChange={(event) => handleChecked(event, product._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                    <label htmlFor="checkbox" className="sr-only">checkbox</label>
                  </div>
                </td>
                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.code}
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
                  Tk {product.price}
                </td>
                <td className="py-4 px-6 text-right">
                  <button type='button' onClick={() => router.push(`/admin/products/${product._id}`)}>
                    <p className="font-medium text-gray-400 hover:underline">
                      <PencilAltIcon className='h-5 w-5' />
                    </p>
                  </button>
                  {/* <a href="/admin/products/details" className="font-medium text-gray-400 hover:underline"><PencilAltIcon className='h-5 w-5' /> </a> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='p-2 flex justify-end'>
        <Pagenation setPage={setPage} page={page} />
      </div>
    </div>
  )
}

function Pagenation({ page, setPage }) {
  let total = 50
  return (
    <nav className='flex items-center gap-2' aria-label="Page navigation example">
      <p className='text-sm'>Pages</p>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button type='button' onClick={() => setPage(page - 1)} className="block py-2 px-3 ml-0 leading-tight text-red-600 bg-white rounded-l-lg border border-red-300 hover:bg-red-100 hover:text-black ">
            <span className="sr-only">Previous</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </button>
        </li>
        {total > 24 && (
          [0, 1, 2, 3].map((pages) => (
            <li key={pages}>
              <button onClick={() => setPage(pages + 1)} type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black">{pages + 1}</button>
            </li>
          ))
        )}
        <li>
          <button type='button' onClick={() => setPage(1 + page)} className="block py-2 px-3 leading-tight text-red-600 bg-white rounded-r-lg border border-red-300 hover:bg-red-100 hover:text-black ">
            <span className="sr-only">Next</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default function ProductsList() {
  return (
    <AdminLayout>
      <ProductsLists />
    </AdminLayout>
  )
}