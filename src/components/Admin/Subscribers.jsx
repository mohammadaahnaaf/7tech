import { Dialog, Transition } from '@headlessui/react';
import { MailIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react'
// import { subscribers } from '../../data/Subscribers';
import AdminLayout from '../layout/AdminLayout'
import Search from '../shared/Search';
import axiosAPI from '../utils/axios-api';

function Subscriber() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState([]);
    const [allSelected, setAllSelected] = React.useState(false)
    const [subscribers, setSubscribers] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [confirm, setConfirm] = React.useState(false)
    const [page, setPage] = React.useState(0)

    function closeModal() {
        !confirm && (
            setConfirm(true)
        )
        setIsOpen(false)
    }

    //Get Data
    React.useEffect(() => {
        async function getUsers() {
            const res = await axiosAPI.get('/user');
            setSubscribers(res.data)
        }
        getUsers()
    }, []);

    // delete user
    function handleDelete() {
        setIsOpen(true)

        confirm === true && (
            selected.map((item) =>
                axiosAPI.delete(`/user/${item}`)
            ),
            router.reload()
        )
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

    return (

        <div className="mx-3 mt-3 bg-red-100 overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className='flex justify-center w-full py-1 bg-black'>
                <div className='md:w-1/3'>
                    <Search setSearchTerm={setSearchTerm} />
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
                                    {/* <button type='button'>
                                        <MailIcon className='h-5 w-5 text-green-600' />
                                    </button> */}
                                    <button onClick={handleDelete} type='button'>
                                        <TrashIcon className='h-5 w-5 text-red-600' />
                                    </button>
                                </div>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.filter((row) => {
                        if (searchTerm === "") {
                            return row;
                        } else if (row.phone.toString().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                            return row;
                        } else if (row.name.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                            return row;
                        } else if (row.email.toLowerCase().includes(typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '')) {
                            return row;
                        } return ""
                    }).slice(0, 4).map((item, index) => {
                        const isItemSelected = isSelected(item._id);

                        {/* .slice(0, n) is used to get a range of items from Array[] */ }
                        return (
                            <tr key={index} className="bg-white border-b">
                                <td class="p-4 w-4">
                                    <div className="flex items-center">
                                        <input onChange={(event) => handleChecked(event, item._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                                        <label htmlFor="checkbox" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex gap-2 items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {item.isAdmin ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>

                                    )}   {item.fullName}
                                </th>
                                <td className="py-4 px-6">
                                    {item.phoneNumber}
                                </td>
                                <td className="py-4 px-6">
                                    {item.email}
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-gray-400 hover:text-red-600">
                                        <PencilAltIcon className='h-5 w-5' />
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='p-2 flex justify-end'>
                <Pagenation etPage={setPage} page={page} />
            </div>
        </div>
    )
}


function Pagenations({ itemsPerPage, subscribers }) {


    const [currentItems, setCurrentItems] = React.useState(null);
    const [pageCount, setPageCount] = React.useState(1);
    const [itemOffset, setItemOffset] = React.useState(0);
    const [pages, setPages] = React.useState(['']);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(subscribers.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(subscribers.length / itemsPerPage));
        setPages([...Array(pageCount).keys()])
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % subscribers.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

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
                {pages.map((page) => (

                    <li key={page}>
                        <button onClick={handlePageClick} type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black">
                            {page}
                        </button>
                    </li>
                ))}
                {/* <li>
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
                </li> */}
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

export default function Subscribers() {
    return (
        <AdminLayout>
            <Subscriber />
        </AdminLayout>
    )
}