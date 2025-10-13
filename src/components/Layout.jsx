import React from 'react';
import {Link, Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <div className='container'>
            <h1>Quizlet</h1>
                <ul className='Home__menu'>
                    <li className='menu__option'><Link to='/'>Home</Link></li>
                    <li className='menu__option'><Link to='/quiz'>Play</Link></li>
                    <li className='menu__option'><Link to='/login'>Login</Link></li>
                    <li className='menu__option'>Achieve</li>
                </ul>
                <Outlet/>
        </div>
    );
};

export default Layout;