import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { LockClosedIcon } from '@heroicons/react/solid'
import axiosRoot from './utils/axios-root';
import { useState } from 'react';
import Router from 'next/router'

export function Logins() {

    const [error, setError] = useState("")
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const data = new FormData(event.currentTarget);

            const reqData = {
                email: data.get('email'),
                password: data.get('password')
            }

            const res = await axiosRoot.post('/auth/login', reqData);
            const { access_token, refresh_token } = res.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            Router.push('/')
        } catch (error) {
            console.log(error.response);
            setError(error.response)
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center my-auto">
            <div className="max-w-md w-full">
                <div>
                    <img
                        className="mx-auto h-16 w-auto"
                        src="/logo.png"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login Here</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="signin" className="font-medium text-red-400 hover:text-black">
                            Sign Up
                        </a>
                    </p>
                </div>

                {error && (
                    <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
                        <span class="font-medium">Warning!</span> {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-black border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-red-600 hover:text-green-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-white hover:text-red-500" aria-hidden="true" />
                            </span>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function Login() {
    return (
        <>
            <Navbar />
            <Logins />
            <Footer />
        </>
    )
}