import React, { Fragment } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { dataCategories } from '../../../data/CategoriesData';
import AdminLayout from '../../layout/AdminLayout'
import Search from '../../shared/Search';
import Link from 'next/link'
import { useRouter } from 'next/router';
import axiosRoot from '../../utils/axios-root';
import axiosAPI from '../../utils/axios-api';
import { Dialog, Transition } from '@headlessui/react';

export function Categories() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState([]);
    const [allSelected, setAllSelected] = React.useState(false)
    const [rows, setRows] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [confirm, setConfirm] = React.useState(false)

    function closeModal() {
        !confirm && (
            setConfirm(true)
        )
        setIsOpen(false)
    }

    // function openModal() {
    //     setIsOpen(true)
    // }

    //Get Data
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');
            setRows(res.data)
        }
        getCategory()
    }, []);

    // delete category 
    function handleDelete() {
        setIsOpen(true)

        confirm === true && (
            selected.map((item) =>
                axiosAPI.delete(`/categories/${item}`)
            ),
            router.reload()
        )
    }


    function handleAllChecked(event) {
        if (event.target.checked) {
            const newSelecteds = dataCategories.map((n) => n._id);
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
                                        Are you sure you want to deelte selected category?
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
                                        onClick={closeModal}
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

    const slugs = ['name', 'subCategories', 'createdAt']

    const search = (data) => {
        return data.filter((item) =>
            slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
        )
    }

    return (
        <div className="mx-3 mt-3 relative overflow-x-auto bg-red-100 shadow-md sm:rounded-lg">
            {modal}
            <div className='flex gap-2 justify-center py-1 bg-black'>
                <Search setSearchTerm={setSearchTerm} />
                <Link href='/admin/category/add'>
                    <a className='bg-white ml-4 text-sm font-medium text-black hover:bg-red-600 hover:text-white flex items-center my-1 px-3 rounded-full'>Add Category</a>
                </Link>
            </div>
            <table className="w-full text-sm text-left text-red-600">
                <thead className="text-xs text-black uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" onChange={handleAllChecked} type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-red-100 rounded border-red-300 focus:ring-red-500 focus:ring-2" />
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
                                    <button type='button' onClick={handleDelete}>
                                        <TrashIcon className='h-5 w-5 text-red-600' />
                                    </button>
                                </>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {search(rows).map((item, index) => {
                        const isItemSelected = isSelected(item._id);
                        return (
                            <tr key={index} className="bg-white border-b">
                                <td className="p-4 w-4">
                                    <div className="flex items-center">
                                        <input onChange={(event) => handleChecked(event, item._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-red-100 rounded border-red-300 focus:ring-red-500 focus:ring-2" />
                                        <label htmlFor="checkbox" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {item.name}
                                </th>
                                <td className="py-4 px-6">
                                    {item.subCategories.length}
                                </td>
                                <td className="py-4 px-6">
                                    {item.createdAt}
                                </td>
                                <td className="py-4 px-6">
                                    <button type='button' onClick={() => router.push('/admin/category/' + item._id)}>
                                        <p className="font-medium text-gray-400 hover:underline">
                                            <PencilAltIcon className='h-5 w-5' />
                                        </p>
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

export function CategoriesList() {
    return (
        <AdminLayout>
            <Categories />
        </AdminLayout>
    )
}