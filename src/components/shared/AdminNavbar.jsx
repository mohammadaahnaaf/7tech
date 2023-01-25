import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import axiosAPI from '../utils/axios-api'


// const user = {
//     name: 'Ahnaf',
//     email: 'ahnaf1998ff@gmail.com',
//     imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }


const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Products', href: '/admin/products' },
    { name: 'Add Product', href: '#' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Subscribers', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Home', href: '/' },
]
const userNavigation = [
    { name: 'Home', href: '/', state: true },
    // { name: 'Sign out', href: '/login', state: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function AdminNavbar() {

    const [useri, setUseri] = React.useState(true);
    const { pathname } = useRouter();
    // console.log(pathname);

    async function handleLogout(e) {

        e.preventDefault()
        await axiosAPI.delete('/auth/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
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
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

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
                                                    <Menu.Button className="text-green-600 bg-green-600 focus:bg-opacity-25 bg-opacity-30 flex p-[8px] rounded-full relative hover:text-red-600">
                                                        <span className="sr-only">Open user menu</span>
                                                        {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={() => setUseri(item.state)}
                                                                >
                                                                    <a
                                                                        className={classNames(
                                                                            active ? 'bg-red-600' : '',
                                                                            'block px-4 py-2 text-sm text-gray-100 hover:bg-red-600 hover:text-white'
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
                                                                onClick={handleLogout}
                                                                className={classNames(
                                                                    active ? 'bg-red-600' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-red-600 hover:text-white'
                                                                )}
                                                            >
                                                                Sign out
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
                                    <Disclosure.Button className="focus:bg-opacity-20 bg-opacity-10 bg-red-600 inline-flex items-center justify-center p-2 rounded-md text-gray-100">
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
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Disclosure.Panel className="md:hidden bg-black">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                pathname === item.href ? 'bg-red-600 bg-opacity-10 text-white' : '',
                                                'block px-3 py-2 text-gray-100 rounded-md text-base font-medium'
                                            )}
                                            aria-current={pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                    <Disclosure.Button
                                        as="button"
                                        // href={item.href}
                                        onClick={handleLogout}
                                        className={classNames(
                                            pathname === null ? 'bg-red-600 bg-opacity-10 text-white' : '',
                                            'block w-full text-left px-3 py-2 text-gray-100 rounded-md text-base font-medium'
                                        )}
                                        aria-current={pathname === null ? 'page' : undefined}
                                    >
                                        Sign out
                                    </Disclosure.Button>
                                </div>
                                {/* <div className="pt-2 px-1 pb-3 border-t border-gray-300">

                                    <div className="mt-3 px-2 space-y-1">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-100"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div> */}
                            </Disclosure.Panel>
                        </Transition.Child>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default AdminNavbar