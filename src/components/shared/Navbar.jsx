import React, { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Search from './Search'
import { useCart } from 'react-use-cart'
import axiosAPI from '../utils/axios-api'
// import { cartProducts } from '../../data/CartItems'
// import { products } from '../../data/ProductsData'

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
        if (!useri) {
            axiosAPI
                .get('/auth/get-me')
                .then(res => {
                    setUseri(!!res.data.email);
                })
                .catch(error => {
                    console.log(error);
                    Router.push('/login')
                });
        }
    }, [useri]);

    async function handleLogout(e) {
        e.preventDefault()
        // httpClient.logOut()
        // this.setState({ currentUser: null })
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
                                                <Image src="/logo.png" alt="Home" layout="fixed" width={80} height={40} />
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
                                        {useri && (
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
                                        )}

                                        {!useri && (
                                            <div className='flex justify-between gap-2 ml-3'>
                                                <Link href='/signin'>
                                                    <a className='bg-red-600 text-sm hover:bg-white text-white ring-0 ring-white hover:ring-red-600 hover:text-black py-1 px-3 rounded-full'>Signup</a>
                                                </Link>
                                                <Link href='/login'>
                                                    <a className='bg-white text-sm hover:bg-red-600 ring-0 ring-red-600 hover:ring-white hover:text-white py-1 px-3 rounded-full'>Login</a>
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

export default Navbar