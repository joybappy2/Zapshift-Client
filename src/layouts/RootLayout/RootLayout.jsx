import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen max-w-7xl mx-auto py-5 px-2'>
            <Navbar></Navbar>
            <div className='flex-1'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;