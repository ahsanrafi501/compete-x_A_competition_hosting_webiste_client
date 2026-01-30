import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='bg-base-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;