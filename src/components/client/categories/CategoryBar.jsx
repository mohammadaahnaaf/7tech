import { Dialog, Menu, Popover, Tab, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import axiosRoot from "@seventech/utils/axios-root";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

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
            <header className="">
                <div className="max-w-7xl flex items-center justify-evenly w-full mx-auto px-4 sm:px-6 xl:px-8">
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
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
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

                                        {/* Mouse  */}
                                        <Link href='/category/keyboard'>
                                            <a className="p-4 ring-0 grid gap-4 hover:bg-gray-200 rounded-lg focus:ring-0 w-full ring-white">
                                                {/* <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="var(--ci-primary-color, currentColor)" d="M448,80a24.027,24.027,0,0,0,24-24V16H440V48H264a24.027,24.027,0,0,0-24,24v40H208.625A88.725,88.725,0,0,0,120,200.625V360.571C120,435.247,180.753,496,255.429,496h1.142C331.247,496,392,435.247,392,360.571V200.625A88.725,88.725,0,0,0,303.375,112H272V80ZM152,200.625A56.689,56.689,0,0,1,208.625,144H240v88H152ZM360,360.571A103.545,103.545,0,0,1,256.571,464h-1.142A103.545,103.545,0,0,1,152,360.571V264H360ZM303.375,144A56.689,56.689,0,0,1,360,200.625V232H272V144Z" className="h-8 w-10" />
                                                </svg> */}
                                                <svg className="h-16 w-full" enable-background="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="m46.98 14.99c-.818-.812-1.561-1.552-2.367-2.254-11.549-10.341-21.018-8.131-25.32-5.714-.971.545-2.028 1.3-3.087 2.172-.706-.522-1.551-.604-2.007-.153l-.294.291c-1.677-.378-3.443-.324-5.136.372-4.829 1.983-6.769 6.83-6.769 12.965 0 10.418 6.071 18.051 9.43 23.434 2.208 3.537 5.059 8.461 5.059 11.563h2.391c0-3.775-3.017-8.968-5.416-12.81-3.367-5.395-9.073-12.445-9.072-22.189 0-5.143 1.385-9.174 5.292-10.777.681-.28 1.375-.405 2.065-.42l-.147.145c-.455.454-.372 1.29.155 1.99-.88 1.05-1.642 2.097-2.192 3.061-2.438 4.264-4.668 13.65 5.764 25.099.718.809 1.462 1.542 2.274 2.347 18.398 18.238 32.542 17.215 39.643 10.176s8.133-21.059-10.266-39.298m-5.308-2.205c-3.279 1.458-6.285 3.793-9.201 6.098l-10.912-10.818c4.545-2.075 11.393-2.526 20.113 4.72m-21.923-3.74 11.175 11.077c-1.371 1.141-2.906 2.533-4.266 3.881-1.336 1.324-2.731 2.836-3.879 4.192l-11.176-11.078c1.783-2.766 5.353-6.306 8.146-8.072m-4.373 29.805c-7.308-8.643-6.854-15.431-4.76-19.938l10.912 10.816c-2.323 2.89-4.678 5.871-6.152 9.122m40.472 14.05c-8.198 8.126-22.316 4.229-36.847-10.175-.624-.617-1.486-1.498-2.16-2.227 1.377-3.486 4.144-6.947 6.677-10.098 1.202-1.494 2.966-3.451 4.557-5.028 1.583-1.569 3.559-3.32 5.067-4.512 3.186-2.52 6.668-5.259 10.193-6.624.719.652 1.59 1.489 2.246 2.141 14.53 14.403 18.464 28.397 10.267 36.523" />
                                                </svg>
                                                <span className="text-center">Mouse</span>
                                            </a>
                                        </Link>
                                     
                                        {/* keyboard  */}
                                        <Link href='/category/keyboard'>
                                            <a className="p-4 ring-0 grid gap-4 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m0 0h48v48h-48z" fill="#fff" fill-opacity=".01" /><rect height="24" rx="2" stroke="#000" stroke-linejoin="round" stroke-width="4" width="40" x="4" y="18" /><g fill="#000"><circle cx="14" cy="24" r="2" /><circle cx="16" cy="30" r="2" /><circle cx="10" cy="30" r="2" /><circle cx="20" cy="24" r="2" /><circle cx="22" cy="30" r="2" /><circle cx="26" cy="24" r="2" /><circle cx="28" cy="30" r="2" /><circle cx="32" cy="24" r="2" /><circle cx="34" cy="30" r="2" /><circle cx="38" cy="24" r="2" /></g><path d="m17 36h14" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /><path d="m33 18v-4.875c0-.5523.4477-1 1-1h5c.5523 0 1-.4477 1-1v-5.125" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" />
                                                </svg>
                                                <span className="text-center">Keyboard</span>
                                            </a>
                                        </Link>

                                        {/* headset  */}
                                        <Link href='/category/headset'>
                                            <a className="p-4 ring-0 grid gap-4 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-i</title>
                                                    <path d="M411.16,97.46C368.43,55.86,311.88,32,256,32S143.57,55.86,100.84,97.46C56.45,140.67,32,197,32,256c0,26.67,8.75,61.09,32.88,125.55S137,473,157.27,477.41c5.81,1.27,12.62,2.59,18.73,2.59a60.06,60.06,0,0,0,30-8l14-8c15.07-8.82,19.47-28.13,10.8-43.35L143.88,268.08a31.73,31.73,0,0,0-43.57-11.76l-13.69,8a56.49,56.49,0,0,0-14,11.59,4,4,0,0,1-7-2A114.68,114.68,0,0,1,64,256c0-50.31,21-98.48,59.16-135.61C160,84.55,208.39,64,256,64s96,20.55,132.84,56.39C427,157.52,448,205.69,448,256a114.68,114.68,0,0,1-1.68,17.91,4,4,0,0,1-7,2,56.49,56.49,0,0,0-14-11.59l-13.69-8a31.73,31.73,0,0,0-43.57,11.76L281.2,420.65c-8.67,15.22-4.27,34.53,10.8,43.35l14,8a60.06,60.06,0,0,0,30,8c6.11,0,12.92-1.32,18.73-2.59C375,473,423,446,447.12,381.55S480,282.67,480,256C480,197,455.55,140.67,411.16,97.46Z" />
                                                </svg>
                                                <span className="text-center">Headset</span>
                                            </a>
                                        </Link>

                                        {/* speaker  */}
                                        <Link href='/category/speaker'>
                                            <a className="p-4 grid gap-4 ring-0 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m0 0h24v24h-24z" fill="#fff" opacity="0" transform="matrix(0 1 -1 0 24 0)" /><g fill="#231f20"><circle cx="12" cy="15.5" r="1.5" /><circle cx="12" cy="8" r="1" /><path d="m17 2h-10a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-14a3 3 0 0 0 -3-3zm-5 3a3 3 0 1 1 -3 3 3 3 0 0 1 3-3zm0 14a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1 -3.5 3.5z" /></g>
                                                </svg>
                                                <span className="text-center">Speakers</span>
                                            </a>
                                        </Link>

                                        {/* microphone  */}
                                        <Link href='/category/microphone'>
                                            <a className="p-4 grid gap-4 ring-0 hover:bg-gray-200 rounded-lg w-full ring-black">
                                                <svg className="h-16 w-full" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m176 352c53.02 0 96-42.98 96-96v-160c0-53.02-42.98-96-96-96s-96 42.98-96 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38-66.5-6.49-115.21-66.27-115.21-133.08v-42.3c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69v34.15h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77c85.71-11.76 152-85.33 152-174.23v-48c0-8.84-7.16-16-16-16z" />
                                                </svg>
                                                <span className="text-center">Microphone</span>
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

