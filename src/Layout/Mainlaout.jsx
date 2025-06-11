import React from 'react';
import Home from '../Pages/Home';
import { Outlet } from 'react-router';
import Navbar from '../Componet/Navbar';
import Footer from '../Componet/Fotter';
const MainLaOut = () => {
    return (
        <div>
           <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLaOut;