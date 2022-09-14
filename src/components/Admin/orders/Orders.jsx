import React from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import AdminLayout from '../../layout/AdminLayout'
import Search from '../../shared/Search';
import axiosAPI from '../../utils/axios-api'

// import { orders } from '../../../data/OrderList';

export function Order() {

  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selected, setSelected] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false)
  const [orders, setOrders] = React.useState([]);

  // const [checked, setChecked] = React.useState(false)
  // const [checkedAll, setCheckedAll] = React.useState(false)

  //Get Data
  React.useEffect(() => {
    async function getCategory() {
      const res = await axiosAPI.get('/orders');
      setOrders(res.data)
    }
    getCategory()
  }, []);

  function handleAllChecked(event) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.id);
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

    <div className="mx-3 mt-3 bg-red-100 overflow-x-auto relative shadow-md sm:rounded-lg">
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
              Quantity
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
          {orders.filter((row) => {
            if (searchTerm === "") {
              return row;
            } else if (row.phone.toString().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
              return row;
            } else if (row.name.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
              return row;
            } else if (row.total === (typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
              return row;
            } return ""
          }).map((order, index) => {
            const isItemSelected = isSelected(order.id);
            return (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td class="p-4 w-4">
                  <div className="flex items-center">
                    <input onChange={(event) => handleChecked(event, order.id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                    <label htmlFor="checkbox" className="sr-only">checkbox</label>
                  </div>
                </td>
                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  #{order._id}
                </td>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {order.customer_name}
                </th>
                <td className="py-4 px-6">
                  {order.customer_phone}
                </td>
                <td className="py-4 px-6">
                  {order.createdAt}
                </td>
                <td className="py-4 px-6">
                  {order.qty}
                </td>
                <td className="py-4 px-6">
                  ${order.total}
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    type='button'
                    className="font-medium text-gray-400 hover:underline"
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
      <div className='p-2 flex justify-end'>
        <Pagenation />
      </div>
    </div>
  )
}

function Pagenation() {
  return (
    <nav className='flex items-center gap-2' aria-label="Page navigation example">
      <p className='text-sm'>Pages</p>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button type='button' className="block py-2 px-3 ml-0 leading-tight text-red-600 bg-white rounded-l-lg border border-red-300 hover:bg-red-100 hover:text-black ">
            <span className="sr-only">Previous</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </button>
        </li>
        <li>
          <button type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black">1</button>
        </li>
        <li>
          <button type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black">2</button>
        </li>
        <li>
          <button type='button' aria-current="page" className="z-10 py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black ">3</button>
        </li>
        <li>
          <button type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black">4</button>
        </li>
        <li>
          <button type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black ">5</button>
        </li>
        <li>
          <button type='button' className="block py-2 px-3 leading-tight text-red-600 bg-white rounded-r-lg border border-red-300 hover:bg-red-100 hover:text-black ">
            <span className="sr-only">Next</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default function Orders() {
  return (
    <AdminLayout>
      <Order />
    </AdminLayout>
  )
}