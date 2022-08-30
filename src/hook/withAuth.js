import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../components/utils/axios-api';

export const withAuth = (Component) => {
    const AuthComponent = () => {
        const navigate = useNavigate();
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
                        navigate('/login');
                    });
            }
        }, [isLoggedIn, navigate]);

        return isLoggedIn && <Component />;
    }

    return <AuthComponent />;
}