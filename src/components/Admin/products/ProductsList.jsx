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

  // get product data 
  React.useEffect(() => {
    async function getProducts() {
      const res = await axiosRoot.get('/products');
      setRows(res.data)
    }
    getProducts()
  }, []);

  // Delete Product 
  async function handleDelete() {
    await axiosAPI.delete(`/products/${selected}`);
    router.reload()
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
                <button type='submit' onClick={handleDelete}>
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
                  ${product.price}
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

export default function ProductsList() {
  return (
    <AdminLayout>
      <ProductsLists />
    </AdminLayout>
  )
}