import React from 'react'
import { TemplateIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { AdminNavbar } from '@seventech/shared'
import axiosAPI from '@seventech/utils/axios-api'
import Router from 'next/router'

const Sidebar = () => {

    async function handleLogout(e) {

        e.preventDefault()
        await axiosAPI.delete('/auth/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        Router.push('/login')
    }

    return (
        <aside className="w-64 md:block hidden" aria-label="Sidebar">
            <div className="overflow-y-auto h-full py-4 px-3 border-t-2 border-red-600 bg-black">
                <ul className="space-y-2">
                    <li>
                        <Link href="/admin">
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600">
                                <svg aria-hidden="true" className="w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/orders">
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                                {/* <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/category">
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600  ">
                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                <TemplateIcon className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/products" >
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600  ">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/products/add">
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600  ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Add Product</span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/subscribers">
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600  ">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/subscribers">
                            <a className="flex items-center p-2 text-base font-normal text-blue-600 rounded-lg hover:text-white hover:bg-red-600  ">
                                {/* <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Admins</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/settings">
                            <a className="flex items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600  ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="flex w-full text-left items-center p-2 text-base font-normal text-red-600 rounded-lg hover:text-white hover:bg-red-600  ">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-red-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                        </button>
                    </li>

                </ul>
            </div>
        </aside>

    )
}


export function AdminLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <div className='flex min-h-screen'>
                <Sidebar />
                <div className='w-full bg-gray-200'>
                    {children}
                </div>
            </div>
        </>
    )
}