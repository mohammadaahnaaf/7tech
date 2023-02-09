import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import axiosAPI from "../../utils/axios-api";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function CategoryBar() {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState([])

    //Get Data
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosAPI.get('/categories');
            setCategories(res.data)
        }
        getCategory()
    }, [router]);

    return (

        <div>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative z-40 max-w-full w-full bg-black ring-gray-300 ring-2 shadow-xl pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-100"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex px-4 space-x-8">
                                            {categories.slice(0, 9).map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'text-red-600 border-red-600' : 'text-gray-100 border-transparent',
                                                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {categories.map((category) => (
                                            <Tab.Panel key={category.name} className="pt-5 pb-5 bg-black px-4 -z-50 space-y-5">
                                      
                                                <div>
                                                    <ul
                                                        role="list"
                                                        className="mt-2 flex flex-col space-y-6"
                                                    >
                                                        {category?.subCategories?.map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                <button type="button" onClick={() => router.push(`/category/${item.name}`)} className="-m-3 p-2 block text-gray-200">
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* PC menu view  */}
            <header className="relative max-h-10 bg-red-600">

                <div area-position='fixed' aria-label="Top" className="max-w-7xl max-h-10 mx-auto px-4 sm:px-6 xl:px-8">
                    <div>
                        <div className="h-10 flex items-center">
                            <button
                                type="button"
                                className="px-2 ml-3 py-1 flex items-center ring-0 bg-black ring-gray-200 text-red-600 xl:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                {/* <MenuIcon className="h-6 w-6" aria-hidden="true" /> */}
                                <ChevronDoubleRightIcon className="h-6 w-6 mr-1" aria-hidden="true" />
                                <span className="">Categories</span>
                            </button>

                            <Popover.Group className="hidden lg:ml-0 xl:block lg:self-stretch">
                                <div className="h-10 flex gap-8">
                                    {categories.slice(0, 9).map((category, index) => (
                                        <Popover key={index} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-gray-900 text-white border-b-white border-b-4'
                                                                    : 'border-transparent text-gray-900 hover:border-white border-b-4 hover:text-white',
                                                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-semibold -mb-px pt-px'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative h-[55vh] border-b-2 border-red-600 bg-gradient-to-b from-black via-red-900 to-black z-40">
                                                                <div className="max-w-7xl mx-auto px-8">
                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-8">

                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-5 gap-x-5 text-sm">
                                                                            {/* {category.subCategories.map((section) => ( */}
                                                                            <div>
                                                                                <Link href={`/category/${category.name}`}>
                                                                                    <a className="font-medium text-lg text-gray-100">
                                                                                        {category.name}
                                                                                    </a>
                                                                                </Link>
                                                                                <ul
                                                                                    role="list"
                                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                >
                                                                                    {category.subCategories.map((item, index) => (
                                                                                        <li key={item.name} className="flex">
                                                                                            <button type="button" onClick={() => router.push(`/category/${item.name}`)} className="text-md text-white hover:text-gray-200">
                                                                                                {index + 1}. {item.name}
                                                                                            </button>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                            {/* ))} */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                </div>
                            </Popover.Group>

                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}