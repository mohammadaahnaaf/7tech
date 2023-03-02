import { Dialog, Transition } from '@headlessui/react';
import { MailIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { AdminLayout } from '@seventech/layout';
import Link from 'next/link';
import React, { Fragment } from 'react'
import { Pagenation, Search, SuccessText } from '@seventech/shared';
import { useDebounce } from 'use-debounce';
import axiosAPI from '@seventech/utils/axios-api';

function Subscriber() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState([]);
    const [allSelected, setAllSelected] = React.useState(false)
    const [subscribers, setSubscribers] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const [success, setSuccess] = React.useState('')

    const [searchedName] = useDebounce(searchTerm, 400);

    //Get Data
    React.useEffect(() => {
        async function getUsers() {
            const res = await axiosAPI.get(`/user?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
            setSubscribers(res.data.users)
            setTotal(res.data.count)
        }
        getUsers()
    }, [success, searchedName, pageSize, page]);

    function closeModal() {
        setIsOpen(false)
    }


    // delete user
    function handleDelete() {
        setIsOpen(false)
        selected?.map((item) =>
            axiosAPI.delete(`/user/${item}`)
        ),
            setSuccess('User Vanished')
    }

    function handleAllChecked(event) {
        if (event.target.checked) {
            const newSelecteds = subscribers.map((n) => n._id);
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

    // const slugs = ['fullName', 'email', 'phoneNumber']

    // const search = (data) => {
    //     return data.filter((item) =>
    //         slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
    //     )
    // }

    return (
        <>
            <SuccessText success={success} />
            <div className="mx-3 mt-3 bg-red-100 overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className='flex justify-center w-full py-1 bg-black'>
                    <div className='md:w-1/3'>
                        <Search searchButton={true} setSearchTerm={setSearchTerm} />
                    </div>
                </div>
                {modal}
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
                                User name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Phone no
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {selected != 0 && (
                                    <div className='flex items-center justify-between'>
                                        <button type='button'>
                                            <MailIcon className='h-5 w-5 text-green-600' />
                                        </button>
                                        <button onClick={() => setIsOpen(true)} type='button'>
                                            <TrashIcon className='h-5 w-5 text-red-600' />
                                        </button>
                                    </div>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers?.map((item, index) => {
                            const isItemSelected = isSelected(item._id);

                            {/* .slice(0, n) is used to get a range of items from Array[] */ }
                            return (
                                <tr key={index} className="bg-white border-b">
                                    <td className="p-4 w-4">
                                        <div className="flex items-center">
                                            <input onChange={(event) => handleChecked(event, item._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                                            <label htmlFor="checkbox" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="flex gap-2 items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {item.isAdmin ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                            </svg>

                                        )}   {item.fullName}
                                    </th>
                                    <td className="py-4 px-6">
                                        <Link href={`tel:${item.phoneNumber}`}>
                                            <a>{item.phoneNumber}</a>
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Link href={`mailto:${item.email}`}>
                                            <a>{item.email}</a>
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Link href={`/admin/subscribers/${item._id}`}>
                                            <a className="font-medium text-gray-400 hover:text-red-600">
                                                <PencilAltIcon className='h-5 w-5' />
                                            </a>
                                        </Link>
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

export function Subscribers() {
    return (
        <AdminLayout>
            <Subscriber />
        </AdminLayout>
    )
}