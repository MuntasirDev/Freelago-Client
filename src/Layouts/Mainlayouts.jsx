import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

const Mainlayouts = () => {
    return (
        <div>
            <Nav></Nav>
            <div className=''>
<Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default Mainlayouts;