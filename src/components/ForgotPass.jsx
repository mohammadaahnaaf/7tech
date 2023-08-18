import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import axiosRoot from './utils/axios-root';
import { useState } from 'react';
import Router from 'next/router'
import Link from 'next/link';
import { BasicNavbar, ErrorText, Footer } from './shared';
import axiosAPI from './utils/axios-api';

export function ForgotPass() {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [showPass, setShowPass] = useState("password")
    const [isAdmin, setIsAdmin] = useState(false)

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
            console.log(res.data)
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            setSuccess('Login Done')

            if (!isAdmin) {
                axiosAPI
                    .get('/auth/get-me')
                    .then(res => {
                        setIsAdmin(!!res.data.isAdmin);
                        !res.data.isAdmin ? Router.push('/') : Router.push('/admin')
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                setError(error.response?.data?.message)
            }
        }

    };

    return (
        <div className="min-h-screen px-1 md:px-0 flex items-center justify-center my-auto">
            <div className="bg-black bg-opacity-10 p-3 rounded-lg max-w-md w-full">
                <div>
                    <img
                        className="mx-auto h-16 w-auto"
                        src="/logo.png"
                        alt="seventech logo"
                    />
                    <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-black">Forget Password</h2>
                    <p className="mt-2 text-center text-sm text-black">
                        Don't have an account?{' '}
                        <a href="signin" className="font-medium text-gray-500 hover:text-black">
                            Sign Up
                        </a>
                    </p>
                </div>

                <ErrorText error={error} />

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
                                className="appearance-none bg-black rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-black text-red-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
             
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-black focus:bg-black focus:outline-none"
                        >
                            Sent E-mail
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// This App is made by Ahnaf and Tanvir