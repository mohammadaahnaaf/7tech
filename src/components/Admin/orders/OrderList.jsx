import React from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import axiosAPI from '../../utils/axios-api'
import { fDate } from '../../utils/formatTime';
import Link from 'next/link';
import { Pagenation, Search, SuccessText } from '@seventech/shared';
import { AdminLayout } from '@seventech/layout';
import { useDebounce } from 'use-debounce';

export function Order() {

  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selected, setSelected] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false)
  const [orders, setOrders] = React.useState([]);
  const [success, setSuccess] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  // const [checked, setChecked] = React.useState(false)
  // const [checkedAll, setCheckedAll] = React.useState(false)

  const [searchedName] = useDebounce(searchTerm, 400);

  //Get Data
  React.useEffect(() => {
    async function getOrder() {
      const res = await axiosAPI.get(`/orders?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
      setOrders(res.data.orders)
      setTotal(res.data.count)
    }
    getOrder()
  }, [success, page, pageSize, searchedName]);

  function handleAllChecked(event) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n._id);
      setSelected(newSelecteds);
      setAllSelected(true)
      return;
    }
    setSelected([]);
    setAllSelected(false)
    // console.log(selected)
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

  // delete category 
  function handleDelete() {
    selected.map((item) =>
      axiosAPI.delete(`/orders/${item}`)
    )
    setSuccess('Order vanished')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  // const slugs = ['customer_name', 'customer_number', 'createdAt', 'total', '_id', 'status']

  // const search = (data) => {
  //   return data.filter((item) =>
  //     slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
  //   )
  // }

  return (
    <>
      <SuccessText success={success} />
      {/* <ErrorText error={error} /> */}
      <div className="mx-3 mt-3 bg-gray-100 overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className='flex justify-center w-full py-1 bg-red-600'>
          <div className='md:w-1/3 bg-white bg-opacity-50 rounded-full'>
            <Search searchButton={true} setSearchTerm={setSearchTerm} />
          </div>
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
                Order ID
              </th>
              <th scope="col" className="py-3 px-6">
                Customer name
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                {selected != 0 && (
                  <button type='button' onClick={handleDelete}>
                    <TrashIcon className='h-5 w-5 text-red-600' />
                  </button>
                )}
                <span className="sr-only">Edit</span>
                {/* Action */}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isItemSelected = isSelected(order._id);
              return (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input onChange={(event) => handleChecked(event, order._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                      <label htmlFor="checkbox" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    #STEO{index}
                  </td>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {order.customer_name}
                  </th>
                  <td className="py-4 px-6 hover:text-red-600">
                    <Link href={"tel:" + order.customer_number}>
                      <a>
                        {order.customer_number}
                      </a>
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    {fDate(order.createdAt)}
                  </td>
                  <td className="capitalize py-4 px-6">
                    {order.status || 0}
                  </td>
                  <td className="py-4 px-6">
                    ৳ {order.total}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type='button'
                      className="font-medium hover:text-red-600 text-gray-400 hover:underline"
                      onClick={() => router.push(`/admin/orders/${order._id}`)}
                    >
                      <PencilAltIcon className='h-5 w-5' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagenation total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
      </div>
    </>
  )
}

export function OrderList() {
  return (
    <AdminLayout>
      <Order />
    </AdminLayout>
  )
}