import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDebounce } from 'use-debounce';
import React, { Fragment } from 'react'
import axiosAPI from '../../utils/axios-api';
import axiosRoot from '../../utils/axios-root';
import { AdminLayout } from '@seventech/layout';
import { ErrorText, Pagenation, Search, SuccessText } from '@seventech/shared';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProductsLists() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selected, setSelected] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false)
  const [rows, setRows] = React.useState([]);
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false)
  const [pageSize, setPageSize] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0);

  const [searchedName] = useDebounce(searchTerm, 400);
  // get product data 
  React.useEffect(() => {
    async function getProducts() {
      const res = await axiosRoot.get(`/products?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
      setRows(res.data.products)
      setTotal(res.data.count)
    }
    getProducts()
  }, [router, success, page, pageSize, searchedName]);

  // Delete Product 
  function handleDelete(e) {
    e.preventDefault()
    setIsOpen(false)
    selected.map((item) =>
      axiosAPI.delete(`/products/${item}`)
    )
    setSuccess('Product deleted.')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  function handleAllChecked(event) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = rows?.map((n) => n._id);
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
  // const slugs = ['code', 'name', 'category', 'tags', 'price']

  // const search = (data) => {
  //   return data.filter((item) =>
  //     slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
  //   )
  // }
  function closeModal() {
    setIsOpen(false)
  }

  const modal = (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40" />
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
                    Are you sure you want to delete selected product?
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
      {isOpen && modal}
      <SuccessText success={success} />
      <ErrorText error={error} />
      <div className='flex justify-center w-full py-1 bg-red-600'>
        <div className='md:w-1/3 bg-white bg-opacity-50 rounded-full'>
          <Search searchButton={true} setSearchTerm={setSearchTerm} />
        </div>
        <Link href='/admin/products/add'>
          <a className='hover:bg-white ml-4 text-sm font-medium hover:text-red-600 ring-1 ring-white bg-red-600 text-white flex items-center my-1 px-3 rounded-full'>Add Product</a>
        </Link>
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
              Code
            </th>
            <th scope="col" className="py-3 px-6">
              Product name
            </th>
            <th scope="col" className="py-3 text-center px-6 w-auto">
              Category
            </th>
            <th scope="col" className="py-3 px-6">
              Qty
            </th>
            <th scope="col" className="py-3 px-6">
              Price
            </th>
            <th scope="col" className="py-3 text-center px-2">
              {selected != 0 ? (
                <button type='submit' className='flex items-center py-1 rounded-md text-center w-full bg-red-600 bg-opacity-20' onClick={() => setIsOpen(true)}>
                  <TrashIcon className='h-5 w-5 mx-auto text-red-600' />
                </button>
              ) : (
                <span>Edit</span>
              )}
              <span className="sr-only">Edit</span>
              {/* Action */}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((product, index) => {
            const isItemSelected = isSelected(product._id);
            return (
              <tr key={index} className={classNames(
                product.inStock ? 'text-gray-800' : 'text-red-400 border-b-red-600 hover:bg-red-50',
                "border-b hover:bg-gray-50 bg-white"
              )}>
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input onChange={(event) => handleChecked(event, product._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                    <label htmlFor="checkbox" className="sr-only">checkbox</label>
                  </div>
                </td>
                <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                  {product.code}
                </td>
                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                  {product.name}
                </th>
                <td scope='row' className="py-4 px-2 flex justify-center items-center text-center">
                  {product.category}
                </td>
                <td className="py-4 px-6">
                  {product.quantity}
                </td>
                <td className="flex gap-1 py-4 px-6">
                  <span>৳</span> {product.onlinePrice}
                </td>
                <td className="py-4 px-6 text-right">
                  <button type='button' onClick={() => router.push(`/admin/products/${product._id}`)}>
                    <p className="font-medium text-red-400 hover:text-red-600">
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

      <Pagenation total={total} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} page={page} />

    </div>
  )
}

export function ProductList() {
  return (
    <AdminLayout>
      <ProductsLists />
    </AdminLayout>
  )
}