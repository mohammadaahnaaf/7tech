import React, { Fragment } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { dataCategories } from '../../../data/CategoriesData';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDebounce } from 'use-debounce';
import axiosRoot from '../../utils/axios-root';
import axiosAPI from '../../utils/axios-api';
import { Dialog, Transition } from '@headlessui/react';
import { fDate } from '../../utils/formatTime';
import { AdminLayout } from '@seventech/layout';
import { Pagenation, Search, SuccessText } from '@seventech/shared';

export function Categories() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState([]);
    const [allSelected, setAllSelected] = React.useState(false)
    const [rows, setRows] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [success, setSuccess] = React.useState('')
    const [pageSize, setPageSize] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const [searchedName] = useDebounce(searchTerm, 400);

    function closeModal() {
        setIsOpen(false)
    }

    //Get Data
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get(`/categories?page=${page + 1}&size=${pageSize}&categoryName=${searchedName}`);
            setRows(res.data)
        }
        getCategory()
    }, [success, page, pageSize, searchedName]);

    // delete category 
    function handleDelete(e) {
        e.preventDefault()
        setIsOpen(false)
        selected.map((item) =>
            axiosAPI.delete(`/categories/${item}`)
        )
        setSuccess('Category Deleted')
        setTimeout(() => {
            setSuccess('')
        }, 2000)
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

    const slugs = ['name', 'subCategories', 'createdAt']

    const search = (data) => {
        return data.filter((item) =>
            slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
        )
    }

    return (
        <div className="mx-3 mt-3 relative overflow-x-auto bg-red-100 shadow-md sm:rounded-lg">
            {modal}
            <SuccessText success={success} />
            {/* <ErrorText error={error} /> */}
            <div className='flex justify-center w-full py-1 bg-black'>
                <div className='md:w-1/3'>
                    <Search setSearchTerm={setSearchTerm} />
                </div>
                <Link href='/admin/category/add'>
                    <a className='bg-black ml-4 text-sm font-medium text-red-600 ring-1 ring-red-600 hover:bg-red-600 hover:text-white flex items-center my-1 px-3 rounded-full'>Add Category</a>
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
                                    <button type='button' onClick={() => setIsOpen(true)}>
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
                                    {fDate(item.createdAt)}
                                </td>
                                <td className="py-4 px-6">
                                    <button type='button' onClick={() => router.push('/admin/category/' + item._id)}>
                                        <p className="font-medium text-gray-400 hover:text-red-600">
                                            <PencilAltIcon className='h-5 w-5' />
                                        </p>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagenation page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />

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