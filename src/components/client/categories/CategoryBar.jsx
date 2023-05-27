import { Dialog, Menu, Popover, Tab, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import axiosRoot from "@seventech/utils/axios-root";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function CategoryBar({ open, setOpen }) {

    const router = useRouter()
    const [categories, setCategories] = useState([])

    //Get Data
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');
            setCategories(res.data.categories)
        }
        getCategory()
    }, [router, open]);

    return (

        <div className="bg-gradient-to-t from-pink-800 to-black">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                                    <div className="border-y-2 border-red-600">
                                        <Tab.List className="grid p-4">
                                            {categories?.map((category, index) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'bg-red-600 text-white' : 'text-red-600 border-transparent',
                                                            'flex-1 text-left whitespace-nowrap rounded-md p-2 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {index + 1}. {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {categories.map((category, index) => (
                                            <Tab.Panel key={category.name} className="py-5 px-4 -z-50 space-y-5">

                                                <div>
                                                    <ul
                                                        role="list"
                                                        className="mt-2 px-4 flex flex-col space-y-6"
                                                    >
                                                        <li className="flow-root">
                                                            <button type="button" onClick={() => router.push(`/category/${category.name}`)} className="-m-3 p-2 block text-md font-semibold text-red-600">
                                                                {index + 1}. {category.name}
                                                            </button>
                                                        </li>
                                                        {category?.subCategories?.map((item, index) => (
                                                            <li key={item.name} className="flow-root px-4">
                                                                <button type="button" onClick={() => router.push(`/category/${item.name}`)} className="-m-3 p-2 block text-gray-200">
                                                                    {index + 1}. {item.name}
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
            <header className="relative max-h-10 lg:block hidden bg-black bg-opacity-10">

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
                                <span>Categories</span>
                            </button>

                            <Popover.Group className="hidden lg:ml-0 xl:block lg:self-stretch">
                                <div className="h-10 flex w-full gap-8">
                                    {categories.slice(0, 10).map((category, index) => (
                                        <Popover key={index} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-red-700 text-white border-b-white border-b-4'
                                                                    : 'border-transparent text-red-600 hover:border-white border-b-4 hover:text-white',
                                                                'relative z-10 flex items-center focus:outline-none focus:border-b-4 transition-colors ease-out duration-200 text-sm font-semibold -mb-px pt-px'
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

export function NewCatBar() {

    let [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <header>
                <div className="max-w-7xl flex items-center justify-between w-full mx-auto px-4 sm:px-6 xl:px-8">
                    <button
                        type="button"
                        onClick={openModal}
                        onMouseEnter={e => {
                            setTimeout(() => { setIsOpen(true) }, 200)
                        }}
                        className='text-black font-semibold text-md py-2'
                    >
                        Products
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/about')}
                        className='text-black text-md p-2 font-semibold'
                    >
                        About us
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('https://goo.gl/maps/7nBfZRWCmJXRNqdX8')}
                        className='text-black text-md p-2 font-semibold'
                    >
                        Find us
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('tel:+8801911444466')}
                        className='text-black text-md p-2 font-semibold'
                    >
                        Contact us
                    </button>
                </div>
            </header>

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

                    <div className="fixed top-24 w-full overflow-y-auto">
                        <div className="flex min-h-full items-start w-full text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    onMouseLeave={e => {
                                        setIsOpen(false)
                                    }}
                                    className="w-full mt-1 border-t-2 border-black px-5 py-10 transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
                                >
                                    <div className="flex gap-4 items-center max-w-7xl justify-between w-full mx-auto px-4 sm:px-6 xl:px-8">

                                        {/* mouse  */}
                                        <Link href='/category/mouse'>
                                            <a className="p-4 ring-2 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="var(--ci-primary-color, currentColor)" d="M448,80a24.027,24.027,0,0,0,24-24V16H440V48H264a24.027,24.027,0,0,0-24,24v40H208.625A88.725,88.725,0,0,0,120,200.625V360.571C120,435.247,180.753,496,255.429,496h1.142C331.247,496,392,435.247,392,360.571V200.625A88.725,88.725,0,0,0,303.375,112H272V80ZM152,200.625A56.689,56.689,0,0,1,208.625,144H240v88H152ZM360,360.571A103.545,103.545,0,0,1,256.571,464h-1.142A103.545,103.545,0,0,1,152,360.571V264H360ZM303.375,144A56.689,56.689,0,0,1,360,200.625V232H272V144Z" className="h-8 w-10" />
                                                </svg>
                                            </a>
                                        </Link>

                                        {/* keyboard  */}
                                        <Link href='/category/keyboard'>
                                            <a className="p-4 ring-2 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m0 0h48v48h-48z" fill="#fff" fill-opacity=".01" /><rect height="24" rx="2" stroke="#000" stroke-linejoin="round" stroke-width="4" width="40" x="4" y="18" /><g fill="#000"><circle cx="14" cy="24" r="2" /><circle cx="16" cy="30" r="2" /><circle cx="10" cy="30" r="2" /><circle cx="20" cy="24" r="2" /><circle cx="22" cy="30" r="2" /><circle cx="26" cy="24" r="2" /><circle cx="28" cy="30" r="2" /><circle cx="32" cy="24" r="2" /><circle cx="34" cy="30" r="2" /><circle cx="38" cy="24" r="2" /></g><path d="m17 36h14" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /><path d="m33 18v-4.875c0-.5523.4477-1 1-1h5c.5523 0 1-.4477 1-1v-5.125" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /></svg>

                                                {/* <svg className="h-16 w-full" enable-background="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="m59.188 32h-26.187c0-15.518-6.611-15.518-13.003-15.518-6.147 0-11.958 0-11.958-14.482h-1.04c0 15.518 6.611 15.518 12.998 15.518 6.152 0 11.963 0 11.963 14.482h-27.148c-1.553 0-2.813 1.348-2.813 2.998v24.004c0 1.66 1.26 2.998 2.813 2.998h54.375c1.552 0 2.812-1.338 2.812-2.998v-24.004c0-1.65-1.26-2.998-2.812-2.998m-4.112 2.002h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m-5.996 0h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m2.92 10.996v2.002c0 .557-.449 1.006-.996 1.006h-2.002c-.557 0-1.006-.449-1.006-1.006v-2.002c0-.547.449-.996 1.006-.996h2.002c.547 0 .996.449.996.996m-5.996-5.996c0-.557.449-.996.996-.996h2.002c.547 0 .996.439.996.996v2.002c0 .547-.449.996-.996.996h-2.002c-.547 0-.996-.449-.996-.996zm-2.93-5h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m2.93 10.996v2.002c0 .557-.449 1.006-1.006 1.006h-2.002c-.547 0-.996-.449-.996-1.006v-2.002c0-.547.449-.996.996-.996h2.002c.557 0 1.006.449 1.006.996m-5.005-6.992h1.997c.557 0 1.006.439 1.006.996v2.002c0 .547-.449.996-1.006.996h-1.997c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-.996 1.001-.996m-2.998 12.998c0-.557.449-1.006 1.001-1.006h1.997c.552 0 1.001.449 1.001 1.006v2.002c0 .547-.449.996-1.001.996h-1.997c-.552 0-1.001-.449-1.001-.996zm-1.001-2.998c-.552 0-1.001-.449-1.001-1.006v-2.002c0-.547.449-.996 1.001-.996h2.002c.547 0 .996.449.996.996v2.002c0 .557-.449 1.006-.996 1.006zm.078-14.004h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m-3.076 5c0-.557.449-.996.996-.996h2.002c.552 0 1.001.439 1.001.996v2.002c0 .547-.449.996-1.001.996h-2.002c-.547 0-.996-.449-.996-.996zm1.997 12.002v2.002c0 .547-.449.996-1.001.996h-1.997c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-1.006 1.001-1.006h1.997c.552 0 1.001.449 1.001 1.006m-1.997-4.004c0 .557-.449 1.006-1.001 1.006h-2.002c-.552 0-1.001-.449-1.001-1.006v-2.002c0-.547.449-.996 1.001-.996h2.002c.552 0 1.001.449 1.001.996zm-2.925-12.998h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m-3.076 5c0-.557.449-.996 1.001-.996h1.997c.552 0 1.001.439 1.001.996v2.002c0 .547-.449.996-1.001.996h-1.997c-.552 0-1.001-.449-1.001-.996zm1.997 12.002v2.002c0 .547-.449.996-.996.996h-2.002c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-1.006 1.001-1.006h2.002c.547 0 .996.449.996 1.006m-1.997-4.004c0 .557-.449 1.006-1.001 1.006h-2.002c-.547 0-.996-.449-.996-1.006v-2.002c0-.547.449-.996.996-.996h2.002c.552 0 1.001.449 1.001.996zm-2.925-12.998h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m-3.076 5c0-.557.449-.996 1.001-.996h1.997c.552 0 1.001.439 1.001.996v2.002c0 .547-.449.996-1.001.996h-1.997c-.552 0-1.001-.449-1.001-.996zm-2.925-5h1.851c1.431 0 1.431 2.002 0 2.002h-1.851c-1.435 0-1.435-2.002 0-2.002m2.925 10.996v2.002c0 .557-.449 1.006-1.001 1.006h-1.997c-.552 0-1.001-.449-1.001-1.006v-2.002c0-.547.449-.996 1.001-.996h1.997c.552 0 1.001.449 1.001.996m-5-6.992h2.002c.552 0 .996.439.996.996v2.002c0 .547-.444.996-.996.996h-2.002c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-.996 1.001-.996m-3.926-4.004h1.851c1.436 0 1.436 2.002 0 2.002h-1.851c-1.43 0-1.43-2.002 0-2.002m2.925 10.996v2.002c0 .557-.449 1.006-1.001 1.006h-1.997c-.552 0-1.001-.449-1.001-1.006v-2.002c0-.547.449-.996 1.001-.996h1.997c.552 0 1.001.449 1.001.996m-5-6.992h2.002c.552 0 1.001.439 1.001.996v2.002c0 .547-.449.996-1.001.996h-2.002c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-.996 1.001-.996m-3.921-4.004h1.846c1.436 0 1.436 2.002 0 2.002h-1.846c-1.435 0-1.435-2.002 0-2.002m-3.076 5c0-.557.444-.996.996-.996h2.002c.552 0 1.001.439 1.001.996v2.002c0 .547-.449.996-1.001.996h-2.002c-.552 0-.996-.449-.996-.996zm0 5.996c0-.547.41-.996.923-.996h4.15c.513 0 .923.449.923.996v2.002c0 .557-.41 1.006-.923 1.006h-4.15c-.513 0-.923-.449-.923-1.006zm5.996 14.004c0 .547-.41.996-.923.996h-4.15c-.513 0-.923-.449-.923-.996v-2.002c0-.547.41-.996.923-.996h4.15c.513 0 .923.449.923.996zm1.113-5h-6.22c-.493 0-.889-.449-.889-.996v-2.002c0-.557.396-1.006.889-1.006h6.221c.488 0 .889.449.889 1.006v2.002c-.001.547-.401.996-.89.996m4.888 5c0 .547-.449.996-1.001.996h-1.997c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-.996 1.001-.996h1.997c.552 0 1.001.439 1.001.996zm1.001-5h-2.002c-.547 0-.996-.449-.996-.996v-2.002c0-.557.449-1.006.996-1.006h2.002c.552 0 1.001.449 1.001 1.006v2.002c0 .547-.449.996-1.001.996m5 5c0 .547-.449.996-1.001.996h-1.997c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-.996 1.001-.996h1.997c.552 0 1.001.439 1.001.996zm1.001-5h-2.002c-.552 0-1.001-.449-1.001-.996v-2.002c0-.557.449-1.006 1.001-1.006h2.002c.552 0 1.001.449 1.001 1.006v2.002c0 .547-.449.996-1.001.996m21.001 5c0 .547-.371.996-.84.996h-18.33c-.459 0-.83-.449-.83-.996v-2.002c0-.547.371-.996.83-.996h18.33c.469 0 .84.449.84.996zm0-5.996v-2.002c0-.557.449-1.006.996-1.006h2.002c.547 0 .996.449.996 1.006v2.002c0 .547-.449.996-.996.996h-2.002c-.547 0-.996-.449-.996-.996m5.996 5.996c0 .547-.449.996-.996.996h-2.002c-.547 0-.996-.449-.996-.996v-2.002c0-.557.449-.996.996-.996h2.002c.547 0 .996.439.996.996zm10 0c0 .547-.4.996-.889.996h-6.221c-.488 0-.888-.449-.888-.996v-2.002c0-.557.4-.996.889-.996h6.221c.488 0 .889.439.889.996v2.002zm0-5.996c0 .547-.361.996-.82.996h-8.359c-.449 0-.82-.449-.82-.996v-2.002c0-.557.371-1.006.82-1.006h8.359c.459 0 .82.449.82 1.006zm0-6.006c0 .557-.41 1.006-.918 1.006h-4.16c-.508 0-.918-.449-.918-1.006v-2.002c0-.547.41-.996.918-.996h4.16c.508 0 .918.449.918.996zm0-5.996c0 .547-.4.996-.889.996h-6.221c-.488 0-.888-.449-.888-.996v-2.002c0-.557.4-.996.889-.996h6.221c.488 0 .889.439.889.996v2.002z"
                                                        className="h-8 w-10"
                                                    />
                                                </svg> */}
                                            </a>
                                        </Link>

                                        {/* headset  */}
                                        <Link href='/category/headset'>
                                            <a className="p-4 ring-2 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-i</title>
                                                    <path d="M411.16,97.46C368.43,55.86,311.88,32,256,32S143.57,55.86,100.84,97.46C56.45,140.67,32,197,32,256c0,26.67,8.75,61.09,32.88,125.55S137,473,157.27,477.41c5.81,1.27,12.62,2.59,18.73,2.59a60.06,60.06,0,0,0,30-8l14-8c15.07-8.82,19.47-28.13,10.8-43.35L143.88,268.08a31.73,31.73,0,0,0-43.57-11.76l-13.69,8a56.49,56.49,0,0,0-14,11.59,4,4,0,0,1-7-2A114.68,114.68,0,0,1,64,256c0-50.31,21-98.48,59.16-135.61C160,84.55,208.39,64,256,64s96,20.55,132.84,56.39C427,157.52,448,205.69,448,256a114.68,114.68,0,0,1-1.68,17.91,4,4,0,0,1-7,2,56.49,56.49,0,0,0-14-11.59l-13.69-8a31.73,31.73,0,0,0-43.57,11.76L281.2,420.65c-8.67,15.22-4.27,34.53,10.8,43.35l14,8a60.06,60.06,0,0,0,30,8c6.11,0,12.92-1.32,18.73-2.59C375,473,423,446,447.12,381.55S480,282.67,480,256C480,197,455.55,140.67,411.16,97.46Z" />
                                                </svg>
                                            </a>
                                        </Link>

                                        {/* speaker  */}
                                        <Link href='/category/speaker'>
                                            <a className="p-4 ring-2 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m0 0h24v24h-24z" fill="#fff" opacity="0" transform="matrix(0 1 -1 0 24 0)" /><g fill="#231f20"><circle cx="12" cy="15.5" r="1.5" /><circle cx="12" cy="8" r="1" /><path d="m17 2h-10a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-14a3 3 0 0 0 -3-3zm-5 3a3 3 0 1 1 -3 3 3 3 0 0 1 3-3zm0 14a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1 -3.5 3.5z" /></g>
                                                </svg>
                                            </a>
                                        </Link>

                                        {/* microphone  */}
                                        <Link href='/category/microphone'>
                                            <a className="p-4 ring-2 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m176 352c53.02 0 96-42.98 96-96v-160c0-53.02-42.98-96-96-96s-96 42.98-96 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38-66.5-6.49-115.21-66.27-115.21-133.08v-42.3c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69v34.15h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77c85.71-11.76 152-85.33 152-174.23v-48c0-8.84-7.16-16-16-16z" />
                                                </svg>
                                            </a>
                                        </Link>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

