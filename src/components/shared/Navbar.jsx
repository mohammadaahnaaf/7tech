import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { products } from '../../data/ProductsData'
// import { cartProducts } from '../../data/CartItems'

const user = {
    name: 'Ahnaf',
    email: 'ahnaf1998ff@gmail.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/category' },
    { name: 'Cart', href: '/cart' },
]
const userNavigation = [
    { name: 'Admin', href: '/admin', state: true },
    { name: 'Your Profile', href: '/profile', state: true },
    { name: 'Settings', href: '/settings', state: true },
    { name: 'Sign out', href: '/login', state: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {

    const [useri, setUseri] = useState(true);
    const { pathname } = useRouter();
    // console.log(pathname);
    const ItemsInCart = products.length;

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-black">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="hidden md:block h-8">
                                        <Link href='/'>
                                            <a className='h-20 w-full'>
                                                <Image src="/logo.png" alt="Home" layout="fixed" width={80} height={40} />
                                            </a>
                                        </Link>
                                    </div>

                                    {/* Search Bar  */}
                                    <div className="md:w-96">
                                        <div className="md:ml-3 w-full px-3 md:px-0 flex items-baseline">
                                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                                            <div className="relative w-full">
                                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                    <SearchIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                                                    {/* <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                                                </div>
                                                <input
                                                    type="search"
                                                    id="default-search"
                                                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                                    placeholder="Search..."
                                                    required
                                                />
                                                <button type="button" className="text-white absolute inset-y-2 right-2 items-center  bg-black bg-opacity-20 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm px-3 py-1 dark:bg-blur-sm dark:bg-black dark:hover:bg-red-600 dark:focus:ring-red-500">Search</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {/* Cart  */}
                                        <Link href='/cart'>
                                            <a>
                                                <button
                                                    type='button'
                                                    // onClick={}
                                                    className="text-red-600 bg-red-600 bg-opacity-30 flex p-[8px] rounded-full relative hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-400 focus:ring-gray-100"
                                                >
                                                    <ShoppingCartIcon className="relative z-10 h-6 w-6" aria-hidden="true" />

                                                    <span className="flex absolute h-5 w-5 -right-1 -top-1 rounded-full bg-red-600 bg-opacity-50 justify-center">
                                                        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-75"></span>
                                                        <p className=" inline-flex items-center text-white text-xs">{ItemsInCart}</p>
                                                    </span>
                                                </button>
                                            </a>
                                        </Link>
                                        {!useri && (
                                            <div className='flex justify-between gap-2 ml-3'>
                                                <Link href='/signin'>
                                                    <a className='bg-red-600 hover:bg-white text-white ring-0 focus:ring-2 ring-white hover:ring-red-600 hover:text-black py-1 px-3 rounded-md'>Signup</a>
                                                </Link>
                                                <Link href='/login'>
                                                    <a className='bg-white hover:bg-red-600 ring-0 focus:ring-2 ring-red-600 hover:ring-white hover:text-white py-1 px-3 rounded-md'>Login</a>
                                                </Link>
                                            </div>
                                        )}


                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                {useri && (
                                                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                    </Menu.Button>
                                                )}
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute z-40 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gradient-to-r from-black to-red-900 ring-1 ring-red-600 ring-opacity-20 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={() => setUseri(item.state)}
                                                                >
                                                                    <a
                                                                        className={classNames(
                                                                            active ? 'bg-red-600' : '',
                                                                            'block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-red-600'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">

                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden bg-gray-100">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            pathname === item.href ? 'bg-white text-gray-800' : '',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="pt-2 pb-3 border-t border-gray-300">

                                <div className="mt-3 px-2 space-y-1">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default Navbar