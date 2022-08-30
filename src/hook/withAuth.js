import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import axiosAPI from '../components/utils/axios-api';

export const withAuth = (Component) => {
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

        return isLoggedIn && <Component />;
    }
    
    return AuthComponent;
}