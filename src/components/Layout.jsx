import React from 'react';
import {Link, Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <div className='container'>
            <h1>Quizlet</h1>
                <ul className='Home__menu'>
                    <Link to='/' className='option__link'><li className='menu__option'>Home</li></Link>
                    <Link to='/quiz' className='option__link'><li className='menu__option'>Play</li></Link>
                    <Link to='/login' className='option__link'><li className='menu__option'>Login</li></Link>
                    <li className='menu__option'>Achieve</li>
                </ul>
                <Outlet/>
        </div>
    );
};

export default Layout;