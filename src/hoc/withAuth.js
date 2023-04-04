import { AdminLayout } from '@seventech/layout';
import axiosAPI from '@seventech/utils/axios-api';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const withAuth = (Component, pageProps) => {

    const AuthComponent = () => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        useEffect(() => {
            if (!isLoggedIn) {

                axiosAPI
                    .get('/auth/get-me')
                    .then(res => {
                        setIsLoggedIn(!!res.data.email);
                    })
                    .catch(error => {
                        console.log(error);
                        Router.push('/login')
                    });
            }
        }, [isLoggedIn]);

        return isLoggedIn ? (<Component {...pageProps} />) : (<Loading />)
    }

    return AuthComponent;
}

function Loading() {

    return (
        <AdminLayout>
            <div className='flex items-center justify-center h-full'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-spin h-16 w-16 text-white">
                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg>
            </div>
        </AdminLayout>
    )
}

function Loading2() {

    return (
        <div sx={{
            height: '100vh', bgcolor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            width: '100%', display: 'grid', justifyContent: 'center', alignItems: 'center'
        }}>
            <svg className="text-red-600 animate-spin h-5 w-5" viewBox="0 0 24 24"></svg>
        </div>
    )
}

// export const withAuth = (Component, pageProps) => {

//     const AuthComponent = () => {
//         const router = useRouter()
//         const [isLoggedIn, setIsLoggedIn] = useState(false);

//         useEffect(() => {
//             const token = localStorage.getItem("access_token");
//             setIsLoggedIn(!!token)
//             if (!token) {
//                 setTimeout(() => { Router.push('/login') }, 200)
//             }

//         }, [router, isLoggedIn]);

//         return !isLoggedIn ? <Loading /> : (
//             <Component {...pageProps} />
//         )
//     }

//     return AuthComponent;
// }

export const withMeAuth = (Component, pageProps) => {

    const AuthMeComponent = () => {
        const router = useRouter()
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        useEffect(() => {
            let token = localStorage.getItem("access_token");
            setIsLoggedIn(!!token)
            if (!token) {
                setTimeout(() => { Router.push('/login') }, 500)
            }

        }, [router, isLoggedIn]);

        return !isLoggedIn ? <Loading2 /> : <Component {...pageProps} />
    }

    return AuthMeComponent;
}