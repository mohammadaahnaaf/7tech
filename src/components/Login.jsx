import { BasicNavbar } from './shared/Navbar'
import Footer from './shared/Footer'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import axiosRoot from './utils/axios-root';
import { useState } from 'react';
import Router from 'next/router'
import Link from 'next/link';

export function Logins() {

    const [error, setError] = useState("")
    const [showPass, setShowPass] = useState("password")

    function handleShowPass() {
        if (showPass === "password") {
            setShowPass('text')
        } else {
            setShowPass('password')
        }
    }
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
            Router.push('/admin')
        } catch (error) {
            console.log(error.response);
            setError(error.response.data.message ? error.response.data.message : 'loading')
            // Router.push('/login')
        }
    };

    return (
        <div className="min-h-screen bg-opacity-10 bg-[url('/spinner.png')] px-1 md:px-0 flex items-center justify-center my-auto">
            <div className="bg-black bg-opacity-30 p-3 rounded-lg max-w-md w-full">
                <div>
                    <img
                        className="mx-auto h-16 w-auto"
                        src="/logo.png"
                        alt="seventech logo"
                    />
                    <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-white">Login Here</h2>
                    <p className="mt-2 text-center text-sm text-red-400">
                        Don't have an account?{' '}
                        <a href="signin" className="font-medium text-red-200 hover:text-black">
                            Sign Up
                        </a>
                    </p>
                </div>

                {error && (
                    <div class="p-3 my-2 text-sm text-red-700 bg-yellow-100 rounded-lg" role="alert">
                        <span class="font-medium">Warning!</span> {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
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
                                className="appearance-none bg-black rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-t-md focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPass}
                                autoComplete="current-password"
                                required
                                className="appearance-none bg-black rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            <span className="absolute px-2 right-0 inset-y-0 flex items-center pl-3">
                                <button type='button' onClick={handleShowPass} className=''>
                                    {showPass === 'password' ? (
                                        <EyeIcon className="h-5 w-5 text-red-700 hover:text-red-500" aria-hidden="true" />
                                    ) : (
                                        <EyeOffIcon className="h-5 w-5 text-red-700 hover:text-red-500" aria-hidden="true" />
                                    )}
                                </button>
                            </span>
                        </div>
                    </div>

                    <div className='grid gap-1'>
                        <div className="text-sm text-center py-2 md:text-right">
                            <Link href='/forgotpassword'>
                                <a className="font-medium text-red-600 hover:text-red-500">
                                    Forgot your password?
                                </a>
                            </Link>
                        </div>
                        {/* <div className="flex items-center w-full">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-black border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                I agree to the terms and conditions.
                            </label>
                        </div> */}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-opacity-60 bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
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
            <BasicNavbar />
            <Logins />
            <Footer />
        </>
    )
}