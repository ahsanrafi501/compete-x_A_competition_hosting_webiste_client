import React from 'react';
import Home from '../Page/Home';
import Login from '../Page/Auth/Login/Login';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;