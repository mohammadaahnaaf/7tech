import { AdminLayout } from '@seventech/layout';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// export const withAuth = (Component) => {
//     const AuthComponent = () => {
//         // const { pathname } = useRouter();
//         const [isLoggedIn, setIsLoggedIn] = useState(false);
//         useEffect(() => {
//             if (!isLoggedIn) {

//                 axiosAPI
//                     .get('/auth/get-me')
//                     .then(res => {
//                         setIsLoggedIn(!!res.data.email);
//                     })
//                     .catch(error => {
//                         console.log(error);
//                         Router.push('/login')
//                     });
//             }
//         }, [isLoggedIn]);

//         return isLoggedIn && <Component />;
//     }

//     return AuthComponent;
// }

function Loading() {

    return (
        <AdminLayout>
            <div sx={{
                height: '100vh', bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                width: '100%', display: 'grid', justifyContent: 'center', alignItems: 'center'
            }}>
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
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

export const withAuth = (Component, pageProps) => {

    const AuthComponent = () => {
        const router = useRouter()
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem("access_token");
            setIsLoggedIn(!!token)
            if (!token) {
                setTimeout(() => { Router.push('/login') }, 200)
            }

        }, [router, isLoggedIn]);

        return !isLoggedIn ? <Loading /> : <Component {...pageProps} />
    }

    return AuthComponent;
}

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