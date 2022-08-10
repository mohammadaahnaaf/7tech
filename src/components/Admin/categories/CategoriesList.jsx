import { MailIcon, PencilAltIcon, TranslateIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react'
import { dataCategories } from '../../../data/CategoriesData';
// import { subscribers } from '../../data/Subscribers';
import { subscribers } from '../../../data/Subscribers'
import AdminLayout from '../../layout/AdminLayout'
import Search from '../../shared/Search';

export function Categories() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState([]);
    const [allSelected, setAllSelected] = React.useState(false)
    console.log(searchTerm)

    function handleAllChecked(event) {
        if (event.target.checked) {
            const newSelecteds = subscribers.map((n) => n.id);
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

    return (
        <div className="mx-3 mt-3 overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className='flex gap-2 justify-center py-1 bg-black'>
                <Search setSearchTerm={setSearchTerm} />
                <Link href='/admin/category/add'>
                    <a className='bg-white ml-4 text-sm font-medium text-black hover:bg-red-600 hover:text-white flex items-center py-0 px-3 rounded-lg'>Add Category</a>
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
                            Category Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Subcategories
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Created At
                        </th>
                        <th scope="col" className="py-3 px-6">
                            {selected != 0 && (
                                <>
                                    <button type='button'>
                                        <TrashIcon className='h-5 w-5 text-red-600' />
                                    </button>
                                </>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataCategories.filter((row) => {
                        if (searchTerm === "") {
                            return row;
                        } else if (row.name.toString().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                            return row;
                        } else if (row.childs.map((item) => item.name.toLowerCase()).includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                            return row;
                        } return ""
                    }).map((item, index) => {
                        const isItemSelected = isSelected(item.id);
                        return (
                            <tr key={index} className="bg-white border-b">
                                <td class="p-4 w-4">
                                    <div className="flex items-center">
                                        <input onChange={(event) => handleChecked(event, item.id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                                        <label htmlFor="checkbox" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {item.name}
                                </th>
                                <td className="py-4 px-6">
                                    {item.childs.length}
                                </td>
                                <td className="py-4 px-6">
                                    {item.createdAt}
                                </td>
                                <td className="py-4 px-6">
                                    <a href="/admin/products/details" className="font-medium text-gray-400 hover:underline">
                                        <PencilAltIcon className='h-5 w-5' />
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export function CategoriesList() {
    return (
        <AdminLayout>
            <Categories />
        </AdminLayout>
    )
}