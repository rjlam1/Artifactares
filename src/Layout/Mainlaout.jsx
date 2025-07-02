import React from 'react';
import Home from '../Pages/Home';
import { Outlet } from 'react-router';
import Navbar from '../Componet/Navbar';
import Footer from '../Componet/Fotter';
const MainLaOut = () => {
    return (
         <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
           <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLaOut;