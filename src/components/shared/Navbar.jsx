import React, { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import Search from './Search'
import { useCart } from 'react-use-cart'
import axiosAPI from '../utils/axios-api'
import Link from 'next/link'
import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
// import { cartProducts } from '../../data/CartItems'
// import { products } from '../../data/ProductsData'

const user = {
    name: 'Ahnaf',
    email: 'ahnaf1998ff@gmail.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


const navigation = [
    { name: 'Home', href: '/home', icon: <HomeIcon className='h-5 w-5 mr-1' /> },
    {
        name: 'Categories', href: '/category',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 mr-1' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
    },
    { name: 'Cart', href: '/cart', icon: <ShoppingCartIcon className='h-5 w-5 mr-1' /> },
]
const userNavigation = [
    { name: 'Admin', href: '/admin', state: true },
    { name: 'Your Profile', href: '/profile', state: true },
    { name: 'Settings', href: '/settings', state: true },
    // { name: 'Sign out', href: '/login', state: false },
]
const basicNavigation = [
    { name: 'Home', href: '/', state: true },
    { name: 'Your Profile', href: '/profile', state: true },
    // { name: 'Settings', href: '/settings', state: true },
    // { name: 'Sign out', href: '/login', state: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar({ setSearchTerm }) {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [useri, setUseri] = useState(false);
    const { pathname } = useRouter();
    const { totalUniqueItems } = useCart()

    useEffect(() => {
        // e.preventDefault()
        if (!useri) {
            axiosAPI
                .get('/auth/get-me')
                .then(res => {
                    setUseri(!!res.data.email);
                })
                .catch(error => {
                    console.log(error);
                    // Router.push('/login')
                });
        }
    }, []);

    async function handleLogout(e) {
        e.preventDefault()
        await axiosAPI.delete('/auth/logout');
        setUseri(false);
        Router.push('/login')
    }

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
                                                <Image src="/logo.png" srcset="/logo.svg" alt="Home" layout="fixed" width={80} height={40} />
                                            </a>
                                        </Link>
                                    </div>

                                    {/* Search Bar  */}
                                    {useri && (
                                        <Search setSearchTerm={setSearchTerm} />
                                    )}

                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {/* Cart  */}

                                        <Link href='/cart'>
                                            <a>
                                                <button
                                                    type='button'
                                                    // onClick={}
                                                    className="text-red-600 bg-red-600 bg-opacity-30 flex p-[8px] rounded-full relative hover:text-gray-200 focus:ring-2 focus:ring-red-800"
                                                >
                                                    <ShoppingCartIcon className="relative z-10 h-6 w-6" aria-hidden="true" />

                                                    <span className="flex absolute h-5 w-5 -right-1 -top-1 rounded-full bg-red-600 bg-opacity-50 justify-center">
                                                        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-75"></span>
                                                        <p className=" inline-flex items-center text-white text-xs">{totalUniqueItems}</p>
                                                    </span>
                                                </button>
                                            </a>
                                        </Link>


                                        {!useri && (
                                            <div className='flex justify-between gap-2 ml-3'>
                                                <Link href='/signin'>
                                                    <a className='bg-black text-sm hover:bg-red-600 text-red-600 hover:ring-white hover:text-white ring-2 ring-red-600 py-1 px-3'>Signup</a>
                                                </Link>
                                                <Link href='/login'>
                                                    <a className='bg-black text-sm hover:bg-red-600 text-red-600 hover:ring-white hover:text-white ring-2 ring-red-600 py-1 px-3'>Login</a>
                                                </Link>
                                            </div>
                                        )}


                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                {useri && (
                                                    <Menu.Button className="text-red-600 bg-red-600 bg-opacity-30 flex p-[8px] rounded-full relative hover:text-gray-200 focus:ring-2 focus:ring-red-800">
                                                        <span className="sr-only">Open user menu</span>
                                                        {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                                                        <svg className="h-8 w-8 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                        </svg>

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
                                                                <Link href={item.href}>
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
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                type='button'
                                                                onClick={handleLogout}
                                                                className={classNames(
                                                                    active ? 'bg-red-600' : '',
                                                                    'w-full text-left block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-red-600'
                                                                )}
                                                            >
                                                                Signout
                                                            </button>
                                                        )}
                                                    </Menu.Item>
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

export function BasicNavbar() {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [useri, setUseri] = useState(false);
    const { pathname } = useRouter();
    const { totalUniqueItems } = useCart()



    // async function handleLogout(e) {
    //     e.preventDefault()
    //     await axiosAPI.delete('/auth/logout');
    //     setUseri(false);
    //     Router.push('/login')
    // }

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="relative bg-black">
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



                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">



                                        {/* Cart  */}
                                        <Link href='/cart'>
                                            <a className="text-red-600 bg-red-600 bg-opacity-30 flex p-[8px] rounded-full relative hover:text-gray-200 focus:ring-2 focus:ring-red-800">

                                                <ShoppingCartIcon className="relative z-10 h-6 w-6" aria-hidden="true" />
                                                <span className="flex absolute h-5 w-5 -right-1 -top-1 rounded-full bg-red-600 bg-opacity-50 justify-center">
                                                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-75"></span>
                                                    <p className=" inline-flex items-center text-white text-xs">{totalUniqueItems}</p>
                                                </span>
                                            </a>
                                        </Link>

                                        {/* Login and Signup Button shall show when user != isLoggedIn */}
                                        <div className='flex justify-between gap-2 mx-3'>
                                            <Link href='/signin'>
                                                <a className='bg-black text-sm hover:bg-red-600 text-red-600 hover:ring-white hover:text-white ring-2 ring-red-600 py-1 px-3'>Signup</a>
                                            </Link>
                                            <Link href='/login'>
                                                <a className='bg-black text-sm hover:bg-red-600 text-red-600 hover:ring-white hover:text-white ring-2 ring-red-600 py-1 px-3'>Login</a>
                                            </Link>
                                        </div>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="hidden ml-3 relative">
                                            <div>
                                                <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-xl">
                                                    <span className="sr-only">Open user menu</span>
                                                    <UserCircleIcon className='h-8 w-8 text-red-600 hover:text-gray-200' />
                                                </Menu.Button>
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
                                                    {basicNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <Link href={item.href}>
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
                                    <Disclosure.Button className=" inline-flex items-center justify-center p-2 rounded-md text-red-600 focus:ring-2 focus:ring-red-600">
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

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Disclosure.Panel className="md:hidden relative rounded-b-lg bg-gradient-to-b border-t-2 border-red-600 from-black to-red-900">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                pathname === item.href ? 'text-white bg-red-800' : '',
                                                'flex px-3 text-gray-200 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.icon} {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default Navbar